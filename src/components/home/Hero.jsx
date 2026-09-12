import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import heroImage from '../../assets/images/architectural-hero.png'
import heroVideo from '../../assets/videos/Create_an_elegant_looping_arch.mp4'

const assurances = [
  [CheckCircle2, 'Expert Design Team', 'Certified architectural and structural engineers'],
  [MapPin, 'Based in Odisha', 'Serving clients across Koraput and beyond'],
  [ShieldCheck, 'Approved Plans', 'Municipal approval expertise — Sujog / ePBASR'],
]
const phrases = ['Design your dream home', 'Plan with confidence', 'Build with expertise']
const headlinePhrase = 'Your Vision, Engineered.'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [headlineTyped, setHeadlineTyped] = useState(reduceMotion ? headlinePhrase : '')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateY = useSpring(useTransform(mouseX, [-.5, .5], [-2, 2]), { damping: 25, stiffness: 120 })
  const rotateX = useSpring(useTransform(mouseY, [-.5, .5], [1.5, -1.5]), { damping: 25, stiffness: 120 })
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set((event.clientX - rect.left) / rect.width - .5)
    mouseY.set((event.clientY - rect.top) / rect.height - .5)
  }

  useEffect(() => {
    if (reduceMotion) return undefined
    const word = phrases[phraseIndex]
    const done = typed === word
    const timeout = setTimeout(() => {
      if (!deleting && !done) setTyped(word.slice(0, typed.length + 1))
      else if (!deleting && done) setDeleting(true)
      else if (deleting && typed) setTyped(word.slice(0, -1))
      else { setDeleting(false); setPhraseIndex((phraseIndex + 1) % phrases.length) }
    }, done && !deleting ? 1600 : deleting ? 42 : 75)
    return () => clearTimeout(timeout)
  }, [deleting, phraseIndex, reduceMotion, typed])

  useEffect(() => {
    if (reduceMotion) return undefined
    if (headlineTyped.length === headlinePhrase.length) return undefined
    const timeout = setTimeout(() => setHeadlineTyped(headlinePhrase.slice(0, headlineTyped.length + 1)), 68)
    return () => clearTimeout(timeout)
  }, [headlineTyped, reduceMotion])

  return (
    <section onMouseMove={reduceMotion ? undefined : handleMove} className="relative isolate overflow-hidden bg-white">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute left-[44%] top-8 hidden h-28 w-28 rounded-full bg-brand/10 blur-3xl lg:block" />
      <motion.div
        style={reduceMotion ? {} : { rotateX, rotateY, transformPerspective: 1000 }}
        className="absolute inset-y-0 -right-[38%] -z-10 w-[1050px] origin-center sm:-right-[10%] lg:right-[-7%] lg:w-[1000px]"
      >
        <img src={heroImage} alt="Architectural design and engineering visualization" className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
        <video autoPlay muted loop playsInline preload="metadata" poster={heroImage} aria-label="Architectural visualization animation" className="image-drift relative h-full w-full object-cover object-center opacity-85 lg:opacity-100">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-transparent to-transparent" />
        <div className="wireframe-pulse blueprint-grid absolute inset-y-[12%] right-[4%] w-[47%] border border-brand/50 bg-brand/5 mix-blend-multiply" />
        <div className="stage-scan absolute inset-x-[22%] top-[14%] h-12 bg-gradient-to-b from-transparent via-brand/50 to-transparent blur-[1px]" />
        <div className="absolute bottom-[16%] right-[19%] hidden rounded-lg border border-white/30 bg-ink/80 px-4 py-3 text-white shadow-2xl backdrop-blur lg:block">
          <p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand">Design status</p>
          <p className="mt-1 text-xs font-extrabold">Concept → Blueprint → Reality</p>
        </div>
      </motion.div>

      <Container className="relative min-h-[680px] py-16 lg:min-h-[660px] lg:py-24">
        <div className="absolute inset-y-0 -left-6 w-[90%] bg-gradient-to-r from-white via-white/95 to-white/20 lg:w-[65%]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="relative z-10 max-w-2xl pt-4 lg:pt-10"
        >
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[.16em] text-brand">
            Architectural Engineering Consultants — Koraput, Odisha
          </p>
          <h1 className="max-w-xl text-[42px] font-extrabold leading-[1.08] tracking-[-.055em] text-ink sm:text-6xl">
            Welcome to Draft BIM{' '}
            <span aria-label={headlinePhrase} className="font-['Playfair_Display'] font-semibold italic tracking-[-.04em] text-brand">
              <span aria-hidden="true">{reduceMotion ? headlinePhrase : headlineTyped}</span>
              {!reduceMotion && (
                <span aria-hidden="true" className="typing-cursor ml-1 inline-block h-[.82em] w-[3px] translate-y-[.08em] rounded-full bg-brand" />
              )}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink/80">
            At Draft BIM, we provide comprehensive architectural and engineering consultancy services — from master planning and structural design to interior solutions and municipal building plan approvals. We make your architectural dreams a reality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact">Get a Quote <ArrowRight size={16} /></Button>
            <a href="#services" className="inline-flex items-center gap-2 rounded-md border border-brand px-5 py-3 text-sm font-bold text-brand transition hover:bg-brand hover:text-white">
              Our Services <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-7 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-ink">
            <span className="h-px w-9 shrink-0 bg-brand" />
            <span className="whitespace-nowrap">Design your dream home</span>
            <span className="h-3 w-px animate-pulse bg-brand" />
          </div>
        </motion.div>

        <div className="relative z-10 mt-14 grid max-w-2xl gap-5 border-t border-slate-300/80 pt-7 sm:grid-cols-3">
          {assurances.map(([Icon, title, note]) => (
            <div key={title} className="flex gap-3">
              <Icon size={25} className="shrink-0 text-brand" />
              <div>
                <p className="text-sm font-extrabold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
