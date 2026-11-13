import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { LUXE_BANNER_IMAGE, PRODUCTS } from '../data/catalog';

export function LuxePage() {
  const luxeProducts = PRODUCTS.filter((p) => p.isLuxe || p.variants[0].price >= 1100);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">Maan Luxe</span>
      </nav>

      <div className="bg-[#161416] text-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch mb-10">
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F48FB1] mb-3">
            MAAN LUXE · PRESTIGE BEAUTY
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Couture Cosmetics &amp; Fine Perfumery
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Small-batch fragrances, 24K peptide recovery elixirs, and prestige complexion icons packaged with complimentary velvet gift wrapping.
          </p>
        </div>

        <div className="lg:col-span-7 min-h-[260px] sm:min-h-[340px]">
          <ProductImage
            src={LUXE_BANNER_IMAGE}
            alt="Maan Luxe Prestige Beauty collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h2 className="font-display text-xl font-bold text-[#282828] mb-6">
        PRESTIGE COLLECTION ({luxeProducts.length})
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {luxeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
