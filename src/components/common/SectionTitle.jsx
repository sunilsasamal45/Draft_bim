export default function SectionTitle({ eyebrow, title, description }) {
  return <div className="max-w-2xl">
    {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>}
    <h2 className="text-3xl font-extrabold tracking-[-.045em] text-ink sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-7 text-slate-600">{description}</p>}
  </div>
}
