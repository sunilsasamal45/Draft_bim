import { Resend } from 'resend'

// Allowed project types — whitelist to reject garbage input
const VALID_PROJECT_TYPES = new Set([
  'Residential House', 'Commercial Building', 'Apartment Complex',
  'Industrial Structure', 'Interior Design', 'Structural Design (RCC)',
  'Structural Design (PEB)', 'Municipal Plan Approval', 'Technical Consultancy', 'Other',
])

function sanitize(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/[<>]/g, '')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, phone, email, projectType, location, budget, message } = req.body || {}

  // --- Validation ---
  const validationErrors = []
  if (!sanitize(firstName)) validationErrors.push('First Name is required')
  if (!sanitize(lastName)) validationErrors.push('Last Name is required')
  if (!sanitize(phone)) validationErrors.push('Business Phone is required')
  if (!sanitize(email) || !/^\S+@\S+\.\S+$/.test(email)) validationErrors.push('A valid Email Address is required')
  if (!projectType || !VALID_PROJECT_TYPES.has(projectType)) validationErrors.push('Project Type is required')
  if (!sanitize(location)) validationErrors.push('Project Location is required')

  if (validationErrors.length > 0) {
    return res.status(400).json({ error: validationErrors.join('. ') })
  }

  // --- Check env var ---
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY environment variable')
    return res.status(500).json({ error: 'Server configuration error. Please contact us directly at Draftbim@gmail.com.' })
  }

  // --- Format submission time (IST) ---
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  })

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;color:#1a1a2e;background:#f8fafc;margin:0;padding:0}
  .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0}
  .hdr{background:#1a1a2e;padding:28px 32px}
  .hdr h1{margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-.03em}
  .hdr p{margin:4px 0 0;color:#94a3b8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em}
  .body{padding:28px 32px}
  .row{display:flex;padding:10px 0;border-bottom:1px solid #f1f5f9}
  .row:last-child{border-bottom:none}
  .lbl{width:180px;min-width:180px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#64748b;padding-top:2px}
  .val{font-size:14px;color:#1a1a2e;font-weight:600;word-break:break-word}
  .msg{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-top:6px;font-size:14px;line-height:1.6;color:#1a1a2e;white-space:pre-wrap}
  .ftr{background:#f8fafc;padding:16px 32px;text-align:center;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0}
</style></head>
<body>
<div class="wrap">
  <div class="hdr"><p>New Project Inquiry</p><h1>Draft BIM — Project Inquiry</h1></div>
  <div class="body">
    <div class="row"><span class="lbl">First Name</span><span class="val">${sanitize(firstName)}</span></div>
    <div class="row"><span class="lbl">Last Name</span><span class="val">${sanitize(lastName)}</span></div>
    <div class="row"><span class="lbl">Business Phone</span><span class="val">${sanitize(phone)}</span></div>
    <div class="row"><span class="lbl">Email Address</span><span class="val">${sanitize(email)}</span></div>
    <div class="row"><span class="lbl">Project Type</span><span class="val">${sanitize(projectType)}</span></div>
    <div class="row"><span class="lbl">Project Location</span><span class="val">${sanitize(location)}</span></div>
    <div class="row"><span class="lbl">Estimated Budget</span><span class="val">${sanitize(budget) || '—'}</span></div>
    <div class="row" style="flex-direction:column"><span class="lbl" style="margin-bottom:6px">Message</span><div class="msg">${sanitize(message) || '—'}</div></div>
    <div class="row"><span class="lbl">Submitted At</span><span class="val">${submittedAt}</span></div>
  </div>
  <div class="ftr">Sent automatically from the Draft BIM website contact form.</div>
</div>
</body></html>`

  const text = `NEW PROJECT INQUIRY — DRAFT BIM
================================
First Name:       ${sanitize(firstName)}
Last Name:        ${sanitize(lastName)}
Business Phone:   ${sanitize(phone)}
Email Address:    ${sanitize(email)}
Project Type:     ${sanitize(projectType)}
Project Location: ${sanitize(location)}
Estimated Budget: ${sanitize(budget) || '—'}

Message:
${sanitize(message) || '—'}

Submitted At: ${submittedAt}
--
Sent automatically from the Draft BIM website contact form.`

  try {
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'Draft BIM Website <noreply@draftbim.com>',
      to: ['Draftbim@gmail.com'],
      replyTo: sanitize(email),
      subject: 'New Project Inquiry — Draft BIM',
      html,
      text,
    })

    if (error) {
      console.error('Resend API error:', error)
      return res.status(500).json({ error: 'Failed to send email.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
}
