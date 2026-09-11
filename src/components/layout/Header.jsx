import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import BrandMark from '../common/BrandMark'
import { NAV_ITEMS } from '../../utils/constants'

function scrollTo(id) {
  const el = document.getElementById(id.replace('#', ''))
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const BAR_H = 90 // total navbar height in px

export default function Header() {
  const [open, setOpen] = useState(false)

  const links = NAV_ITEMS.map((item) => (
    <a
      key={item.to}
      onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo(item.to) }}
      href={item.to}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 800,
        color: '#0c1f3d',
        textDecoration: 'none',
        cursor: 'pointer',
        paddingTop: 8,
        paddingBottom: 8,
      }}
      className="group transition hover:text-brand after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      {item.label}
    </a>
  ))

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(226,232,240,0.7)',
      backgroundColor: 'rgba(255,255,255,0.93)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      {/* ── Navbar row ── */}
      <div style={{
        position: 'relative',
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 32px',
        height: BAR_H,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
          aria-label="Draft BIM home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'center',
            flexShrink: 0,
            textDecoration: 'none',
            lineHeight: 0,
          }}
        >
          <BrandMark />
        </a>

        {/* Desktop nav — absolutely centered relative to viewport */}
        <nav
          id="main-nav"
          aria-label="Main navigation"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 36,
            margin: 0,
            padding: 0,
          }}
        >
          {links}
        </nav>

        {/* Hamburger */}
        <button
          id="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',        /* shown on mobile via CSS */
            placeItems: 'center',
            height: 40,
            width: 40,
            borderRadius: 6,
            border: '1px solid #e2e8f0',
            background: 'transparent',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ borderTop: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            {links}
          </div>
        </div>
      )}

      {/* Scoped styles — these win over everything */}
      <style>{`
        #main-nav {
          display: flex !important;
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          align-items: center !important;
        }
        #nav-hamburger { display: none !important; }
        @media (max-width: 1023px) {
          #main-nav { display: none !important; }
          #nav-hamburger { display: grid !important; }
        }
      `}</style>
    </header>
  )
}
