import { Component } from 'react'
import { RefreshCw, WifiOff } from 'lucide-react'

export default class RouteErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() { return { hasError: true } }

  componentDidCatch(error) { console.error('Route loading error:', error) }

  render() {
    if (!this.state.hasError) return this.props.children
    const offline = typeof navigator !== 'undefined' && !navigator.onLine
    return (
      <main className="grid min-h-[70dvh] place-items-center bg-slate-50 px-5 text-center">
        <section aria-labelledby="connection-title" className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-ink/5">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">{offline ? <WifiOff size={26} /> : <RefreshCw size={26} />}</span>
          <h1 id="connection-title" className="mt-5 text-2xl font-extrabold tracking-[-.04em] text-ink">{offline ? 'You appear to be offline.' : 'We could not load this page.'}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Check your connection, then try loading the experience again. Your place in the site is safe.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-brand"><RefreshCw size={16} /> Try again</button>
        </section>
      </main>
    )
  }
}
