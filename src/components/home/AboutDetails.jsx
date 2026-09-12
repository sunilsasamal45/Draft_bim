import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import ProjectMorphGallery from '../common/ProjectMorphGallery'

const clarityPoints = [
  ['Plan with precision', "Move beyond rough sketches with accurate architectural drawings and 3D models that help every stakeholder understand the project's scale, layout, and materials before a single brick is laid."],
  ['Align your entire team', 'Bring architects, structural engineers, contractors, and clients into one shared design conversation — reducing miscommunication and costly changes during construction.'],
  ['Present with confidence', "Whether you're seeking municipal approval or presenting to investors, Draft BIM prepares documentation and visuals that are clear, professional, and approval-ready."],
]

const projectJourney = [
  { label: 'Client Brief',                desc: 'We listen to your vision, goals, site conditions, and budget to chart the right path forward.' },
  { label: 'Site Survey & Analysis',      desc: 'We conduct a thorough site survey and prepare a detailed design brief aligned with your goals.' },
  { label: 'Design Development',          desc: 'Our team develops architectural drawings, structural designs, and 3D visualizations for your review.' },
  { label: 'Plan Approval',               desc: 'We handle the complete Sujog / ePBASR municipal approval process on your behalf.' },
  { label: 'Construction-Ready Delivery', desc: 'You receive approved drawings and complete documentation, ready for construction to begin.' },
]

function ProjectJourney() {
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, amount: 0.25 })
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!inView || reducedMotion) return
    setStarted(true)
    setActive(0)
  }, [inView, reducedMotion])

  useEffect(() => {
    if (!started || reducedMotion) return
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        if (prev < projectJourney.length - 1) return prev + 1
        clearInterval(intervalRef.current)
        return prev
      })
    }, 1800)
    return () => clearInterval(intervalRef.current)
  }, [started, reducedMotion])

  const handleClick = (index) => {
    clearInterval(intervalRef.current)
    setActive(index)
  }

  const progressPct = (active / (projectJourney.length - 1)) * 100

  return (
    <div ref={sectionRef} className="mt-14 rounded-3xl bg-ink p-7 text-white shadow-2xl shadow-ink/15 sm:p-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">From brief to build</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">
            A collaborative journey, not a one-way handoff.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-slate-300">
          We keep you involved at every stage — ensuring your feedback shapes the outcome and your project is always moving forward.
        </p>
      </div>

      {/* Progress bar with step dots */}
      <div className="relative mt-10 h-0.5 w-full rounded-full bg-white/10">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-brand"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {projectJourney.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              aria-label={`Go to step ${i + 1}`}
              className="relative z-10 flex h-5 w-5 items-center justify-center focus:outline-none"
            >
              <motion.span
                animate={{
                  backgroundColor: i <= active ? '#1a5fa8' : 'rgba(255,255,255,0.15)',
                  scale: i === active ? 1.5 : 1,
                  boxShadow: i === active ? '0 0 0 4px rgba(26,95,168,0.3)' : '0 0 0 0px transparent',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="block h-3 w-3 rounded-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Step cards */}
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {projectJourney.map((step, i) => {
          const isActive = i === active
          const isDone = i < active
          return (
            <motion.li
              key={step.label}
              animate={{
                borderColor: isActive ? 'rgba(26,95,168,0.7)' : isDone ? 'rgba(26,95,168,0.25)' : 'rgba(255,255,255,0.08)',
                backgroundColor: isActive ? 'rgba(26,95,168,0.15)' : isDone ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.03)',
                y: isActive ? -4 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleClick(i)}
              className="relative cursor-pointer overflow-hidden rounded-xl border p-5 select-none"
            >
              {isActive && (
                <motion.span
                  layoutId="step-glow"
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{ boxShadow: 'inset 0 0 28px rgba(26,95,168,0.25)' }}
                />
              )}
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ color: isActive ? '#1a5fa8' : isDone ? '#4a8fd4' : 'rgba(255,255,255,0.35)' }}
                  transition={{ duration: 0.4 }}
                  className="text-[10px] font-extrabold uppercase tracking-[.14em]"
                >
                  Step {i + 1}
                </motion.span>
                {isDone && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <CheckCircle2 size={11} className="text-brand/70" />
                  </motion.span>
                )}
              </div>
              <motion.p
                animate={{ color: isActive ? '#ffffff' : isDone ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.45)' }}
                transition={{ duration: 0.4 }}
                className="mt-2 text-sm font-bold leading-snug"
              >
                {step.label}
              </motion.p>
              <motion.p
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0, marginTop: isActive ? 8 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden text-xs leading-5 text-slate-300"
              >
                {step.desc}
              </motion.p>
              <motion.span
                animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand"
              />
            </motion.li>
          )
        })}
      </ol>

      {/* Dot nav */}
      <div className="mt-6 flex items-center gap-3">
        <p className="text-xs font-extrabold text-white/40">
          <span className="text-brand">{active + 1}</span> / {projectJourney.length}
        </p>
        <div className="flex gap-1.5">
          {projectJourney.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-brand' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AboutDetails() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-10" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Why clients choose Draft BIM</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.04] tracking-[-.055em] text-ink sm:text-5xl">
              Better projects start when everyone sees the same plan.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
              A great design is a practical tool that helps you make the right decisions at the right time, avoid costly mistakes, and move your project forward with confidence.
            </p>
            <Button to="/contact" className="group mt-8">
              Discuss your project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid gap-4">
            {clarityPoints.map(([title, copy], pointIndex) => (
              <motion.article
                key={title}
                initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: pointIndex * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-brand" />
                <h3 className="text-xl font-extrabold tracking-[-.03em] text-ink">{title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
        <ProjectMorphGallery />
        <ProjectJourney />
      </Container>
    </section>
  )
}
