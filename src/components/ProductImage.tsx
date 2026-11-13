import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  title,
  className = '',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F4EEEC] via-[#EAE0DD] to-[#E2D4D0] text-[#6D5B5E] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 mb-2 text-[#C81D55]/70" aria-hidden="true" />
        <span className="font-display text-sm font-medium text-[#1C1718]">
          {title || 'Maan Beauty'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
