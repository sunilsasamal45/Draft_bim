import { useEffect, useState } from 'react'
import CountUpModule from 'react-countup'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import heroImage from '../../assets/images/architectural-hero.png'

const testimonials = [
  {
    name: 'Ramesh Patro',
    role: 'Homeowner, Koraput',
    initials: 'RP',
    quote: 'Draft BIM made the entire process of building our home so much easier. From the initial design to getting the municipal approval, Er. Vijay and his team guided us at every step. The 3D visualization helped us understand exactly how our home would look before construction started.',
  },
  {
    name: 'Sunita Mahapatra',
    role: 'Commercial Developer, Odisha',
    initials: 'SM',
    quote: 'We engaged Draft BIM for our commercial complex project. Their structural design was thorough and code-compliant, and their experience with ePBASR approvals saved us months of back and forth with the authorities. Highly recommended for any project in Odisha.',
  },
  {
    name: 'Prakash Nayak',
    role: 'Contractor, Koraput District',
    initials: 'PN',
    quote: 'As a contractor, I need accurate and detailed drawings to execute a project well. Draft BIM consistently delivers precise architectural and structural drawings that make construction seamless. Their site guidance has been invaluable on multiple projects.',
  },
  {
    name: 'Anita Jena',
    role: 'Interior Design Client, Odisha',
    initials: 'AJ',
    quote: 'The interior design team at Draft BIM transformed our living space completely. The 3D renders they provided before execution were spot-on, and the final result matched our expectations perfectly. The team is professional, creative, and very easy to work with.',
  },
]

const CountUp = CountUpModule.default ?? CountUpModule
const trustStats = [
  ['500+', 'Projects Completed'],
  ['100%', 'Approval Success'],
  ['10+', 'Years Experience'],
  ['98%', 'Client Satisfaction'],
]
const carouselVariants = {
  enter: (direction) => ({ opacity: 0, x: direction * 96, rotateY: direction * -14, scale: .96 }),
  center: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  exit: (direction) => ({ opacity: 0, x: direction * -96, rotateY: direction * 14, scale: .96 }),
}

function TestimonialCard({ testimonial, active, onSelect }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.article
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect() }}
      animate={{ opacity: active ? 1 : .62, scale: active ? 1 : .92, y: active ? 0 : 12 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className={`group relative h-full overflow-hidden rounded-3xl border p-7 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-brand/40 sm:p-8 ${active ? 'z-10 border-brand/35 bg-white shadow-2xl shadow-ink/10' : 'cursor-pointer border-slate-200 bg-white/80 shadow-lg hover:border-brand/30'}`}
    >
      <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[.045] blur-sm" />
      <Quote className="absolute right-6 top-6 text-brand/20 transition duration-500 group-hover:rotate-6 group-hover:text-brand/35" size={46} fill="currentColor" />
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-[#0d5f88] text-sm font-extrabold text-white shadow-lg shadow-brand/20">
          {testimonial.initials}
        </span>
        <div>
          <h3 className="text-base font-extrabold text-ink">{testimonial.name}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">{testimonial.role}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-1 text-brand">
        {Array.from({ length: 5 }, (_, star) => (
          <motion.span key={star} initial={reducedMotion ? false : { opacity: 0, scale: .3 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .06 + star * .05 }}>
            <Star size={14} fill="currentColor" />
          </motion.span>
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-7 text-slate-600">"{testimonial.quote}"</blockquote>
    </motion.article>
  )
}

export default function Testimonials() {
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const words = 'Trusted By Clients Across Odisha'.split(' ')
  const navigate = (step) => { setDirection(step >= 0 ? 1 : -1); setActive((value) => (value + step + testimonials.length) % testimonials.length) }
  const select = (index) => { if (index === active) return; setDirection(index > active ? 1 : -1); setActive(index) }
  useEffect(() => {
    if (paused || reducedMotion) return undefined
    const timer = setInterval(() => navigate(1), 6500)
    return () => clearInterval(timer)
  }, [paused, reducedMotion])

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[.12]" />
      <div className="stage-scan pointer-events-none absolute left-[15%] top-16 h-20 w-[60%] opacity-20" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Testimonials</p>
          <h2 id="testimonials-title" className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-.055em] text-ink sm:text-5xl">
            {words.map((word, index) => (
              <motion.span key={`${word}-${index}`} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="mr-[.24em] inline-block last:mr-0">
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .3 }} className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600">
            Every successful project begins with trust. Here's what our clients say about working with Draft BIM and how our services helped bring their vision to life.
          </motion.p>
        </div>

        {/* Trust stats */}
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-cyan-100 bg-white/85 shadow-xl shadow-ink/5 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map(([value, label], index) => (
            <motion.div key={label} initial={reducedMotion ? false : { opacity: 0, y: 15 }} whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="border-b border-cyan-100 p-6 text-center last:border-b-0 sm:[&:nth-child(2)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <p className="text-3xl font-extrabold text-brand">
                <CountUp end={Number(value.replace(/[^0-9]/g, ''))} enableScrollSpy suffix={value.replace(/[0-9]/g, '')} />
              </p>
              <p className="mt-1 text-[11px] font-bold text-slate-600">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Carousel */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-14 [perspective:1500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={reducedMotion ? {} : carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 125, damping: 21, mass: .85 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="grid items-stretch gap-5 lg:grid-cols-3"
            >
              {[-1, 0, 1].map((position) => {
                const index = (active + position + testimonials.length) % testimonials.length
                return (
                  <div key={`${index}-${position}`} className={position === 0 ? 'lg:col-span-1' : 'hidden lg:block'}>
                    <TestimonialCard testimonial={testimonials[index]} active={position === 0} onSelect={() => select(index)} />
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button type="button" onClick={() => navigate(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-4 focus-visible:ring-brand/30">
              <ArrowLeft size={17} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, index) => (
                <button key={item.name} type="button" onClick={() => select(index)} aria-label={`Show testimonial from ${item.name}`} className={`h-2 rounded-full transition-all duration-500 ${active === index ? 'w-7 bg-brand' : 'w-2 bg-slate-300 hover:bg-brand/60'}`} />
              ))}
            </div>
            <button type="button" onClick={() => navigate(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-4 focus-visible:ring-brand/30">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-lg font-semibold leading-8 text-ink">
            From residential homes to large commercial developments across Odisha — Draft BIM is your trusted partner for design, engineering, and approvals.
          </p>
          <Button to="/contact" className="group mt-7">
            Request a Consultation <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
