interface MapBlockProps {
  title: string
  description?: string
  mapEmbedUrl: string
  height?: string
}

export function MapBlock({ title, description, mapEmbedUrl, height = "400px" }: MapBlockProps) {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">{title}</h2>
          {description && <p className="text-lg opacity-90">{description}</p>}
        </div>

        {mapEmbedUrl && (
          <div className="max-w-4xl mx-auto">
            <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={title || 'Map'}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
