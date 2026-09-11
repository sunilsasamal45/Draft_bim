import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../common/Container'
import BrandMark from '../common/BrandMark'

export default function Footer() {
  return (
    <footer className="bg-[#031c2e] py-14 text-slate-200">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]">
          <div>
            <BrandMark light />
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-300">
              Architectural Engineering Consultants based in Koraput, Odisha — turning your design dreams into reality.
            </p>
            <div className="mt-5 grid gap-2 text-xs text-slate-300">
              <a href="tel:+918328992742" className="flex items-center gap-2 transition hover:text-brand"><Phone size={13} />+91 8328992742</a>
              <a href="mailto:Draftbim@gmail.com" className="flex items-center gap-2 transition hover:text-brand"><Mail size={13} />Draftbim@gmail.com</a>
              <span className="flex items-center gap-2"><MapPin size={13} />Koraput, Odisha, India</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Quick Links</h3>
            <nav aria-label="Footer navigation" className="mt-4 grid gap-2 text-sm text-slate-300">
              <Link to="/" className="transition hover:text-brand">Home</Link>
              <Link to="/services" className="transition hover:text-brand">Service</Link>
              <Link to="/about" className="transition hover:text-brand">About Us</Link>
              <Link to="/portfolio" className="transition hover:text-brand">Projects</Link>
              <Link to="/contact" className="transition hover:text-brand">Contact</Link>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Our Services</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <span>Architectural Planning &amp; Master Plans</span>
              <span>Structural Design (RCC &amp; PEB)</span>
              <span>Interior Design (2D &amp; 3D)</span>
              <span>Municipal Building Plan Approval</span>
              <span>Technical Consultancy &amp; Site Guidance</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Get In Touch</h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              Let's discuss your project and bring your architectural vision to life.
            </p>
            <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-white">
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/20 pt-6 text-xs text-white sm:flex-row sm:justify-between">
          <p className="font-semibold text-white">© {new Date().getFullYear()} Draft BIM. All rights reserved.</p>
          <p className="text-center font-semibold text-white">
            © {new Date().getFullYear()} <a href="https://swiftrisesolution.com" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-2 transition hover:text-brand">Swiftrise Solution Pvt.Ltd.</a> DEVELOPED BY
          </p>
          <p className="font-semibold text-white">Er. Vijay Kumar Achary · Founder · AM3119915</p>
        </div>
      </Container>
    </footer>
  )
}
