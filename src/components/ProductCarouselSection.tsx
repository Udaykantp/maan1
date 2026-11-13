import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/catalog';
import { ProductCard } from './ProductCard';

interface ProductCarouselSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  badgeMode?: 'discount' | 'new';
  viewAllTo: string;
}

export function ProductCarouselSection({
  id,
  title,
  subtitle,
  products,
  badgeMode = 'discount',
  viewAllTo,
}: ProductCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to={viewAllTo}
            className="text-xs font-semibold text-[#E80071] hover:underline whitespace-nowrap"
          >
            View All
          </Link>
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              aria-label={`Scroll ${title} left`}
              className="w-8 h-8 rounded-full border border-[#EEEEEE] bg-white hover:border-[#E80071] text-[#282828] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              aria-label={`Scroll ${title} right`}
              className="w-8 h-8 rounded-full border border-[#EEEEEE] bg-white hover:border-[#E80071] text-[#282828] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            badgeMode={badgeMode}
            className="w-[230px] sm:w-[260px] shrink-0 snap-start"
          />
        ))}
      </div>
    </section>
  );
}
