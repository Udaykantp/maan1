import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRENDING_TILES } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function TrendingNowSection() {
  return (
    <section
      id="trending-now"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <div className="mb-6">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
          TRENDING NOW
        </h2>
        <p className="text-xs sm:text-sm text-[#777777] mt-0.5">
          What India&apos;s beauty lovers are adding to their vanity this week
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TRENDING_TILES.map((tile) => {
          const target =
            tile.filterTag === 'luxe'
              ? '/luxe'
              : tile.filterTag
                ? `/category/${encodeURIComponent(tile.targetCategory)}?q=${encodeURIComponent(tile.filterTag)}`
                : `/category/${encodeURIComponent(tile.targetCategory)}`;
          return (
            <Link
              key={tile.id}
              to={target}
              className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#EEEEEE] text-left"
            >
              <ProductImage
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-0.5">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-white/85">{tile.subtitle}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-white/95 text-[#282828] group-hover:bg-[#E80071] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
