import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TOP_OFFERS } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function TopOffersSection() {
  return (
    <section
      id="top-offers"
      className="bg-[#FFF5F9] border-y border-[#EEEEEE] py-10 sm:py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
              BEST OFFERS FOR YOU
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-0.5">
              Curated Beauty Festival deals across makeup, skincare, and haircare
            </p>
          </div>
          <Link
            to="/offers"
            className="text-xs font-semibold text-[#E80071] hover:underline whitespace-nowrap"
          >
            See All Offers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {TOP_OFFERS.map((offer) => (
            <Link
              key={offer.id}
              to={`/category/${encodeURIComponent(offer.targetCategory)}`}
              className="group bg-white border border-[#EEEEEE] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5F9]">
                <ProductImage
                  src={offer.image}
                  alt={offer.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#E80071] text-white text-[10px] font-bold tracking-wider uppercase">
                  {offer.badge}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-display text-sm font-bold text-[#282828] mb-1 group-hover:text-[#E80071] transition-colors">
                  {offer.headline}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed mb-4 flex-1">
                  {offer.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E80071]">
                  {offer.cta}
                  <ArrowRight
                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
