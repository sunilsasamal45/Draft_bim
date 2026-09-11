import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0, y = 24 }) {
  const reduceMotion = useReducedMotion()
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y, filter: 'blur(8px)' }} whileInView={reduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
