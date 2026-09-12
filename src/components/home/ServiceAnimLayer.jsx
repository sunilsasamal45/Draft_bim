/**
 * ServiceAnimLayer.jsx
 *
 * Renders pure CSS animation OVERLAYS on top of the existing service photo.
 * The original photograph underneath is NEVER touched.
 *
 * Layer stack (all position:absolute, pointerEvents:none):
 *   1. Subtle cinematic parallax  — handled by framer-motion in parent (existing imgX/imgY)
 *   2. Moving light sweep          — slow translucent gradient crossing the photo
 *   3. Architectural wireframe SVG — thin technical lines, low opacity
 *   4. Atmospheric / scan layer    — service-specific subtle effect
 *   5. Depth vignette              — soft dark edge, improves 3D feel
 *
 * All animations are continuous (no hover required).
 * Hover strengthens effects via CSS group-hover classes + inline style overrides.
 * Respects prefers-reduced-motion via useReducedMotion.
 */

import { useReducedMotion } from 'framer-motion'

/* ─────────────────────────────────────────────
   Shared keyframe CSS injected once
───────────────────────────────────────────── */
const KEYFRAMES = `
  /* Light sweep — crosses photo left→right */
  @keyframes sal-sweep {
    0%   { transform: translateX(-110%) skewX(-15deg); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 0.7; }
    100% { transform: translateX(210%) skewX(-15deg); opacity: 0; }
  }
  /* Slow vertical scan line (BIM / Structural / Approval) */
  @keyframes sal-scan {
    0%   { transform: translateY(-8%); opacity: 0; }
    5%   { opacity: 1; }
    90%  { opacity: 0.8; }
    100% { transform: translateY(108%); opacity: 0; }
  }
  /* Wireframe draw — stroke-dashoffset */
  @keyframes sal-draw {
    0%   { stroke-dashoffset: 600; opacity: 0; }
    15%  { opacity: 0.7; }
    75%  { stroke-dashoffset: 0; opacity: 0.5; }
    90%  { opacity: 0.5; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  /* Compass spin — Vastu */
  @keyframes sal-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  /* Pulse ring */
  @keyframes sal-pulse {
    0%,100% { opacity: 0.25; transform: scale(0.96); }
    50%     { opacity: 0.7;  transform: scale(1.04); }
  }
  /* Float vertical */
  @keyframes sal-float {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-6px); }
  }
  /* Particle drift */
  @keyframes sal-particle {
    0%   { transform: translate(0,0);     opacity: 0; }
    20%  { opacity: 0.6; }
    80%  { opacity: 0.3; }
    100% { transform: translate(var(--dx),var(--dy)); opacity: 0; }
  }
`

let injected = false
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return
  const el = document.createElement('style')
  el.textContent = KEYFRAMES
  document.head.appendChild(el)
  injected = true
}

/* ─────────────────────────────────────────────
   Shared: cinematic light sweep
   duration / delay vary per service for variety
───────────────────────────────────────────── */
function LightSweep({ duration = 12, delay = 0, opacity = 0.13, color = 'rgba(255,255,255,1)' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '28%',
        background: `linear-gradient(100deg, transparent 0%, ${color.replace('1)', `${opacity})`)} 50%, transparent 100%)`,
        animation: `sal-sweep ${duration}s ease-in-out ${delay}s infinite`,
        willChange: 'transform',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Shared: depth vignette (always present, subtle)
───────────────────────────────────────────── */
function Vignette() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.28) 100%)',
      mixBlendMode: 'multiply',
    }} />
  )
}

/* ─────────────────────────────────────────────
   01 — ARCHITECTURAL DESIGN
   Light sweep + thin architectural outline + floating grid lines
───────────────────────────────────────────── */
function Anim01({ index }) {
  const d = index * 1.8
  return (
    <>
      <LightSweep duration={13} delay={d} opacity={0.15} />
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Outer architectural border */}
        <rect x="4%" y="5%" width="92%" height="90%" fill="none"
          stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="8 5"
          style={{ strokeDashoffset:600, animation:`sal-draw 9s ease-in-out ${d}s infinite` }}/>
        {/* Horizontal rule top */}
        <line x1="4%" y1="18%" x2="96%" y2="18%"
          stroke="rgba(26,95,168,0.3)" strokeWidth="0.6" strokeDasharray="400"
          style={{ strokeDashoffset:400, animation:`sal-draw 7s ease-in-out ${d+1}s infinite` }}/>
        {/* Dimension tick marks */}
        {[15,30,50,70,85].map((p,i) => (
          <line key={i} x1={`${p}%`} y1="16%" x2={`${p}%`} y2="20%"
            stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"
            style={{ opacity:0, animation:`sal-draw 6s ease-in-out ${d+i*0.4}s infinite` }}/>
        ))}
        {/* Corner brackets */}
        <path d="M4%,12% L4%,5% L12%,5%" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"
          style={{ strokeDashoffset:100, animation:`sal-draw 8s ease-in-out ${d+0.5}s infinite` }}/>
        <path d="M88%,5% L96%,5% L96%,12%" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"
          style={{ strokeDashoffset:100, animation:`sal-draw 8s ease-in-out ${d+0.8}s infinite` }}/>
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   02 — BIM
   Technical grid + vertical scan line + layer indicators
───────────────────────────────────────────── */
function Anim02({ index }) {
  const d = index * 1.8
  return (
    <>
      {/* Scan line */}
      <div aria-hidden="true" style={{
        position:'absolute', left:'8%', right:'8%', height:2, pointerEvents:'none',
        background:'linear-gradient(90deg,transparent,rgba(100,180,255,0.7),transparent)',
        animation:`sal-scan 5s ease-in-out ${d % 3}s infinite`,
        willChange:'transform',
      }}/>
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* BIM grid verticals */}
        {[20,40,60,80].map((x,i) => (
          <line key={i} x1={`${x}%`} y1="5%" x2={`${x}%`} y2="95%"
            stroke="rgba(100,180,255,0.12)" strokeWidth="0.6"
            style={{ strokeDashoffset:400, animation:`sal-draw 11s linear ${d+i*0.6}s infinite` }}/>
        ))}
        {/* BIM grid horizontals */}
        {[25,50,75].map((y,i) => (
          <line key={i} x1="5%" y1={`${y}%`} x2="95%" y2={`${y}%`}
            stroke="rgba(100,180,255,0.1)" strokeWidth="0.6"
            style={{ strokeDashoffset:400, animation:`sal-draw 11s linear ${d+i*0.7+0.3}s infinite` }}/>
        ))}
        {/* Corner registry marks */}
        {[[5,5],[95,5],[5,95],[95,95]].map(([cx,cy],i) => (
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="3" fill="none"
            stroke="rgba(100,200,255,0.5)" strokeWidth="0.8"
            style={{ animation:`sal-pulse 3s ease-in-out ${d+i*0.5}s infinite` }}/>
        ))}
        {/* Floor level indicator right side */}
        {[25,50,75].map((y,i) => (
          <text key={i} x="91%" y={`${y+1}%`} fill="rgba(100,200,255,0.45)" fontSize="5" fontFamily="monospace"
            style={{ opacity:0, animation:`sal-draw 10s ease-in-out ${d+i*0.8}s infinite` }}>
            {`L${3-i}`}
          </text>
        ))}
      </svg>
      <LightSweep duration={15} delay={d+2} opacity={0.1} color="rgba(100,200,255,1)" />
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   03 — STRUCTURAL ANALYSIS
   Engineering grid + stress pulse lines + node dots
───────────────────────────────────────────── */
function Anim03({ index }) {
  const d = index * 1.8
  return (
    <>
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Structural grid */}
        {[20,40,60,80].map((x,i) => (
          <line key={`v${i}`} x1={`${x}%`} y1="10%" x2={`${x}%`} y2="90%"
            stroke="rgba(255,200,100,0.15)" strokeWidth="0.7"
            style={{ strokeDashoffset:300, animation:`sal-draw 10s ease-in-out ${d+i*0.5}s infinite` }}/>
        ))}
        {[25,50,75].map((y,i) => (
          <line key={`h${i}`} x1="10%" y1={`${y}%`} x2="90%" y2={`${y}%`}
            stroke="rgba(255,200,100,0.12)" strokeWidth="0.7"
            style={{ strokeDashoffset:300, animation:`sal-draw 10s ease-in-out ${d+i*0.6+0.4}s infinite` }}/>
        ))}
        {/* Stress diagonals */}
        <line x1="10%" y1="10%" x2="90%" y2="90%"
          stroke="rgba(255,160,60,0.2)" strokeWidth="0.8" strokeDasharray="300"
          style={{ strokeDashoffset:300, animation:`sal-draw 12s ease-in-out ${d+1}s infinite` }}/>
        <line x1="90%" y1="10%" x2="10%" y2="90%"
          stroke="rgba(255,160,60,0.18)" strokeWidth="0.8" strokeDasharray="300"
          style={{ strokeDashoffset:300, animation:`sal-draw 12s ease-in-out ${d+2}s infinite` }}/>
        {/* Node circles at intersections */}
        {[[20,25],[40,25],[60,25],[80,25],
          [20,50],[40,50],[60,50],[80,50],
          [20,75],[40,75],[60,75],[80,75]].map(([x,y],i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r="2.5" fill="rgba(255,200,100,0.55)"
            style={{ animation:`sal-pulse 2.8s ease-in-out ${d+i*0.22}s infinite` }}/>
        ))}
      </svg>
      <LightSweep duration={14} delay={d+3} opacity={0.12} color="rgba(255,220,150,1)" />
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   04 — INTERIOR DESIGN & FACADE
   Warm sunlight sweep + interior spatial lines + soft reflection
───────────────────────────────────────────── */
function Anim04({ index }) {
  const d = index * 1.8
  return (
    <>
      <LightSweep duration={11} delay={d} opacity={0.18} color="rgba(255,220,160,1)" />
      {/* Soft reflection — bottom half */}
      <div aria-hidden="true" style={{
        position:'absolute', bottom:0, left:0, right:0, height:'40%', pointerEvents:'none',
        background:'linear-gradient(to top, rgba(255,240,200,0.08), transparent)',
        animation:`sal-pulse 6s ease-in-out ${d+1}s infinite`,
      }}/>
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Interior perspective lines from vanishing point */}
        {[-20,0,20].map((offset,i) => (
          <line key={i}
            x1={`${50+offset}%`} y1="5%"
            x2={i===0?'2%':i===2?'98%':'50%'} y2="95%"
            stroke="rgba(255,220,160,0.15)" strokeWidth="0.7"
            style={{ strokeDashoffset:400, animation:`sal-draw 14s ease-in-out ${d+i*0.8}s infinite` }}/>
        ))}
        {/* Horizontal spatial bands */}
        {[30,55,75].map((y,i) => (
          <line key={i} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
            stroke="rgba(255,200,130,0.1)" strokeWidth="0.6"
            style={{ strokeDashoffset:300, animation:`sal-draw 12s ease-in-out ${d+i*0.5+1}s infinite` }}/>
        ))}
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   05 — SITE VISITS & CONSULTATION
   Technical measurement overlay + depth parallax grid
───────────────────────────────────────────── */
function Anim05({ index }) {
  const d = index * 1.8
  return (
    <>
      <LightSweep duration={16} delay={d+1} opacity={0.12} />
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Site measurement lines */}
        <line x1="8%" y1="85%" x2="92%" y2="85%"
          stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeDasharray="6 4"
          style={{ strokeDashoffset:400, animation:`sal-draw 10s ease-in-out ${d}s infinite` }}/>
        {/* Vertical plumb lines */}
        {[25,50,75].map((x,i) => (
          <line key={i} x1={`${x}%`} y1="5%" x2={`${x}%`} y2="85%"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="4 6"
            style={{ strokeDashoffset:300, animation:`sal-draw 13s ease-in-out ${d+i*0.7}s infinite` }}/>
        ))}
        {/* Height indicator left */}
        <line x1="12%" y1="20%" x2="12%" y2="80%"
          stroke="rgba(26,95,168,0.45)" strokeWidth="0.8"
          style={{ strokeDashoffset:200, animation:`sal-draw 9s ease-in-out ${d+0.5}s infinite` }}/>
        <line x1="9%" y1="20%" x2="15%" y2="20%" stroke="rgba(26,95,168,0.45)" strokeWidth="0.8"
          style={{ opacity:0, animation:`sal-draw 8s ease-in-out ${d+1}s infinite` }}/>
        <line x1="9%" y1="80%" x2="15%" y2="80%" stroke="rgba(26,95,168,0.45)" strokeWidth="0.8"
          style={{ opacity:0, animation:`sal-draw 8s ease-in-out ${d+1}s infinite` }}/>
        {/* Corner bracket bottom-right */}
        <path d="M80%,92% L92%,92% L92%,80%" fill="none"
          stroke="rgba(255,255,255,0.3)" strokeWidth="0.9"
          style={{ strokeDashoffset:120, animation:`sal-draw 10s ease-in-out ${d+2}s infinite` }}/>
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   06 — VASTU CONSULTATION
   Elegant geometric / directional overlay + spatial grid
───────────────────────────────────────────── */
function Anim06({ index }) {
  const d = index * 1.8
  return (
    <>
      <LightSweep duration={14} delay={d+2} opacity={0.14} color="rgba(255,220,140,1)" />
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Diagonal spatial lines */}
        <line x1="5%" y1="5%" x2="95%" y2="95%"
          stroke="rgba(200,160,80,0.18)" strokeWidth="0.7" strokeDasharray="300"
          style={{ strokeDashoffset:300, animation:`sal-draw 16s ease-in-out ${d}s infinite` }}/>
        <line x1="95%" y1="5%" x2="5%" y2="95%"
          stroke="rgba(200,160,80,0.15)" strokeWidth="0.7" strokeDasharray="300"
          style={{ strokeDashoffset:300, animation:`sal-draw 16s ease-in-out ${d+1}s infinite` }}/>
        {/* Central compass ring */}
        <circle cx="50%" cy="50%" r="18%" fill="none"
          stroke="rgba(200,160,80,0.22)" strokeWidth="0.8" strokeDasharray="8 5"
          style={{ animation:`sal-pulse 5s ease-in-out ${d}s infinite` }}/>
        <circle cx="50%" cy="50%" r="8%" fill="none"
          stroke="rgba(200,160,80,0.3)" strokeWidth="0.6"
          style={{ animation:`sal-pulse 4s ease-in-out ${d+0.5}s infinite` }}/>
        {/* Cardinal direction tick marks */}
        {[0,90,180,270].map((angle,i) => {
          const rad = angle * Math.PI / 180
          const x1 = 50 + 20 * Math.cos(rad - Math.PI/2)
          const y1 = 50 + 20 * Math.sin(rad - Math.PI/2)
          const x2 = 50 + 24 * Math.cos(rad - Math.PI/2)
          const y2 = 50 + 24 * Math.sin(rad - Math.PI/2)
          return <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
            stroke="rgba(220,180,80,0.5)" strokeWidth="1.2"
            style={{ opacity:0, animation:`sal-draw 12s ease-in-out ${d+i*0.4}s infinite` }}/>
        })}
        {/* Spinning needle */}
        <g style={{ transformOrigin:'50% 50%', animation:`sal-spin 35s linear ${d}s infinite` }}>
          <line x1="50%" y1="50%" x2="50%" y2="34%"
            stroke="rgba(220,60,40,0.5)" strokeWidth="1.2"/>
          <line x1="50%" y1="50%" x2="50%" y2="66%"
            stroke="rgba(180,160,100,0.35)" strokeWidth="0.8"/>
        </g>
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   07 — MUNICIPAL APPROVAL (SUJOG)
   Blueprint lines drawing + document scan + approval glow
───────────────────────────────────────────── */
function Anim07({ index }) {
  const d = index * 1.8
  return (
    <>
      {/* Scanning line */}
      <div aria-hidden="true" style={{
        position:'absolute', left:'5%', right:'5%', height:1.5, pointerEvents:'none',
        background:'linear-gradient(90deg,transparent,rgba(60,180,255,0.75),transparent)',
        animation:`sal-scan 4.5s ease-in-out ${d % 2.5}s infinite`,
        willChange:'transform',
      }}/>
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Blueprint border */}
        <rect x="6%" y="6%" width="88%" height="88%" fill="none"
          stroke="rgba(60,160,255,0.2)" strokeWidth="0.8" strokeDasharray="500"
          style={{ strokeDashoffset:500, animation:`sal-draw 12s ease-in-out ${d}s infinite` }}/>
        {/* Document lines */}
        {[20,35,50,65,80].map((y,i) => (
          <line key={i} x1="14%" y1={`${y}%`} x2="86%" y2={`${y}%`}
            stroke="rgba(60,160,255,0.12)" strokeWidth="0.6"
            style={{ strokeDashoffset:300, animation:`sal-draw 10s ease-in-out ${d+i*0.5}s infinite` }}/>
        ))}
        {/* Approval checkmark top-right */}
        <g style={{ opacity:0, animation:`sal-pulse 5s ease-in-out ${d+3}s infinite` }}>
          <circle cx="82%" cy="20%" r="6%" fill="none"
            stroke="rgba(60,200,100,0.5)" strokeWidth="1.2"/>
          <polyline points="77%,20% 81%,24% 87%,16%"
            fill="none" stroke="rgba(60,200,100,0.6)" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* Title block bottom */}
        <rect x="6%" y="82%" width="30%" height="12%" fill="none"
          stroke="rgba(60,160,255,0.2)" strokeWidth="0.6"
          style={{ strokeDashoffset:200, animation:`sal-draw 9s ease-in-out ${d+1.5}s infinite` }}/>
      </svg>
      <LightSweep duration={16} delay={d+4} opacity={0.1} color="rgba(60,160,255,1)" />
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   08 — LANDSCAPE DESIGN
   Atmospheric particles + subtle warm sunlight + organic lines
───────────────────────────────────────────── */
function Anim08({ index }) {
  const d = index * 1.8
  // Particle positions (deterministic, not random)
  const particles = [
    { x:15, y:60, dx:-12, dy:-28 },
    { x:30, y:45, dx: 8,  dy:-35 },
    { x:50, y:70, dx:-5,  dy:-40 },
    { x:65, y:55, dx: 14, dy:-30 },
    { x:80, y:65, dx:-8,  dy:-38 },
    { x:42, y:80, dx: 6,  dy:-45 },
    { x:72, y:75, dx:-10, dy:-32 },
    { x:25, y:85, dx: 10, dy:-42 },
  ]
  return (
    <>
      <LightSweep duration={12} delay={d} opacity={0.16} color="rgba(255,230,160,1)" />
      {/* Atmospheric particles */}
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {particles.map((p,i) => (
          <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="1.5"
            fill="rgba(255,230,180,0.65)"
            style={{
              '--dx': `${p.dx}px`, '--dy': `${p.dy}px`,
              animation:`sal-particle ${5+i*0.7}s ease-out ${d+i*0.6}s infinite`,
            }}/>
        ))}
        {/* Organic horizon line */}
        <path d="M0%,72% Q25%,68% 50%,72% Q75%,76% 100%,70%"
          fill="none" stroke="rgba(100,180,80,0.2)" strokeWidth="0.8"
          style={{ strokeDashoffset:400, animation:`sal-draw 14s ease-in-out ${d+1}s infinite` }}/>
        {/* Water surface ripple lines */}
        {[78,82,86].map((y,i) => (
          <line key={i} x1="20%" y1={`${y}%`} x2="80%" y2={`${y}%`}
            stroke="rgba(120,200,255,0.2)" strokeWidth="0.6"
            style={{ strokeDashoffset:200, animation:`sal-draw 8s ease-in-out ${d+i*0.8+2}s infinite` }}/>
        ))}
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   09 — PROJECT MANAGEMENT
   Architectural wireframe + cinematic light + progress depth
───────────────────────────────────────────── */
function Anim09({ index }) {
  const d = index * 1.8
  return (
    <>
      <LightSweep duration={13} delay={d+1} opacity={0.13} />
      <svg aria-hidden="true" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        {/* Full wireframe building outline */}
        <rect x="20%" y="15%" width="60%" height="72%" fill="none"
          stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="500"
          style={{ strokeDashoffset:500, animation:`sal-draw 12s ease-in-out ${d}s infinite` }}/>
        {/* Floor lines */}
        {[32,49,66].map((y,i) => (
          <line key={i} x1="20%" y1={`${y}%`} x2="80%" y2={`${y}%`}
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"
            style={{ strokeDashoffset:300, animation:`sal-draw 10s ease-in-out ${d+i*0.6}s infinite` }}/>
        ))}
        {/* Column lines */}
        {[35,50,65].map((x,i) => (
          <line key={i} x1={`${x}%`} y1="15%" x2={`${x}%`} y2="87%"
            stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"
            style={{ strokeDashoffset:300, animation:`sal-draw 11s ease-in-out ${d+i*0.5+0.5}s infinite` }}/>
        ))}
        {/* Progress bar bottom */}
        <rect x="10%" y="90%" width="80%" height="3%" rx="1.5%" fill="rgba(255,255,255,0.08)"
          style={{ opacity:0, animation:`sal-draw 10s ease-in-out ${d+2}s infinite` }}/>
        <rect x="10%" y="90%" width="55%" height="3%" rx="1.5%" fill="rgba(26,95,168,0.45)"
          style={{ opacity:0, animation:`sal-draw 10s ease-in-out ${d+2.5}s infinite` }}/>
        {/* Corner marks */}
        <path d="M6%,8% L6%,4% L14%,4%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          style={{ strokeDashoffset:80, animation:`sal-draw 9s ease-in-out ${d+0.3}s infinite` }}/>
        <path d="M86%,4% L94%,4% L94%,8%" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          style={{ strokeDashoffset:80, animation:`sal-draw 9s ease-in-out ${d+0.6}s infinite` }}/>
      </svg>
      <Vignette />
    </>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
   Picks animation layer by service number.
   Returns null (no DOM) if reducedMotion.
───────────────────────────────────────────── */
const LAYERS = {
  '01': Anim01,
  '02': Anim02,
  '03': Anim03,
  '04': Anim04,
  '05': Anim05,
  '06': Anim06,
  '07': Anim07,
  '08': Anim08,
  '09': Anim09,
}

export default function ServiceAnimLayer({ num, index = 0 }) {
  const reduced = useReducedMotion()
  injectKeyframes()

  if (reduced) return null

  const Layer = LAYERS[num]
  if (!Layer) return null

  return <Layer index={index} />
}
