import { ArrowRight, ImageIcon } from 'lucide-react'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionTitle from '../common/SectionTitle'
import Reveal from '../common/Reveal'

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 lg:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionTitle
            eyebrow="Our Recent Projects"
            title="Showcasing exceptional designs that meet our clients' needs."
            description="At Draft BIM, we pride ourselves on delivering thoughtful planning and creative solutions. Explore our showcased projects to see how we bring visions to life — from residential homes to commercial complexes across Odisha."
          />
          <span className="mx-auto mt-8 grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
            <ImageIcon size={26} />
          </span>
          <p className="mt-4 text-sm text-slate-500">Project gallery coming soon — marketing-approved projects will be featured here.</p>
          <Button to="/contact" className="mt-7">
            Discuss Your Project <ArrowRight size={16} />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
