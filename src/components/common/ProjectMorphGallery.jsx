/**
 * ProjectMorphGallery — Premium 3D Floating Cards
 *
 * 6 project cards sit in a static 3×2 grid.
 * Each card animates IN PLACE with:
 *   - Continuous float (Y oscillation, unique timing per card)
 *   - Gentle 3D tilt (rotateX / rotateY oscillation)
 *   - Depth breathing (translateZ / scale)
 *   - Moving light reflection (diagonal gradient sweep)
 *   - Mouse-tracked tilt + parallax layers on hover
 *   - Radial cursor-following glow on hover
 *
 * Cards NEVER move across the page. No orbit. No carousel.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

import aboutImage    from '../../assets/images/about-blueprint-reality.png'
import heroImage     from '../../assets/images/architectural-hero.png'
import towerImage    from '../../assets/images/commercial-tower.png'
import interiorImage from '../../assets/images/luxury-interior.png'
import villaImage    from '../../assets/images/portfolio-villa.png'
import officeImage   from '../../assets/images/portfolio-office.png'

/* ── Project data (images and text unchanged) ── */
const PROJECTS = [
  { id: 1, image: aboutImage,    title: 'Blueprint Clarity',     num: '01',
    detail: 'Transform plans and drawings into a shared spatial reference before the project moves further.' },
  { id: 2, image: heroImage,     title: 'Exterior Vision',       num: '02',
    detail: 'Test scale, architectural character, landscaping, and first impressions in a polished exterior story.' },
  { id: 3, image: towerImage,    title: 'Commercial Context',    num: '03',
    detail: "Help investors, tenants, and project teams understand the building's presence and potential." },
  { id: 4, image: interiorImage, title: 'Interior Experience',   num: '04',
    detail: 'Show materials, lighting, circulation, and atmosphere in the spaces people will actually use.' },
  { id: 5, image: villaImage,    title: 'Residential Lifestyle', num: '05',
    detail: 'Present the emotional value of a future home before buyers or stakeholders step onto site.' },
  { id: 6, image: officeImage,   title: 'Presentation Ready',    num: '06',
    detail: 'Package the visual story for approvals, launches, investor conversations, and marketing.' },
]

/* Per-card animation parameters — unique timing so all 6 feel independent */
const ANIM_PARAMS = [
  { floatDur: 5.2, floatAmp: 4,   tiltDur: 6.4, depthDur: 7.1, lightDel: 0    },
  { floatDur: 6.8, floatAmp: 3.5, tiltDur: 5.8, depthDur: 5.6, lightDel: 2.4  },
  { floatDur: 4.7, floatAmp: 4.5, tiltDur: 7.2, depthDur: 6.3, lightDel: 4.8  },
  { floatDur: 6.1, floatAmp: 3,   tiltDur: 6.0, depthDur: 7.8, lightDel: 1.6  },
  { floatDur: 5.5, floatAmp: 4.2, tiltDur: 5.4, depthDur: 5.2, lightDel: 3.2  },
  { floatDur: 7.0, floatAmp: 3.8, tiltDur: 6.8, depthDur: 6.9, lightDel: 5.6  },
]

/* ─────────────────────────────────────────────────────────────
   Light sweep keyframes injected once into <head>
───────────────────────────────────────────────────────────── */
const LIGHT_CSS = `
  @keyframes pmg-sweep {
    0%   { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
    10%  { opacity: 1; }
    88%  { opacity: 0.7; }
    100% { transform: translateX(230%) skewX(-18deg); opacity: 0; }
  }
  @keyframes pmg-float {
    0%, 100% { transform: translateY(var(--float-up)); }
    50%       { transform: translateY(var(--float-down)); }
  }
`
let cssInjected = false
function injectCSS() {
  if (cssInjected || typeof document === 'undefined') return
  const s = document.createElement('style')
  s.textContent = LIGHT_CSS
  document.head.appendChild(s)
  cssInjected = true
}

/* ─────────────────────────────────────────────────────────────
   Single floating card
───────────────────────────────────────────────────────────── */
function FloatingCard({ project, paramIndex, onSelect, reducedMotion }) {
  const p = ANIM_PARAMS[paramIndex]
  const cardRef = useRef(null)

  /* Spring-backed mouse tilt */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(mouseX, { stiffness: 180, damping: 28 })
  const rotY = useSpring(mouseY, { stiffness: 180, damping: 28 })
  const tz   = useSpring(useMotionValue(0), { stiffness: 160, damping: 24 })

  /* Image parallax (opposite to tilt) */
  const imgX = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 })
  const imgY = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 })

  /* Cursor glow position */
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  const onMouseMove = useCallback((e) => {
    if (reducedMotion) return
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    const nx = (e.clientX - r.left) / r.width  - 0.5   // -0.5 … +0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5

    rotX.set( ny * -8)   // rotateX: tilt top/bottom
    rotY.set( nx *  10)  // rotateY: tilt left/right
    tz.set(30)

    imgX.set(nx * -4)    // image moves opposite
    imgY.set(ny * -4)

    setGlow({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
      opacity: 0.18,
    })
  }, [reducedMotion, rotX, rotY, tz, imgX, imgY])

  const onMouseLeave = useCallback(() => {
    rotX.set(0); rotY.set(0); tz.set(0)
    imgX.set(0); imgY.set(0)
    setGlow(g => ({ ...g, opacity: 0 }))
  }, [rotX, rotY, tz, imgX, imgY])

  /* Continuous idle animations via CSS custom properties */
  const floatUp   = `${-p.floatAmp}px`
  const floatDown = `${p.floatAmp}px`

  /* Idle tilt — keyframe via framer-motion animate loop */
  const idleRotX  = reducedMotion ? 0 : [-1.5, 1.5, -1.5]
  const idleRotY  = reducedMotion ? 0 : [-2, 2, -2]
  const idleScale = reducedMotion ? 1 : [1, 1.015, 1]
  const idleTZ    = reducedMotion ? 0 : [0, 15, 0]

  return (
    <Reveal>
      <motion.div
        ref={cardRef}
        className="group relative cursor-pointer"
        style={{
          perspective: 900,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          /* CSS float animation */
          '--float-up':   floatUp,
          '--float-down': floatDown,
          animation: reducedMotion ? 'none' : `pmg-float ${p.floatDur}s ease-in-out infinite`,
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => onSelect(project)}
        whileTap={{ scale: 0.98 }}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title} project details`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(project) }}
      >
        {/* 3D card shell — idle tilt + mouse tilt combined */}
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            translateZ: tz,
            transformStyle: 'preserve-3d',
          }}
          animate={reducedMotion ? {} : {
            rotateX: idleRotX,
            rotateY: idleRotY,
            scale:   idleScale,
            z:       idleTZ,
          }}
          transition={reducedMotion ? {} : {
            duration: p.tiltDur,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          }}
        >
          {/* Card surface */}
          <div style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(226,232,240,0.9)',
            background: '#fff',
            boxShadow: '0 8px 32px -8px rgba(12,31,61,0.18), 0 2px 8px -2px rgba(12,31,61,0.08)',
            transition: 'box-shadow 0.4s ease',
          }}
          className="group-hover:shadow-[0_24px_56px_-12px_rgba(26,95,168,0.22),0_4px_16px_-4px_rgba(12,31,61,0.12)]"
          >
            {/* ── Image area ── */}
            <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>

              {/* Original photo — UNCHANGED, only subtle parallax shift */}
              <motion.img
                src={project.image}
                alt={project.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  x: imgX,
                  y: imgY,
                  scale: 1.06,  /* small overscale so parallax never shows edge */
                }}
              />

              {/* Depth gradient — always present */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(12,31,61,0.65) 0%, rgba(12,31,61,0.05) 55%, transparent 100%)',
                pointerEvents: 'none',
              }}/>

              {/* ── Moving light reflection (CSS animation) ── */}
              {!reducedMotion && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, width: '35%',
                    background: 'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.13) 50%, transparent 100%)',
                    animation: `pmg-sweep ${9 + paramIndex * 0.7}s ease-in-out ${p.lightDel}s infinite`,
                    willChange: 'transform',
                  }}/>
                </div>
              )}

              {/* Cursor glow radial */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
                  opacity: glow.opacity,
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Number badge */}
              <span
                style={{
                  position: 'absolute', left: 14, top: 12,
                  fontSize: 10, fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(12,31,61,0.5)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {project.num}
              </span>

              {/* Blueprint grid overlay on hover */}
              <div
                className="blueprint-grid absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
                style={{ backgroundColor: 'rgba(26,95,168,0.12)', mixBlendMode: 'multiply' }}
              />
            </div>

            {/* ── Text content ── */}
            <div style={{ padding: '18px 20px 20px' }}>
              <h3 style={{
                margin: 0, fontSize: 15, fontWeight: 800,
                letterSpacing: '-0.03em', color: '#0c1f3d',
                lineHeight: 1.3,
              }}>
                {project.title}
              </h3>
              <p style={{
                margin: '8px 0 0', fontSize: 13, lineHeight: 1.65,
                color: '#475569',
              }}>
                {project.detail}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                marginTop: 14, fontSize: 11, fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#1a5fa8',
              }}>
                View story
                <ArrowUpRight size={13} />
              </div>
              {/* Animated underline */}
              <motion.div
                style={{
                  height: 2, borderRadius: 2, marginTop: 10,
                  background: 'linear-gradient(90deg, #1a5fa8, rgba(26,95,168,0.2))',
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  )
}

/* ─────────────────────────────────────────────────────────────
   Simple scroll-reveal wrapper
───────────────────────────────────────────────────────────── */
function Reveal({ children }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={vis ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function ProjectMorphGallery() {
  injectCSS()
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!selected) return
    const h = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [selected])

  return (
    <section
      aria-label="Project showcase — 6 floating architectural cards"
      style={{
        position: 'relative', marginTop: 56,
        borderRadius: 24,
        border: '1px solid rgba(210,205,195,0.55)',
        /* Warm ivory architectural paper background */
        background: `
          radial-gradient(circle at 50% 15%, rgba(255,255,255,0.95), transparent 52%),
          radial-gradient(ellipse at 18% 80%, rgba(232,226,214,0.38), transparent 48%),
          radial-gradient(ellipse at 82% 72%, rgba(220,218,210,0.32), transparent 46%),
          radial-gradient(ellipse at 50% 50%, rgba(240,237,230,0.45), transparent 68%),
          linear-gradient(135deg, #F7F6F1 0%, #EEEDE7 100%)
        `,
        boxShadow: '0 24px 80px -16px rgba(80,70,55,0.10), 0 2px 0 0 rgba(210,205,195,0.4)',
        padding: '48px 32px 52px',
        overflow: 'hidden',
      }}
    >
      {/* Architectural blueprint grid — barely visible, 40px, opacity 0.028 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(140,125,100,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(140,125,100,0.028) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Atmospheric light blobs — huge, blurred, very low opacity */}
      <div aria-hidden="true" style={{
        position: 'absolute', pointerEvents: 'none',
        top: '-8%', left: '22%', width: '56%', height: '55%',
        background: 'radial-gradient(ellipse, rgba(255,252,245,0.72) 0%, transparent 70%)',
        filter: 'blur(32px)',
      }}/>
      <div aria-hidden="true" style={{
        position: 'absolute', pointerEvents: 'none',
        bottom: '-5%', left: '-4%', width: '42%', height: '45%',
        background: 'radial-gradient(ellipse, rgba(232,225,210,0.38) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}/>
      <div aria-hidden="true" style={{
        position: 'absolute', pointerEvents: 'none',
        bottom: '5%', right: '-2%', width: '38%', height: '40%',
        background: 'radial-gradient(ellipse, rgba(225,220,208,0.32) 0%, transparent 70%)',
        filter: 'blur(36px)',
      }}/>

      {/* Top-edge fade for seamless section transition */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 48, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(248,246,241,0.7), transparent)',
        borderRadius: '24px 24px 0 0',
      }}/>
      {/* Bottom-edge fade */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(238,237,231,0.7), transparent)',
        borderRadius: '0 0 24px 24px',
      }}/>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={{ margin: 0, fontSize: 10, fontWeight: 800, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#1a5fa8' }}>
          One Shared Vision
        </p>
        <h2 style={{ margin: '12px 0 0', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800,
          letterSpacing: '-0.04em', color: '#0c1f3d', lineHeight: 1.2 }}>
          From plan to a place people can experience.
        </h2>
        <p style={{ margin: '12px auto 0', maxWidth: 480, fontSize: 14,
          lineHeight: 1.7, color: '#64748b' }}>
          Select any card to explore the full visualization story.
        </p>
      </div>

      {/* 3×2 grid — cards stay in position */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 28,
        maxWidth: 1040,
        margin: '0 auto',
      }}>
        {PROJECTS.map((project, i) => (
          <FloatingCard
            key={project.id}
            project={project}
            paramIndex={i}
            onSelect={setSelected}
            reducedMotion={!!reducedMotion}
          />
        ))}
      </div>

      <p style={{ textAlign: 'center', marginTop: 32, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.08em', color: '#94a3b8' }}>
        SELECT A PROJECT CARD TO VIEW ITS VISUALIZATION STORY
      </p>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            role="presentation"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 80,
              display: 'grid', placeItems: 'center',
              background: 'rgba(12,31,61,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: 16,
            }}
          >
            <motion.article
              role="dialog" aria-modal="true" aria-labelledby="gallery-detail-title"
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1,   y: 0 }}
              exit={{   opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              style={{
                position: 'relative', width: '100%', maxWidth: 720,
                overflow: 'hidden', borderRadius: 24, background: '#fff',
                boxShadow: '0 40px 80px -20px rgba(12,31,61,0.4)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              }}
            >
              <button
                type="button" onClick={() => setSelected(null)}
                aria-label="Close project details"
                style={{
                  position: 'absolute', right: 16, top: 16, zIndex: 10,
                  display: 'grid', placeItems: 'center',
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(12,31,61,0.75)', border: 'none',
                  color: '#fff', cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
              {/* Photo — original, unchanged */}
              <img
                src={selected.image}
                alt={selected.title}
                style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '36px 40px' }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 800,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a5fa8' }}>
                  Visualization story
                </p>
                <h3 id="gallery-detail-title"
                  style={{ margin: '10px 0 0', fontSize: 28, fontWeight: 800,
                    letterSpacing: '-0.045em', color: '#0c1f3d' }}>
                  {selected.title}
                </h3>
                <p style={{ margin: '18px 0 0', fontSize: 14, lineHeight: 1.75, color: '#475569' }}>
                  {selected.detail}
                </p>
                <a href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 24, fontSize: 13, fontWeight: 800, color: '#1a5fa8',
                    textDecoration: 'none' }}>
                  Discuss your project <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
