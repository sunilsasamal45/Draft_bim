function Shimmer({ className }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} />
}

export default function RouteSkeleton() {
  return (
    <section aria-label="Loading page" aria-busy="true" className="relative overflow-hidden bg-slate-50 py-12 sm:py-16">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <span className="sr-only">Loading page content</span>
        <div className="grid min-h-[60dvh] items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div className="space-y-5"><Shimmer className="h-3 w-32" /><Shimmer className="h-14 w-full max-w-2xl" /><Shimmer className="h-14 w-4/5 max-w-xl" /><Shimmer className="h-5 w-full max-w-lg" /><Shimmer className="h-5 w-4/5 max-w-md" /><div className="flex gap-3 pt-3"><Shimmer className="h-11 w-40" /><Shimmer className="h-11 w-32" /></div></div>
          <Shimmer className="h-72 w-full sm:h-[420px]" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3"><Shimmer className="h-36" /><Shimmer className="h-36" /><Shimmer className="h-36" /></div>
      </div>
    </section>
  )
}
