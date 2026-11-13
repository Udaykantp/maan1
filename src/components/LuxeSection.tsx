import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LUXE_BANNER_IMAGE } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function LuxeSection() {
  return (
    <section
      id="luxe-beauty"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <div className="bg-[#161416] text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F48FB1] mb-3">
              MAAN LUXE · PRESTIGE EDIT
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              DISCOVER LUXE BEAUTY
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              High-potency botanical elixirs, couture lip pigments, and small-batch French &amp; Indian eaux de parfum curated for discerning vanities.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-white/85 mb-8">
              <li>· Exclusive Luxury Skincare &amp; Peptide Serums</li>
              <li>· Atelier Aurore &amp; MAC Prestige Editions</li>
              <li>· Complimentary Velvet Gift Wrapping</li>
            </ul>
          </div>

          <div>
            <Link
              to="/luxe"
              className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg transition-colors"
            >
              <span>EXPLORE LUXE</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 min-h-[260px] sm:min-h-[340px]">
          <ProductImage
            src={LUXE_BANNER_IMAGE}
            alt="Maan Discover Luxe Beauty dark editorial collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
