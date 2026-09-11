import { ArrowRight, PencilRuler } from 'lucide-react'
import Container from '../common/Container'
import Button from '../common/Button'
import interiorImage from '../../assets/images/luxury-interior.png'

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden py-16 text-white">
      <img src={interiorImage} alt="Draft BIM architectural interior design" className="image-drift absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-brand/60" />
      <div className="blueprint-grid absolute inset-0 -z-10 opacity-20" />
      <Container className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex gap-5">
          <PencilRuler className="hidden sm:block" size={50} strokeWidth={1} />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Design your dream home</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-.035em] sm:text-3xl">Ready to Start Your Project with Draft BIM?</h2>
            <p className="mt-2 text-sm text-white/85">Let's turn your vision into approved, construction-ready plans.</p>
          </div>
        </div>
        <Button variant="light" to="/contact" className="shrink-0">
          Get a Quote <ArrowRight size={16} />
        </Button>
      </Container>
    </section>
  )
}
