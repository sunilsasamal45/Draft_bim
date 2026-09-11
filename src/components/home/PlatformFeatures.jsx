import { Award, Building2, FileCheck2, Layers, Map, PencilRuler } from 'lucide-react'
import Container from '../common/Container'

const features = [
  [Building2, 'Residential Design'],
  [Layers, 'Commercial Projects'],
  [PencilRuler, 'Structural Engineering'],
  [Map, 'Master Planning'],
  [FileCheck2, 'Plan Approval (Sujog / ePBASR)'],
  [Award, 'DTP Certified Consultant'],
]

export default function PlatformFeatures() {
  return (
    <section className="relative overflow-hidden bg-[#03243b] py-16 text-white lg:py-20">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-brand">Our capabilities</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">One firm. Every stage of your project.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300">
            Draft BIM brings together architectural, structural, and regulatory expertise so your project is guided by the same trusted team from concept to completion.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, label]) => (
            <article key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
                <Icon size={19} />
              </span>
              <h3 className="text-sm font-bold">{label}</h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
