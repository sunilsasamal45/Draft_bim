import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Building2, Check, Compass, FileCheck2, HomeIcon, PencilRuler, Stamp, X } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import heroImage from '../assets/images/architectural-hero.png'
import towerImage from '../assets/images/commercial-tower.png'
import interiorImage from '../assets/images/luxury-interior.png'
import aboutImage from '../assets/images/about-blueprint-reality.png'
import serviceImageOne from '../assets/images/service1image (1).png'

const services = [
  [
    HomeIcon,
    'Architectural Planning & Master Plans',
    'We deliver comprehensive site analysis, space planning, and master layout designs for residential, commercial, and mixed-use developments — from early concept through to construction-ready drawings aligned with local regulations.',
    heroImage,
  ],
  [
    Building2,
    'Structural Design (RCC & PEB)',
    'Our structural engineers design safe, code-compliant RCC and Pre-Engineered Building (PEB) structures that meet IS standards, incorporating load analysis, foundation design, and detailed structural drawings for every project type.',
    towerImage,
  ],
  [
    PencilRuler,
    'Interior Design (2D & 3D)',
    'We create beautiful and functional interior spaces tailored to your lifestyle. Our team provides 2D layout planning and photorealistic 3D visualizations, ensuring every design reflects your style and enhances your home\'s comfort.',
    interiorImage,
  ],
  [
    Stamp,
    'Municipal Building Plan Approval (Sujog / ePBASR)',
    'At Draft BIM, we make obtaining building plan approvals easy. Our team guides you through every step of the Sujog and ePBASR process, handling all documentation and liaisoning with authorities for your projects in Odisha.',
    aboutImage,
  ],
  [
    Compass,
    'Technical Consultancy & Site Guidance',
    'Our certified consultants provide hands-on technical support throughout your construction project — from site inspections and quality reviews to construction supervision — helping you avoid costly errors and keep work on schedule.',
    serviceImageOne,
  ],
  [
    FileCheck2,
    'Town Planning & DTP Advisory',
    'With direct experience as a Director of Town Planning (DTP), we provide expert advisory on town planning regulations, zoning compliance, and land-use approvals, ensuring your development aligns fully with statutory requirements.',
    towerImage,
  ],
]

function ServiceCard({ service, index, onOpen }) {
  const reducedMotion = useReducedMotion()
  const [Icon, title, description, image] = service
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [1.5, -1.5]), { damping: 24, stiffness: 150 })
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-1.5, 1.5]), { damping: 24, stiffness: 150 })

  function trackPointer(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - .5)
    pointerY.set((event.clientY - rect.top) / rect.height - .5)
  }

  return (
    <motion.article
      onMouseMove={reducedMotion ? undefined : trackPointer}
      onMouseLeave={() => { pointerX.set(0); pointerY.set(0) }}
      style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
      initial={reducedMotion ? false : { opacity: 0, y: 60, scale: .9 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: .12 }}
      transition={{ delay: index * .12, duration: .65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-lg shadow-ink/[.07] backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/15"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img loading="lazy" src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-brand/85 backdrop-blur">
            <Icon size={18} />
          </span>
          <span className="text-[10px] font-extrabold tracking-[.16em]">DRAFT BIM SERVICE</span>
        </div>
      </div>
      <div className="relative p-7">
        <span className="absolute left-0 top-7 h-8 w-0.5 bg-brand transition-all duration-300 group-hover:h-14" />
        <h2 className="text-xl font-extrabold tracking-[-.035em] text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <button
          type="button"
          onClick={() => onOpen(service)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-brand outline-none transition hover:text-ink focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Learn More <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  )
}

function ServiceDetails({ service, onClose }) {
  const closeButton = useRef(null)
  const [Icon, title, description, image] = service

  useEffect(() => {
    closeButton.current?.focus()
    const escape = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [onClose])

  return (
    <motion.div
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/55 p-4 backdrop-blur-md"
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-details-title"
        initial={{ opacity: 0, scale: .9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: .96, y: 14 }}
        className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl"
      >
        <button ref={closeButton} type="button" onClick={onClose} aria-label="Close service details" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/75 text-white transition hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand">
          <X size={18} />
        </button>
        <div className="grid lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative min-h-64 overflow-hidden">
            <img src={image} alt={`${title} by Draft BIM`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 grid h-12 w-12 place-items-center rounded-xl bg-brand text-white">
              <Icon size={23} />
            </span>
          </div>
          <div className="p-7 sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Service details</p>
            <h2 id="service-details-title" className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-ink">{title}</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {description} Our team shapes every deliverable around your project's goals, ensuring you receive accurate, professional, and approval-ready documentation.
            </p>
            <div className="mt-7 grid gap-4 border-y border-slate-100 py-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.13em] text-slate-400">Included</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2"><Check size={16} className="text-brand" />Client-specific customisation</li>
                  <li className="flex gap-2"><Check size={16} className="text-brand" />Approval-ready documentation</li>
                  <li className="flex gap-2"><Check size={16} className="text-brand" />On-site guidance if required</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.13em] text-slate-400">Service area</p>
                <p className="mt-3 text-sm font-bold text-ink">Koraput, Odisha, India</p>
                <p className="mt-1 text-xs text-slate-500">Contact us to discuss timelines based on your project scope.</p>
              </div>
            </div>
            <Button to="/contact" className="mt-7">Get a Quote <ArrowRight size={16} /></Button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default function ServicesPage() {
  const reducedMotion = useReducedMotion()
  const [selectedService, setSelectedService] = useState(null)
  const heading = 'Comprehensive Architectural & Engineering Services'.split(' ')

  return (
    <div className="relative overflow-hidden">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* Page header */}
      <section className="relative py-20 text-center lg:py-28">
        <Container>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">
            Our Services
          </motion.p>
          <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:text-6xl">
            {heading.map((word, index) => (
              <motion.span key={`${word}-${index}`} initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .12 + index * .07, duration: .45 }} className="mr-[.24em] inline-block last:mr-0">
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? {} : { opacity: 1, y: 0 }} transition={{ delay: .55, duration: .55 }} className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600">
            At Draft BIM, we offer end-to-end architectural and engineering consultancy — from master planning and structural design to interior solutions, municipal approvals, and technical site guidance — all under one roof.
          </motion.p>
        </Container>
      </section>

      {/* Services grid */}
      <section className="relative pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service[1]} service={service} index={index} onOpen={setSelectedService} />
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-y border-cyan-100 bg-ink py-20 text-center text-white">
        <div className="blueprint-grid absolute inset-0 opacity-20" />
        <Container className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Work with us</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">
            Whether you're planning a family home, a commercial complex, or need municipal approvals handled end-to-end — Draft BIM is your trusted partner in Odisha.
          </p>
          <Button to="/contact" className="mt-8">
            Get a Quote <ArrowRight size={16} />
          </Button>
        </Container>
      </section>

      <AnimatePresence>
        {selectedService && <ServiceDetails service={selectedService} onClose={() => setSelectedService(null)} />}
      </AnimatePresence>
    </div>
  )
}
