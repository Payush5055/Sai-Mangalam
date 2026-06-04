import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, type, position } = req.body;

  try {
    const isCareer = type === 'career';

    const { data, error } = await resend.emails.send({
      from: 'SaiMangalam Website <onboarding@resend.dev>',
      to: 'saimangalam.electrical@gmail.com',
      replyTo: email,
      subject: isCareer
        ? `Career Application — ${position || 'General'}`
        : `New Enquiry from ${name}`,
      html: isCareer
        ? `
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Position Applied For:</strong> ${position || 'Not specified'}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `
        : `
          <h2>New Enquiry from SaiMangalam Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
