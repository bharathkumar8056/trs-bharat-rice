"use client"

const fallbackImage = (title: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%231e3a8a'/><stop offset='100%25' stop-color='%23b45309'/></linearGradient></defs><rect fill='url(%23g)' width='1200' height='600'/><text x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='42' font-weight='700' fill='%23ffffff' text-anchor='middle'>${title}</text><text x='50%25' y='62%25' font-family='Arial, sans-serif' font-size='22' fill='%23fde68a' text-anchor='middle'>TRS Bharat Blog</text></svg>`,
  )}`

export function BlogImage({
  src,
  alt,
  category,
  className,
}: {
  src: string
  alt: string
  category: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.target as HTMLImageElement
        img.src = fallbackImage(category)
      }}
    />
  )
}
