import { ImgHTMLAttributes, useState } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ImageWithFallback({ src, alt, className, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className={`bg-muted animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        {...props}
      />
    </>
  );
}
