import { ArrowRight, Award, Check, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import aboutImage from '../assets/images/about-blueprint-reality.png'

const benefits = [
  [Check, 'Certified architectural and structural engineering expertise'],
  [MapPin, 'Deep knowledge of Odisha\'s municipal approval processes'],
  [Award, 'Director of Town Planning — DTP EMP No. RTP/DTP(C.ER)-632/2024'],
]

export default function AboutPage() {
  const reducedMotion = useReducedMotion()
  return (
    <main className="relative overflow-hidden py-20 lg:py-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">

          {/* Left — text content */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            animate={reducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">About Draft BIM</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:text-5xl">
              Architectural Engineering Consultants.{' '}
              <span className="font-['Playfair_Display'] font-semibold italic text-brand">
                Designing Your Dream Home.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">
              At Draft BIM, our mission is to provide exceptional design consultancy. We focus on making architectural dreams a reality for every homeowner, developer, and investor — from the first sketch to the final approved plan.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
              Founded by Er. Vijay Kumar Achary, an Associate Member of India (Reg. No. AM3119915) and Director of Town Planning, Draft BIM brings together deep technical expertise and a client-first approach to every project in Odisha and beyond.
            </p>
            <ul className="mt-8 grid gap-3">
              {benefits.map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-bold text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Icon size={14} strokeWidth={2.5} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <Button to="/contact" className="group mt-9">
              Discuss Your Project <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 22 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-brand/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white p-2 shadow-2xl shadow-ink/15">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={aboutImage}
                  alt="Draft BIM architectural blueprint to reality"
                  className="image-drift aspect-[16/10] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/25 via-transparent to-white/10" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/30 bg-ink/80 px-3 py-2.5 text-white backdrop-blur">
                  <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-brand">Design sequence</p>
                  <p className="mt-1 text-xs font-bold">Concept → Blueprint → Reality</p>
                </div>
              </div>
            </div>

            {/* Founder badge */}
            <div className="mt-5 rounded-xl border border-cyan-100 bg-white p-5 shadow-lg shadow-ink/5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-brand">Founded by</p>
              <p className="mt-1 text-base font-extrabold text-ink">Er. Vijay Kumar Achary</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Associate Member India · Reg No. AM3119915<br />
                Director of Town Planning — DTP EMP No. RTP/DTP(C.ER)-632/2024<br />
                Koraput, Odisha, India
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </main>
  )
}
