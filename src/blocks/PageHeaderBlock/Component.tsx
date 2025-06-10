import Image from 'next/image';

interface PageHeaderBlockProps {
  title: string
  subtitle?: string
  backgroundImage?: string | { url?: string; alt?: string; filename?: string } // Payload media object or URL string
}

export function PageHeaderBlock({ title, subtitle, backgroundImage }: PageHeaderBlockProps) {
  const bgImageUrl = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage?.url;
  const bgImageAlt = typeof backgroundImage === 'string' ? title : backgroundImage?.alt || backgroundImage?.filename || title;

  return (
    <section className={`py-16 ${bgImageUrl ? 'relative text-white' : 'bg-gray-50 text-gray-800'}`}>
      {bgImageUrl && (
        <Image 
          src={bgImageUrl} 
          alt={bgImageAlt} 
          fill 
          className="object-cover -z-10"
          priority
        />
      )}
      {bgImageUrl && <div className="absolute inset-0 bg-black/50 -z-10" />} {/* Overlay for readability */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className={`text-4xl md:text-5xl font-bold ${bgImageUrl ? 'text-white' : 'text-blue-600'} mb-4`}>{title}</h1>
        {subtitle && <p className={`text-lg ${bgImageUrl ? 'text-gray-200' : 'text-gray-600'} max-w-2xl mx-auto`}>{subtitle}</p>}
      </div>
    </section>
  )
}
