import { Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import RouteSkeleton from '../common/RouteSkeleton'
export default function Layout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: .001 })
  return <div className="flex min-h-screen flex-col"><motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand" style={{ scaleX }} /><Header /><main className="flex-1"><Suspense fallback={<RouteSkeleton />}><Outlet /></Suspense></main><Footer /></div>
}
