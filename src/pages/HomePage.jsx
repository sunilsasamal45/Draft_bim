import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import AboutPreview from '../components/home/AboutPreview'
import AboutDetails from '../components/home/AboutDetails'
import Services from '../components/home/Services'
import PlatformFeatures from '../components/home/PlatformFeatures'
import Portfolio from '../components/home/Portfolio'
import Process from '../components/home/Process'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'
import ContactSection from '../components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      {/* HOME */}
      <div id="home">
        <Hero />
        <Stats />
      </div>

      {/* ABOUT US */}
      <div id="about">
        <AboutPreview />
        <AboutDetails />
      </div>

      {/* SERVICES */}
      <div id="services">
        <Services />
        <PlatformFeatures />
        <Process />
      </div>

      {/* PROJECTS */}
      <div id="portfolio">
        <Portfolio />
      </div>

      {/* TESTIMONIALS */}
      <Testimonials />

      <CTA />

      {/* CONTACT */}
      <div id="contact">
        <ContactSection />
      </div>
    </>
  )
}
