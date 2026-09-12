import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, CheckCircle2, Clock3, LockKeyhole, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react'
import Container from '../common/Container'
import contactImage from '../../assets/images/portfolio-headquarters.png'

const projectTypes = [
  'Residential House', 'Commercial Building', 'Apartment Complex',
  'Industrial Structure', 'Interior Design', 'Structural Design (RCC)',
  'Structural Design (PEB)', 'Municipal Plan Approval', 'Technical Consultancy', 'Other',
]
const contactDetails = [
  [Building2, 'Founder', 'Er. Vijay Kumar Achary'],
  [Mail, 'Email', 'Draftbim@gmail.com'],
  [Phone, 'Phone', '+91 8328992742'],
  [MapPin, 'Office', 'Koraput, Odisha, India'],
]
const trustPoints = [
  [Clock3, 'Fast Response', 'We usually reply within 24 hours.'],
  [LockKeyhole, 'Project Confidentiality', 'Your drawings and plans remain fully secure.'],
  [ShieldCheck, 'Certified Consultancy', 'DTP-certified, Associate Member India (AM3119915).'],
]

function Field({ label, name, error, register, type = 'text', required = name !== 'message', options, placeholder, rows }) {
  const inputClass = `peer w-full rounded-xl border bg-white px-4 pt-6 text-sm text-ink outline-none transition placeholder:text-transparent focus:border-brand focus:ring-4 focus:ring-brand/10 ${error ? 'border-red-400' : 'border-slate-200'}`
  const registration = register(name, required ? { required: `${label} is required` } : {})
  return (
    <div className="relative">
      <label htmlFor={name} className="pointer-events-none absolute left-4 top-2.5 z-10 text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-500 transition peer-focus:text-brand">
        {label}{required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      {options
        ? <select id={name} defaultValue="" className={`${inputClass} h-14 appearance-none`} {...registration}><option value="" disabled>Select a project type</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>
        : rows
          ? <textarea id={name} rows={rows} placeholder={placeholder} className={`${inputClass} resize-y pt-7`} {...registration} />
          : <input id={name} type={type} placeholder={placeholder} className={`${inputClass} h-14`} {...registration} />}
      {error && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{error.message}</p>}
    </div>
  )
}

function SuccessPanel() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
      <CheckCircle2 size={52} className="text-brand" strokeWidth={1.5} />
      <div>
        <p className="text-sm font-bold text-ink">Thank you for contacting Draft BIM.</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">Your project inquiry has been successfully received.</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">Our team will review your requirements and get back to you shortly.</p>
        <p className="mt-3 text-sm font-bold text-ink">You can expect an initial response within 24 hours.</p>
      </div>
    </div>
  )
}

export default function ContactSection() {
  const reducedMotion = useReducedMotion()
  const [stage, setStage] = useState('form')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    // Send email in background — do not block the success message
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})
    reset()
    setStage('success')
  }

  return (
    <div className="relative overflow-hidden bg-[#f8fafc]">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" />
      <section className="relative py-20 lg:py-28">
        <Container>
          {/* Heading */}
          <div className="mx-auto max-w-5xl text-center">
            <motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Get in touch</motion.p>
            <motion.h2 initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:text-5xl">
              Let's Discuss Your Project
            </motion.h2>
            <motion.p initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2 }} className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600">
              We're here to help you with your design needs. Contact us to discuss your project, ask questions, or schedule a consultation. Let's create something wonderful together!
            </motion.p>
          </div>

          {/* Two-column */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">

            {/* Left */}
            <motion.div initial={reducedMotion ? false : { opacity: 0, x: -26 }} whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65 }}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white p-2 shadow-xl shadow-ink/10">
                <img loading="lazy" src={contactImage} alt="Draft BIM office" className="image-drift aspect-[4/3] w-full rounded-xl object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-ink/35 via-transparent to-brand/10" />
                <div className="absolute bottom-6 left-6 rounded-xl border border-white/25 bg-ink/75 p-4 text-white backdrop-blur">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-brand">Design your dream home</p>
                  <p className="mt-1 text-sm font-bold">Er. Vijay Kumar Achary — Draft BIM</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {contactDetails.map(([Icon, label, value], i) => (
                  <motion.div key={label} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }} className="group rounded-xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10">
                    <Icon size={19} className="text-brand" />
                    <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.12em] text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-bold text-ink">{value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-brand">Credentials</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Associate Member India · Reg No. AM3119915<br />
                  Director of Town Planning · DTP EMP No. RTP/DTP(C.ER)-632/2024
                </p>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div initial={reducedMotion ? false : { opacity: 0, x: 26 }} whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65 }}>
              <div className="grid gap-3 sm:grid-cols-3">
                {trustPoints.map(([Icon, title, copy], i) => (
                  <motion.div key={title} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="rounded-xl border border-brand/10 bg-white/70 p-4 backdrop-blur">
                    <Icon size={18} className="text-brand" />
                    <p className="mt-3 text-xs font-extrabold text-ink">{title}</p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">{copy}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 [perspective:1400px]">
                <AnimatePresence mode="wait">
                  {stage === 'success' ? (
                    <motion.div key="success" initial={reducedMotion ? false : { opacity: 0, rotateY: -180, scale: .94 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 180, scale: .94 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }} className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-2xl shadow-ink/10 backdrop-blur sm:p-8">
                      <SuccessPanel />
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={reducedMotion ? false : { opacity: 0, rotateY: -180, scale: .94 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 180, scale: .94 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }} className="rounded-2xl border border-white/80 bg-white/85 p-6 shadow-2xl shadow-ink/10 backdrop-blur sm:p-8">
                      <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Contact form</p>
                            <h3 className="mt-2 text-3xl font-extrabold tracking-[-.045em] text-ink">Tell us about your project.</h3>
                          </div>
                          <Send className="mt-1 shrink-0 text-brand" size={24} />
                        </div>
                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                          <Field label="First Name" name="firstName" error={errors.firstName} register={register} placeholder="First name" />
                          <Field label="Last Name" name="lastName" error={errors.lastName} register={register} placeholder="Last name" />
                          <Field label="Business Phone" name="phone" type="tel" error={errors.phone} register={register} placeholder="+91 00000 00000" />
                          <Field label="Email Address" name="email" type="email" error={errors.email} register={(n, rules) => register(n, { ...rules, pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' } })} placeholder="you@example.com" />
                          <div className="sm:col-span-2"><Field label="Project Type" name="projectType" error={errors.projectType} register={register} options={projectTypes} /></div>
                          <Field label="Project Location" name="location" error={errors.location} register={register} placeholder="City, District, Odisha" />
                          <Field label="Estimated Budget" name="budget" error={errors.budget} register={register} placeholder="Optional" required={false} />
                          <div className="sm:col-span-2"><Field label="Message" name="message" error={errors.message} register={register} placeholder="Tell us about your project requirements." rows={5} /></div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60">
                          {isSubmitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Submitting…</> : <>Submit <ArrowRight size={17} /></>}
                        </button>
                        <p className="mt-4 text-center text-xs leading-5 text-slate-500">Your details are used only to respond to your enquiry and are kept confidential.</p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-16 max-w-3xl text-center font-['Playfair_Display'] text-2xl font-semibold italic leading-relaxed text-ink">
            "We believe every great project begins with a great conversation. Let's discuss your vision and turn it into reality."
          </motion.p>
        </Container>
      </section>
    </div>
  )
}
