import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sanitise input to prevent injection
function sanitise(value: string): string {
  return value.replace(/[<>]/g, "").trim().slice(0, 2000);
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    !("email" in body) ||
    !("message" in body)
  ) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, message." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body as {
    name: string;
    email: string;
    subject?: string;
    message: string;
  };

  const cleanName = sanitise(String(name));
  const cleanEmail = sanitise(String(email));
  const cleanSubject = sanitise(String(subject ?? "General Enquiry"));
  const cleanMessage = sanitise(String(message));

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(cleanEmail)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "hello@yourdomain.com";

  try {
    await resend.emails.send({
      from: "Art by Lerato <onboarding@resend.dev>",
      to: toEmail,
      replyTo: cleanEmail,
      subject: `New enquiry: ${cleanSubject} — from ${cleanName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #faf7f2; color: #2c2c2c;">
          <div style="border-bottom: 2px solid #c1694f; padding-bottom: 20px; margin-bottom: 28px;">
            <h1 style="font-size: 22px; margin: 0; color: #2c2c2c;">New Contact Enquiry</h1>
            <p style="font-size: 13px; color: #6b6b6b; margin: 6px 0 0;">Art by Lerato — Portfolio Website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-size: 15px; color: #2c2c2c;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b;">Email</td>
              <td style="padding: 8px 0; font-size: 15px; color: #c1694f;">${cleanEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b;">Enquiry Type</td>
              <td style="padding: 8px 0; font-size: 15px; color: #2c2c2c;">${cleanSubject}</td>
            </tr>
          </table>

          <div style="background: #fff; border: 1px solid #e8ddd0; padding: 20px; border-radius: 2px;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b6b6b; margin: 0 0 12px;">Message</p>
            <p style="font-size: 15px; color: #2c2c2c; line-height: 1.7; margin: 0; white-space: pre-wrap;">${cleanMessage}</p>
          </div>

          <p style="font-size: 12px; color: #b0a898; margin-top: 32px; text-align: center;">
            Reply directly to this email to respond to ${cleanName}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Email sending failed:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
