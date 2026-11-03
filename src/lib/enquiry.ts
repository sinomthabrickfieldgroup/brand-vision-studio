import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ENQUIRY_TOPICS = [
  "Register interest",
  "Broker enquiry",
  "Leasing and space",
  "Investment",
  "Cleaning services",
  "Security services",
  "Something else",
] as const;
export const ENQUIRY_ROLES = [
  "Broker",
  "Tenant",
  "Investor",
  "Bank",
  "Service provider",
  "Other",
] as const;

/** Flip to true once deliver() really sends. While false, the form tells visitors it is a preview. */
export const ENQUIRY_DELIVERY_LIVE = false;

export const enquirySchema = z.object({
  firstName: z.string().trim().min(1, "Please tell us your first name").max(80),
  lastName: z.string().trim().max(80).optional().default(""),
  email: z.string().trim().email("That email doesn't look right").max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s()-]*$/, "Use digits, spaces and + only")
    .optional()
    .default(""),
  topic: z.enum(ENQUIRY_TOPICS, { errorMap: () => ({ message: "Choose a topic" }) }),
  property: z.string().trim().max(80).optional().default(""),
  role: z.enum(ENQUIRY_ROLES).or(z.literal("")).optional().default(""),
  message: z.string().trim().min(10, "A little more detail helps us reply properly").max(4000),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/**
 * Delivers an enquiry. MOCK: nothing is sent yet — the enquiry is only logged on the
 * server. Do not launch with this in place.
 *
 * To go live with Resend, set RESEND_API_KEY and replace the body with roughly:
 *   await fetch("https://api.resend.com/emails", {
 *     method: "POST",
 *     headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
 *     body: JSON.stringify({ from: "Brickfield Group <enquiries@brickfieldgroup.co.za>",
 *       to: ["info@brickfieldgroup.co.za"], reply_to: enquiry.email,
 *       subject: `${enquiry.topic} — ${enquiry.firstName} ${enquiry.lastName}`, text: formatEnquiry(enquiry) }),
 *   });
 * Plunk works the same way with its /v1/send endpoint.
 */
async function deliver(enquiry: Enquiry): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info(
    "[enquiry:mock] Not sent — delivery is not wired up yet.\n" + formatEnquiry(enquiry),
  );
}

export function formatEnquiry(e: Enquiry) {
  const name = [e.firstName, e.lastName].filter(Boolean).join(" ");
  const lines = [
    `Topic: ${e.topic}`,
    e.property ? `Property: ${e.property}` : null,
    `From: ${name}${e.role ? ` (${e.role})` : ""}`,
    `Email: ${e.email}`,
    e.phone ? `Phone: ${e.phone}` : null,
    "",
    e.message,
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Bots fill the honeypot; pretend it worked and drop it.
    if (data.website) return { ok: true as const, reference: "BF-000000" };
    await deliver(data);
    const reference = `BF-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    return { ok: true as const, reference };
  });
