import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import RouteErrorBoundary from '../components/common/RouteErrorBoundary'
import ScrollToTop from './ScrollToTop'

const HomePage = lazy(() => import('../pages/HomePage'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* All old routes redirect to home — single page */}
            <Route path="about" element={<HomePage />} />
            <Route path="services" element={<HomePage />} />
            <Route path="portfolio" element={<HomePage />} />
            <Route path="contact" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RouteErrorBoundary>
    </BrowserRouter>
  )
}
