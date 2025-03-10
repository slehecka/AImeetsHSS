import { getFormDataValues, isoDate, log } from "@acdh-oeaw/lib";
import type { APIContext } from "astro";
import PDFDocument from "pdfkit";
import * as v from "valibot";

import { sendEmail } from "@/lib/email";

export const prerender = false;

const RegistrationFormSchema = v.pipe(
	v.object({
		"first-name": v.pipe(v.string(), v.nonEmpty()),
		"last-name": v.pipe(v.string(), v.nonEmpty()),
		email: v.pipe(v.string(), v.email()),
		affiliation: v.pipe(v.string(), v.nonEmpty()),
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

const dateTime = new Intl.DateTimeFormat("de", { dateStyle: "medium" });

export async function POST(context: APIContext) {
	const formData = await context.request.formData();

	const result = await v.safeParseAsync(RegistrationFormSchema, getFormDataValues(formData));

	if (!result.success) {
		return Response.json({ message: "Invalid input." }, { status: 400 });
	}

	const submission = result.output;
	// filenames: add lastname + date and make sure filename does not contain \s or '
	const suffix = [submission.lastName.toLowerCase().replace(/[\s']+/g, "_"), submission.date].join(
		"_",
	);

	try {
		const subject = `[AImeetsHSS] conference registration ${submission.lastName}`;
		const message =
			"Dear maintainer,\n\nplease find attached details about a new conference registration in json and pdf formats.\n\nBest,\nAImeetsHSS website.";

		await sendEmail({
			from: submission.email,
			subject,
			text: message,
			attachments: [
				{
					filename: `ai-meets-hss-form-${suffix}.json`,
					content: JSON.stringify(submission, null, 2),
				},
				{
					filename: `ai-meets-hss-registration-form-${suffix}.pdf`,
					content: await createPdf(submission),
				},
			],
		});

		return context.redirect("/en/success", 303);
	} catch (error) {
		log.error(error);

		return Response.json({ message: "Failed to send message." }, { status: 500 });
	}
}

//

function createPdf(submission: RegistrationFormSchema): Promise<Buffer> {
	const date = dateTime.format(new Date(submission.date));

	return new Promise((resolve, reject) => {
		const pdf = new PDFDocument();

		const chunks: Array<Buffer> = [];

		pdf.on("data", (chunk: Buffer) => {
			chunks.push(chunk);
		});

		pdf.on("end", () => {
			resolve(Buffer.concat(chunks));
		});

		pdf.on("error", (error: Error) => {
			reject(error);
		});

		pdf
			.fontSize(16)
			.text(`AImeetsHSS Conference Registration: ${submission.lastName} - ${date}`, 25, 125);

		pdf.fontSize(12).text("\n\nRegistration Data\n\n");

		pdf
			.fontSize(10)
			.text(
				[
					`First Name: ${submission.firstName}`,
					`Last Name: ${submission.lastName}`,
					`Email: ${submission.email}`,
					`Affiliation: ${submission.affiliation}`,
					"",
					`Consent for Data Processing: Yes`,
					`Date of Registration: ${date}`,
				].join("\n"),
			);

		pdf.end();
	});
}
