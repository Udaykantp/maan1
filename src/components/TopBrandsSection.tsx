import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TOP_BRANDS } from '../data/catalog';

export function TopBrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="top-brands"
      className="bg-[#FFF5F9] border-y border-[#EEEEEE] py-10 sm:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
              TOP BRANDS
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-0.5">
              100% authentic beauty icons from leading Indian and global houses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/brands"
              className="text-xs font-semibold text-[#E80071] hover:underline whitespace-nowrap"
            >
              All Brands
            </Link>
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll brands left"
                className="w-8 h-8 rounded-full border border-[#EEEEEE] bg-white hover:border-[#E80071] text-[#282828] flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll brands right"
                className="w-8 h-8 rounded-full border border-[#EEEEEE] bg-white hover:border-[#E80071] text-[#282828] flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x"
        >
          {TOP_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              to={`/brand/${encodeURIComponent(brand.name)}`}
              className="group w-[190px] sm:w-[215px] shrink-0 snap-start bg-white rounded-xl border border-[#EEEEEE] hover:border-[#E80071] p-5 text-center flex flex-col items-center justify-between transition-all duration-200 hover:shadow-md"
            >
              <div className="h-14 flex items-center justify-center w-full border-b border-[#EEEEEE] pb-3 mb-3">
                <span
                  className={`text-lg text-[#282828] tracking-tight ${
                    brand.accentStyle === 'serif'
                      ? 'font-display font-bold'
                      : brand.accentStyle === 'mono'
                        ? 'font-bold tracking-widest uppercase text-base'
                        : brand.accentStyle === 'bold'
                          ? 'font-extrabold uppercase text-base'
                          : 'font-semibold tracking-wide'
                  }`}
                >
                  {brand.name}
                </span>
              </div>

              <p className="text-xs text-[#777777] mb-2 line-clamp-1">
                {brand.tagline}
              </p>
              <p className="text-xs font-bold text-[#E80071] mb-3">
                {brand.offerText}
              </p>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#282828] px-3 py-1.5 rounded bg-[#F5F5F6] group-hover:bg-[#E80071] group-hover:text-white transition-colors">
                Shop Brand
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
