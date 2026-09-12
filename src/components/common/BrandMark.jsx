import logoTransparent from '../../assets/Logo/draft-bim-transparent.png'
import logoOriginal from '../../assets/Logo/draft-bim-logo.png'

export default function BrandMark({ light = false }) {
  const logo = light ? logoOriginal : logoTransparent
  /*
   * The logo PNG canvas is 500×500 with ~30% padding around the artwork.
   * We need a larger rendered size so the visible branding is clearly readable.
   * clamp(80px, 10vw, 120px) → ~80px mobile, ~96px at 960px, 120px desktop.
   */
  return (
    <img
      src={logo}
      alt="Draft BIM"
      style={{
        height: 'clamp(80px, 10vw, 120px)',
        width: 'auto',
        maxWidth: 300,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
      }}
    />
  )
}
