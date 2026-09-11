export default function Loader({ label = 'Preparing your visualization' }) {
  return (
    <div className="grid min-h-48 place-items-center bg-slate-50 px-6" role="status" aria-live="polite">
      <div className="text-center">
        <div className="relative mx-auto h-20 w-28">
          <span className="absolute bottom-1 left-0 right-0 h-1 rounded-full bg-brand/20" />
          <span className="absolute bottom-2 left-4 h-3 w-3 rounded-sm border-2 border-brand bg-white" />
          <span className="absolute bottom-2 right-4 h-3 w-3 rounded-sm border-2 border-brand bg-white" />
          <span className="absolute bottom-5 left-6 h-3 w-16 rounded-sm bg-ink" />
          <span className="absolute bottom-8 left-9 h-7 w-2 bg-brand" />
          <span className="absolute bottom-[60px] left-10 h-2 w-2 rounded-full bg-brand" />
          <span className="absolute bottom-[62px] left-11 h-1 w-16 origin-left animate-pulse bg-brand" />
          <span className="absolute bottom-[62px] right-2 h-1 w-1 rotate-45 bg-brand" />
          <span className="absolute bottom-[44px] left-[70px] h-7 w-px bg-brand" />
          <span className="absolute bottom-[38px] left-[67px] h-6 w-8 origin-bottom-left -rotate-[28deg] border-t-2 border-brand" />
          <span className="absolute bottom-[20px] left-[86px] h-4 w-4 animate-bounce rounded-sm border-2 border-brand bg-white" />
        </div>
        <p className="mt-4 text-xs font-extrabold uppercase tracking-[.18em] text-ink">{label}</p>
        <p className="mt-2 text-xs text-slate-500">Constructing the experience</p>
      </div>
    </div>
  )
}
