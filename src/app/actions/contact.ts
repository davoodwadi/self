"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown IP";
    const city = headersList.get("x-vercel-ip-city") || "Unknown City";
    const region = headersList.get("x-vercel-ip-region") || "Unknown Region";
    const country = headersList.get("x-vercel-ip-country") || "Unknown Country";
    const lat = headersList.get("x-vercel-ip-latitude") || "Unknown Latitude";
    const lon = headersList.get("x-vercel-ip-longitude") || "Unknown Longitude";
    const userAgent = headersList.get("user-agent") || "Unknown User Agent";

    const metaDataHtml = `
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
      <h3 style="color: #666;">Sender Information (For Security & Anti-Spam)</h3>
      <ul style="color: #666; font-size: 0.9em;">
        <li><strong>IP Address:</strong> ${ip}</li>
        <li><strong>Location:</strong> ${city}, ${region}, ${country}</li>
        <li><strong>Coordinates:</strong> ${lat}, ${lon}</li>
        <li><strong>User Agent:</strong> ${userAgent}</li>
      </ul>
    `;

    const metaDataText = `\n\n--- Sender Information (For Security & Anti-Spam) ---\nIP Address: ${ip}\nLocation: ${city}, ${region}, ${country}\nCoordinates: ${lat}, ${lon}\nUser Agent: ${userAgent}`;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <davood@account.spreed.chat>",
      to: process.env.CONTACT_EMAIL || "your-email@example.com", // Replace with your actual email or set in env
      subject: `New Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}${metaDataText}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        ${metaDataHtml}
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Internal server error" };
  }
}
