import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, BarChart2, Building2, Check, ClipboardList, Compass, Cpu, Leaf, PencilRuler, Stamp, Users, X } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import ServiceAnimLayer from './ServiceAnimLayer'

// 9 unique images — one per service, never reused
import img01 from '../../assets/images/architectural-hero.png'          // 01 Architectural Design
import img02 from '../../assets/images/real 3d model image.jpg'         // 02 BIM
import img03 from '../../assets/images/commercial-tower.png'            // 03 Structural Analysis
import img04 from '../../assets/images/luxury-interior.png'             // 04 Interior & Facade
import img05 from '../../assets/images/service1image (1).png'           // 05 Site Visits
import img06 from '../../assets/images/portfolio-apartment.png'         // 06 Vastu Consultation
import img07 from '../../assets/images/portfolio-hotel.png'             // 07 Municipal Approval
import img08 from '../../assets/images/portfolio-villa-desert.png'      // 08 Landscape Design
import img09 from '../../assets/images/portfolio-office.png'            // 09 Project Management

const ArchScene = lazy(() => import('./ArchScene'))

const services = [
  {
    num: '01',
    icon: Building2,
    title: 'Architectural Design',
    copy: 'Creative, functional architectural design for residential, commercial, and institutional projects — from concept to construction drawings.',
    image: img01,
    detail: 'Our architectural design service covers the full creative and technical process — from initial concept development and schematic design through to detailed working drawings that are construction-ready. We design spaces that are beautiful, functional, and aligned with your goals.',
    benefits: ['Concept & schematic design', 'Detailed working drawings', 'Design coordination & review'],
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Building Information Modelling (BIM)',
    copy: 'Intelligent 3D BIM models that integrate design, structure, and coordination into a single digital workflow.',
    image: img02,
    detail: 'We create intelligent Building Information Models that bring together architectural, structural, and MEP data into one coordinated 3D environment — improving collaboration, reducing clashes, and supporting better project decisions from design to delivery.',
    benefits: ['3D BIM coordination', 'Clash detection & resolution', 'Model-based documentation'],
  },
  {
    num: '03',
    icon: BarChart2,
    title: 'Structural Analysis & Design',
    copy: 'Safe, IS-code compliant structural engineering for RCC frames, steel structures, and Pre-Engineered Buildings.',
    image: img03,
    detail: 'Our structural engineering team delivers code-compliant RCC, steel, and PEB designs with full load analysis, foundation design, and structural detailing — ensuring safety, efficiency, and long-term durability for every building type.',
    benefits: ['RCC & steel frame design', 'IS code compliance', 'Load analysis & foundation design'],
  },
  {
    num: '04',
    icon: PencilRuler,
    title: 'Interior Design & Facade Design',
    copy: 'Premium interior environments and sophisticated building facades that balance aesthetics with performance.',
    image: img04,
    detail: 'We design interior spaces and building facades that reflect your brand, lifestyle, and aspirations. From material selection and space planning to facade cladding and fenestration design, we deliver environments that are both beautiful and technically resolved.',
    benefits: ['Interior space planning & styling', 'Facade system design', 'Material & finish specification'],
  },
  {
    num: '05',
    icon: Users,
    title: 'Site Visits & Consultation',
    copy: 'Professional on-site technical visits, inspection, and expert consultancy throughout your construction project.',
    image: img05,
    detail: 'Our experienced architects and engineers conduct thorough site visits to review construction progress, verify compliance with drawings, identify issues early, and provide expert technical guidance — keeping your project on track and on quality.',
    benefits: ['Construction compliance review', 'Technical issue resolution', 'Progress monitoring & reporting'],
  },
  {
    num: '06',
    icon: Compass,
    title: 'Vastu Consultation',
    copy: 'Expert Vastu Shastra planning integrated seamlessly with modern architectural design for harmonious spaces.',
    image: img06,
    detail: 'We integrate Vastu Shastra principles into your architectural and interior design — providing directional planning, room orientation, and spatial arrangement advice that aligns traditional wisdom with contemporary design without compromising aesthetics or functionality.',
    benefits: ['Directional & orientation planning', 'Room placement as per Vastu', 'Integrated modern-Vastu design'],
  },
  {
    num: '07',
    icon: Stamp,
    title: 'Online Municipal Approval Assistance (Sujog Portal)',
    copy: 'End-to-end building plan approval support through the Sujog and ePBASR online portals in Odisha.',
    image: img07,
    detail: 'We manage the complete online building plan approval process through the Sujog portal and ePBASR system — preparing all required drawings, documents, and digital submissions, and liaising with municipal authorities until your approval is granted.',
    benefits: ['Sujog / ePBASR digital filing', 'Authority liaison & follow-up', 'Complete documentation package'],
  },
  {
    num: '08',
    icon: Leaf,
    title: 'Landscape Design',
    copy: 'Premium landscape architecture integrating gardens, outdoor spaces, planting, and hardscape with your building.',
    image: img08,
    detail: 'Our landscape design service creates outdoor environments that complement and enhance your building — from softscape planting plans and garden design to hardscape pathways, water features, and outdoor lighting, all designed to create a cohesive architectural experience.',
    benefits: ['Garden & planting design', 'Hardscape & pathway planning', 'Outdoor environment integration'],
  },
  {
    num: '09',
    icon: ClipboardList,
    title: 'Project Management',
    copy: 'Professional project coordination, scheduling, and execution oversight ensuring quality delivery on time and budget.',
    image: img09,
    detail: 'Our project management service provides structured oversight of your construction project from commencement to handover — coordinating contractors, managing schedules and budgets, reviewing quality, and ensuring every phase of delivery meets the agreed standard.',
    benefits: ['Schedule & budget management', 'Contractor coordination', 'Quality assurance & handover'],
  },
]

/* ─── Animated dimension lines ─── */
function DimLine({ x1, y1, x2, y2, delay = 0 }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(26,95,168,0.22)" strokeWidth="0.5" strokeDasharray="4 3"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: 'easeOut' }}
    />
  )
}

function BlueprintOverlay() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" xmlns="http://www.w3.org/2000/svg">
      <DimLine x1="3%" y1="8%"  x2="30%" y2="8%"  delay={0.2} />
      <DimLine x1="70%" y1="8%"  x2="97%" y2="8%"  delay={0.4} />
      <DimLine x1="3%" y1="8%"  x2="3%"  y2="92%" delay={0.6} />
      <DimLine x1="97%" y1="8%"  x2="97%" y2="92%" delay={0.8} />
      <DimLine x1="3%" y1="92%" x2="30%" y2="92%" delay={1.0} />
      <DimLine x1="70%" y1="92%" x2="97%" y2="92%" delay={1.2} />
      <DimLine x1="2%"  y1="8%"  x2="4%"  y2="8%"  delay={0.25} />
      <DimLine x1="2%"  y1="92%" x2="4%"  y2="92%" delay={1.05} />
      <DimLine x1="96%" y1="8%"  x2="98%" y2="8%"  delay={0.45} />
      <DimLine x1="96%" y1="92%" x2="98%" y2="92%" delay={1.25} />
    </svg>
  )
}

/* ─── Service Card ─── */
function ServiceCard({ service, index, onOpen }) {
  const reducedMotion = useReducedMotion()
  const { num, icon: Icon, title, copy, image } = service

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), { damping: 22, stiffness: 170 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), { damping: 22, stiffness: 170 })
  const imgX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { damping: 22, stiffness: 170 })
  const imgY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-7, 7]), { damping: 22, stiffness: 170 })
  const glowOp = useSpring(0, { stiffness: 200, damping: 22 })

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - r.left) / r.width - 0.5)
    pointerY.set((e.clientY - r.top) / r.height - 0.5)
    glowOp.set(1)
  }
  function onLeave() { pointerX.set(0); pointerY.set(0); glowOp.set(0) }

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
      initial={reducedMotion ? false : { opacity: 0, y: 64, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={reducedMotion ? {} : { y: -12, boxShadow: '0 28px 56px -10px rgba(26,95,168,0.2)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.68, delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={reducedMotion ? {} : { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseMove={reducedMotion ? undefined : onMove}
      onMouseLeave={reducedMotion ? undefined : onLeave}
    >
      {/* Glow ring on hover */}
      <motion.span
        style={{ opacity: glowOp }}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-2 ring-brand/40"
      />

      {/* Clickable overlay */}
      <button
        type="button"
        aria-label={`View ${title} details`}
        onClick={() => onOpen(service)}
        className="absolute inset-0 z-20 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          loading="lazy"
          src={image}
          alt={`${title} — Draft BIM`}
          className="h-full w-full scale-[1.04] object-cover transition-transform duration-700 group-hover:scale-[1.11]"
          style={reducedMotion ? {} : { x: imgX, y: imgY }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />


        {/* Service number badge */}
        <span className="absolute left-4 top-3 rounded-md border border-white/20 bg-ink/55 px-2 py-0.5 text-[10px] font-extrabold tracking-[.14em] text-white/80 backdrop-blur">
          {num}
        </span>

        {/* Floating icon */}
        <motion.div
          className="absolute bottom-3 left-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-brand text-white shadow-lg shadow-brand/30 backdrop-blur"
          animate={reducedMotion ? {} : { y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
          whileHover={{ rotate: 12, scale: 1.12 }}
        >
          <Icon size={19} />
        </motion.div>

        {/* View badge */}
        <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-ink/55 px-2.5 py-1 text-[9px] font-extrabold tracking-[.12em] text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          VIEW SERVICE
        </span>
      </div>

      {/* Text content */}
      <div className="relative p-6">
        <h3 className="text-[15px] font-extrabold leading-snug text-ink">{title}</h3>
        <p className="mt-2.5 text-[13px] leading-6 text-slate-600">{copy}</p>
        <div className="mt-5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[.13em] text-brand">
          Explore service
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
        {/* Bottom line */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand/20"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.article>
  )
}

/* ─── Detail Modal (unchanged logic, updated for 9 services) ─── */
function ServicePresentation({ service, onClose }) {
  const closeBtn = useRef(null)
  useEffect(() => {
    closeBtn.current?.focus()
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/50 p-4 backdrop-blur-md sm:p-6"
      role="presentation"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.section
        role="dialog" aria-modal="true" aria-labelledby="svc-modal-title"
        className="relative max-h-[90dvh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-2xl shadow-ink/30"
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close service details"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand">
          <X size={19} />
        </button>

        <div className="grid lg:grid-cols-[.92fr_1.08fr]">
          {/* Image side */}
          <div className="relative min-h-72 overflow-hidden lg:min-h-[540px]">
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="blueprint-grid absolute inset-0 opacity-30" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">Draft BIM — {service.num}</p>
              <p className="mt-2 text-2xl font-extrabold leading-tight">Designed to make the right decision, every time.</p>
            </div>
          </div>

          {/* Detail side */}
          <div className="p-7 sm:p-10">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Service overview</motion.p>
            <motion.h2 id="svc-modal-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
              className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-ink sm:text-5xl">
              {service.title}<span className="text-brand">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="mt-5 text-sm leading-7 text-slate-600">{service.detail}</motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}
              className="mt-7 grid gap-5 border-y border-slate-100 py-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-extrabold text-ink">Key benefits</h3>
                <ul className="mt-3 space-y-2.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="font-extrabold uppercase tracking-[.13em] text-slate-400">Expertise</dt>
                  <dd className="mt-1 font-semibold leading-5 text-ink">Certified architects and engineers with 10+ years of experience.</dd>
                </div>
                <div>
                  <dt className="font-extrabold uppercase tracking-[.13em] text-slate-400">Location</dt>
                  <dd className="mt-1 font-semibold text-ink">Koraput, Odisha — serving clients across the region.</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              className="mt-7 flex flex-wrap gap-3">
              <Button to="/contact">Get a Quote <ArrowRight size={16} /></Button>
              <button type="button" onClick={onClose}
                className="rounded-md border border-slate-200 px-5 py-3 text-sm font-bold text-ink transition hover:border-brand hover:text-brand">
                Close
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

/* ─── Main Services Section ─── */
export default function Services() {
  const [selected, setSelected] = useState(null)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow3D(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden py-16 lg:py-24" style={{background:`radial-gradient(circle at 50% 0%,rgba(255,255,255,0.92),transparent 52%),radial-gradient(ellipse at 15% 85%,rgba(230,225,215,0.35),transparent 50%),radial-gradient(ellipse at 85% 75%,rgba(225,220,210,0.28),transparent 48%),linear-gradient(160deg,#F5F4EF 0%,#EDECE6 100%)`}}>
      {/* Floor-plan geometry SVG */}
      <svg aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}} preserveAspectRatio="xMidYMid slice">
        <rect x="7%" y="5%" width="86%" height="90%" fill="none" stroke="rgba(138,126,104,0.048)" strokeWidth="0.7" strokeDasharray="10 6"/>
        <line x1="7%" y1="28%" x2="93%" y2="28%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <line x1="7%" y1="50%" x2="93%" y2="50%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <line x1="7%" y1="72%" x2="93%" y2="72%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <line x1="32%" y1="5%" x2="32%" y2="95%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <line x1="56%" y1="5%" x2="56%" y2="95%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <line x1="72%" y1="5%" x2="72%" y2="95%" stroke="rgba(138,126,104,0.036)" strokeWidth="0.6" strokeDasharray="8 5"/>
        <circle cx="7%" cy="5%" r="3" fill="none" stroke="rgba(138,126,104,0.07)" strokeWidth="0.7"/>
        <circle cx="93%" cy="5%" r="3" fill="none" stroke="rgba(138,126,104,0.07)" strokeWidth="0.7"/>
        <circle cx="7%" cy="95%" r="3" fill="none" stroke="rgba(138,126,104,0.07)" strokeWidth="0.7"/>
        <circle cx="93%" cy="95%" r="3" fill="none" stroke="rgba(138,126,104,0.07)" strokeWidth="0.7"/>
      </svg>
      {/* Ambient soft light blobs */}
      <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0}}>
        <div style={{position:'absolute',top:'-6%',left:'28%',width:'44%',height:'48%',background:'radial-gradient(ellipse,rgba(255,253,248,0.68) 0%,transparent 70%)',filter:'blur(42px)'}}/>
        <div style={{position:'absolute',bottom:'2%',left:'-3%',width:'36%',height:'42%',background:'radial-gradient(ellipse,rgba(230,224,212,0.3) 0%,transparent 70%)',filter:'blur(50px)'}}/>
        <div style={{position:'absolute',bottom:'4%',right:'-2%',width:'33%',height:'38%',background:'radial-gradient(ellipse,rgba(226,220,207,0.26) 0%,transparent 70%)',filter:'blur(46px)'}}/>
        <div style={{position:'absolute',top:'42%',left:'44%',width:'22%',height:'28%',background:'radial-gradient(ellipse,rgba(242,238,230,0.36) 0%,transparent 70%)',filter:'blur(38px)'}}/>
      </div>
      {/* Scroll-parallax warm tint */}
      <motion.div aria-hidden="true" style={Object.assign({position:'absolute',inset:0,pointerEvents:'none',zIndex:0,background:'linear-gradient(to bottom,rgba(245,244,239,0.2),transparent 40%,rgba(237,236,230,0.15))'}, reducedMotion ? {} : { y: bgY })}/>





      {/* 3D accent — top right */}
      {show3D && !reducedMotion && (
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[320px] w-[320px] opacity-65 lg:block">
          <Suspense fallback={null}>
            <ArchScene />
          </Suspense>
        </div>
      )}

      <Container className="relative">

        {/* Section header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -28 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle
              eyebrow="Our Services"
              title={<>At Draft BIM, we provide<br />end-to-end design solutions.</>}
            />
          </motion.div>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, x: 28 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-sm leading-6 text-slate-600"
          >
            From architectural design and BIM to Vastu consultation, landscape design, and municipal approvals — nine expert services, one trusted team.
          </motion.p>
        </div>

        {/* 9 cards — 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.num}
              service={service}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>

      </Container>

      <AnimatePresence>
        {selected && (
          <ServicePresentation
            service={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
