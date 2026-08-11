import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { formType, ...formData } = data;

    const emailSubject = getEmailSubject(formType);
    const emailContent = formatEmailContent(formType, formData);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "modspacenoida@gmail.com",
      subject: emailSubject,
      html: emailContent,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
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
  const baseContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Inquiry Received</h2>
  `;

  let content = baseContent;

  if (formType === "callback") {
    content += `
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Preferred Call Time:</strong> ${data.callTime || "Not specified"}</p>
    `;
  } else if (formType === "residential") {
    content += `
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Property Type:</strong> ${data.propertyType}</p>
      <p><strong>Possession Status:</strong> ${data.possessionStatus}</p>
      <p><strong>Services:</strong> ${Array.isArray(data.services) ? data.services.join(", ") : "None selected"}</p>
      <p><strong>Budget Range:</strong> ${data.budget}</p>
      <p><strong>Notes:</strong> ${data.notes || "None"}</p>
    `;
  } else if (formType === "commercial") {
    content += `
      <p><strong>Company Name:</strong> ${data.companyName}</p>
      <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
      <p><strong>Designation:</strong> ${data.designation}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Space Type:</strong> ${data.spaceType}</p>
      <p><strong>Carpet Area:</strong> ${data.carpetArea} Sq. Ft.</p>
      <p><strong>Scope of Work:</strong> ${Array.isArray(data.scope) ? data.scope.join(", ") : "None selected"}</p>
      <p><strong>Expected Start Date:</strong> ${data.startDate || "Not specified"}</p>
    `;
  }

  content += `
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated message. Please respond to the inquiry as soon as possible.</p>
    </div>
  `;

  return content;
}
