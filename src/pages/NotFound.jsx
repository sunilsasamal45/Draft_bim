import { ArrowRight, HardHat, Home, Ruler } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../components/common/Container'

export default function NotFound() {
  return (
    <main className="relative isolate min-h-[calc(100dvh-76px)] overflow-hidden bg-slate-50 py-16 sm:py-24">
      <div className="blueprint-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <div className="absolute -right-20 top-12 -z-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <Container className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative mx-auto grid h-64 w-full max-w-md place-items-center overflow-hidden rounded-3xl border border-brand/20 bg-white shadow-xl shadow-ink/5 sm:h-80">
          <div className="absolute bottom-9 h-2 w-64 rounded-full bg-ink/10" />
          <div className="absolute bottom-11 h-16 w-48 border-x-4 border-t-4 border-brand/70" />
          <div className="absolute bottom-[108px] h-16 w-24 border-x-4 border-t-4 border-brand" />
          <div className="absolute bottom-[171px] h-3 w-3 rounded-full bg-brand" />
          <div className="absolute bottom-[174px] left-1/2 h-1 w-36 -translate-x-1/2 bg-brand" />
          <div className="absolute bottom-[138px] left-1/2 h-9 w-px -translate-x-1/2 bg-brand" />
          <div className="absolute bottom-[107px] left-[calc(50%+2px)] h-8 w-20 origin-top-left rotate-[35deg] border-t-2 border-brand" />
          <div className="absolute bottom-[82px] left-[calc(50%+68px)] h-6 w-6 animate-bounce border-2 border-brand bg-white" />
          <span className="absolute left-7 top-7 grid h-12 w-12 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/20"><HardHat size={24} /></span>
          <span className="absolute bottom-6 right-6 text-[72px] font-extrabold leading-none tracking-[-.1em] text-ink/10">404</span>
        </div>
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-brand"><Ruler size={15} /> Wrong coordinates</p>
          <h1 className="mt-5 text-5xl font-extrabold leading-[.95] tracking-[-.06em] text-ink sm:text-6xl">This page is still under construction<span className="text-brand">.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">The blueprint you followed does not lead anywhere yet. Let’s guide you back to a place where great ideas are taking shape.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white shadow-lg shadow-ink/10 transition hover:-translate-y-0.5 hover:bg-brand">Return home <Home size={16} /></Link><Link to="/services" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand bg-white px-5 py-3 text-sm font-bold text-brand transition hover:-translate-y-0.5 hover:bg-brand hover:text-white">Explore services <ArrowRight size={16} /></Link></div>
        </div>
      </Container>
    </main>
  )
}
