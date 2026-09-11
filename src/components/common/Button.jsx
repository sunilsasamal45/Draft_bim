import { Link } from 'react-router-dom'

const variants = {
  dark: 'bg-ink text-white shadow-lg shadow-ink/10 hover:-translate-y-0.5 hover:bg-brand-dark',
  light: 'bg-white text-ink shadow-lg shadow-ink/20 hover:-translate-y-0.5 hover:bg-brand hover:text-white',
  outline: 'border border-brand bg-white text-brand hover:-translate-y-0.5 hover:bg-brand hover:text-white',
}
const base = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2'
export default function Button({ children, to, className = '', variant = 'dark', ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`
  return to ? <Link to={to} className={classes}>{children}</Link> : <button className={classes} {...props}>{children}</button>
}
