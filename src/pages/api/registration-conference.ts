import { getFormDataValues, isoDate, log } from "@acdh-oeaw/lib";
import type { APIContext } from "astro";
import * as v from "valibot";

import { createConferenceRegistration } from "@/lib/baserow.ts";

export const prerender = false;

const RegistrationFormSchema = v.pipe(
	v.object({
		"first-name": v.pipe(v.string(), v.nonEmpty()),
		"last-name": v.pipe(v.string(), v.nonEmpty()),
		email: v.pipe(v.string(), v.email()),
		affiliation: v.pipe(v.string()),
		"data-consent": v.literal("on"),
	}),
	v.transform((data) => {
		return {
			firstName: data["first-name"],
			lastName: data["last-name"],
			email: data.email,
			affiliation: data.affiliation,
			dataConsent: true,
			date: isoDate(new Date()),
		};
	}),
);

type RegistrationFormSchema = v.InferOutput<typeof RegistrationFormSchema>;

export async function POST(context: APIContext) {
	const formData = await context.request.formData();

	const result = await v.safeParseAsync(RegistrationFormSchema, getFormDataValues(formData));

	if (!result.success) {
		return Response.json({ message: "Invalid input." }, { status: 400 });
	}

	const submission = result.output;

	try {
		const res = await createConferenceRegistration({
			FirstName: submission.firstName,
			LastName: submission.lastName,
			Email: submission.email,
			Affiliation: submission.affiliation,
			Date: submission.date,
		});
		return context.redirect(`/en/success?data=${encodeURIComponent(JSON.stringify(res))}`, 303);
	} catch (error) {
		log.error(error);

		return Response.json({ message: "Failed to submit." }, { status: 500 });
	}
}
