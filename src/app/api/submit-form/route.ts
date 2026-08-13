import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const data = await request.json();
    const { formType, ...formData } = data;

    const emailSubject = getEmailSubject(formType);
    const emailContent = formatEmailContent(formType, formData);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "modspacenoida@gmail.com",
      replyTo: formData.email || process.env.EMAIL_USER,
      subject: emailSubject,
      html: emailContent,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit form";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function getEmailSubject(formType: string): string {
  switch (formType) {
    case "callback":
      return "New Callback Request - Modspace Interior";
    case "residential":
      return "New Residential Project Inquiry - Modspace Interior";
    case "commercial":
      return "New Commercial Project Inquiry - Modspace Interior";
    default:
      return "New Form Submission - Modspace Interior";
  }
}

function formatEmailContent(formType: string, data: Record<string, any>): string {
  const baseStyle =
    "font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;";
  const baseContent = `
    <div style="${baseStyle}">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">New Inquiry Received</h2>
  `;

  let content = baseContent;

  const escape = (val: string) => {
    if (!val) return "Not specified";
    return String(val).replace(/[&<>"']/g, (char) => {
      const escapeMap: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return escapeMap[char];
    });
  };

  if (formType === "callback") {
    content += `
      <p><strong>Full Name:</strong> ${escape(data.fullName)}</p>
      <p><strong>Phone:</strong> ${escape(data.phone)}</p>
      <p><strong>Location:</strong> ${escape(data.location)}</p>
      <p><strong>Preferred Call Time:</strong> ${escape(data.callTime || "Not specified")}</p>
    `;
  } else if (formType === "residential") {
    const services = Array.isArray(data.services)
      ? data.services.map(escape).join(", ")
      : "None selected";
    content += `
      <p><strong>Full Name:</strong> ${escape(data.fullName)}</p>
      <p><strong>Phone:</strong> ${escape(data.phone)}</p>
      <p><strong>Email:</strong> ${escape(data.email)}</p>
      <p><strong>Property Type:</strong> ${escape(data.propertyType)}</p>
      <p><strong>Possession Status:</strong> ${escape(data.possessionStatus)}</p>
      <p><strong>Services:</strong> ${services}</p>
      <p><strong>Budget Range:</strong> ${escape(data.budget)}</p>
      <p><strong>Notes:</strong> ${escape(data.notes || "None")}</p>
    `;
  } else if (formType === "commercial") {
    const scope = Array.isArray(data.scope)
      ? data.scope.map(escape).join(", ")
      : "None selected";
    content += `
      <p><strong>Company Name:</strong> ${escape(data.companyName)}</p>
      <p><strong>Contact Person:</strong> ${escape(data.contactPerson)}</p>
      <p><strong>Designation:</strong> ${escape(data.designation)}</p>
      <p><strong>Email:</strong> ${escape(data.email)}</p>
      <p><strong>Phone:</strong> ${escape(data.phone)}</p>
      <p><strong>Space Type:</strong> ${escape(data.spaceType)}</p>
      <p><strong>Carpet Area:</strong> ${escape(String(data.carpetArea))} Sq. Ft.</p>
      <p><strong>Scope of Work:</strong> ${scope}</p>
      <p><strong>Expected Start Date:</strong> ${escape(data.startDate || "Not specified")}</p>
    `;
  }

  content += `
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px; text-align: center;">This is an automated message. Submitted on ${new Date().toLocaleString("en-IN")}.</p>
    </div>
  `;

  return content;
}
