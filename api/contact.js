import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// TODO(confirm): sending domain must be verified in MailerSend before this works.
const MAIL_FROM = 'noreply@madfarm-advisors.com';
const MAIL_FROM_NAME = 'Madfarm Advisors Website';

// Where inquiries land. Update if a general inbox is preferred.
const PRIMARY_INBOX = 'info@madfarm-advisors.com';

const SUBJECT_ROUTES = {
  'sell-side': { label: 'Selling a Business',            recipients: [PRIMARY_INBOX] },
  valuation:   { label: 'Pre-Engagement Valuation',      recipients: [PRIMARY_INBOX] },
  'not-ready': { label: 'Planning Ahead (Not Ready Yet)', recipients: [PRIMARY_INBOX] },
  referral:    { label: 'Referral',                      recipients: [PRIMARY_INBOX] },
  general:     { label: 'General Inquiry',               recipients: [PRIMARY_INBOX] },
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.MAILERSEND_API_KEY) {
    console.error('MAILERSEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server is not configured to send email.' });
  }

  const body = req.body ?? {};
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const company = String(body.company ?? '').trim();
  const subjectKey = String(body.subject ?? 'general').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const route = SUBJECT_ROUTES[subjectKey] ?? SUBJECT_ROUTES.general;
  const recipients = route.recipients.map((addr) => new Recipient(addr));

  const html = `
    <h2>New inquiry from madfarm-advisors.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
    <p><strong>Subject:</strong> ${escapeHtml(route.label)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const text =
    `New inquiry from madfarm-advisors.com\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : '') +
    (company ? `Company: ${company}\n` : '') +
    `Subject: ${route.label}\n\n` +
    `${message}\n`;

  const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

  const emailParams = new EmailParams()
    .setFrom(new Sender(MAIL_FROM, MAIL_FROM_NAME))
    .setTo(recipients)
    .setReplyTo(new Sender(email, name))
    .setSubject(`[Website] ${route.label} — ${name}`)
    .setHtml(html)
    .setText(text);

  try {
    await mailerSend.email.send(emailParams);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('MailerSend error:', err?.body ?? err);
    return res.status(502).json({ error: 'Could not send your message. Please email info@madfarm-advisors.com directly.' });
  }
}
