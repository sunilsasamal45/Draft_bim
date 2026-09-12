import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Award, Building2, ClipboardCheck, Users } from 'lucide-react'
import Container from '../common/Container'

// end = numeric target, suffix = e.g. '+' or '%', static = show as-is (no animation)
const stats = [
  [Building2,    500,        '+',  'Projects Designed & Delivered'],
  [ClipboardCheck, 100,      '%',  'Municipal Approval Success Rate'],
  [Users,        10,         '+',  'Years of Industry Experience'],
  [Award,        'AM3119915', '',  'Associate Member India \u2013 Certified'],
]

function AnimatedNumber({ end, suffix }) {
  const node = useRef(null)
  const visible = useInView(node, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!visible) return undefined
    if (reducedMotion) { setValue(end); return undefined }
    const duration = 1800 // ms
    const startTime = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, reducedMotion, visible])

  return <span ref={node}>{value}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="relative z-20 -mt-2 pb-16">
      <Container>
        <div className="grid overflow-hidden rounded-xl border border-cyan-100 bg-white shadow-[0_12px_30px_rgba(6,34,56,.08)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([Icon, value, suffix, label]) => (
            <div key={label} className="flex gap-4 border-b border-cyan-100 p-6 last:border-b-0 sm:[&:nth-child(2)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
              <Icon className="mt-1 shrink-0 text-brand" size={31} strokeWidth={1.7} />
              <div>
                <p className="text-xl font-extrabold text-brand">
                  {typeof value === 'number'
                    ? <AnimatedNumber end={value} suffix={suffix} />
                    : value
                  }
                </p>
                <p className="mt-1 text-[11px] font-extrabold text-ink">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
