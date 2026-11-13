import { ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, TOP_BRANDS } from '../data/catalog';

export function BrandsPage() {
  const { brandSlug } = useParams<{ brandSlug?: string }>();
  const activeBrand = brandSlug ? decodeURIComponent(brandSlug) : null;

  const activeBrandMeta = activeBrand
    ? TOP_BRANDS.find(
        (b) => b.name.toLowerCase() === activeBrand.toLowerCase(),
      )
    : null;

  const brandProducts = activeBrand
    ? PRODUCTS.filter(
        (p) => p.brand.toLowerCase() === activeBrand.toLowerCase(),
      )
    : PRODUCTS;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <Link to="/brands" className="hover:text-[#E80071]">
          Brands
        </Link>
        {activeBrand && (
          <>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-semibold text-[#282828]">{activeBrand}</span>
          </>
        )}
      </nav>

      <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-6 sm:p-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#E80071] mb-1">
            {activeBrandMeta ? activeBrandMeta.offerText : '100% AUTHENTIC PARTNER HOUSES'}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828]">
            {activeBrand || 'Top Beauty Brands on Maan'}
          </h1>
          <p className="text-sm text-[#777777] mt-1">
            {activeBrandMeta
              ? activeBrandMeta.tagline
              : 'Select any house below to explore verified cosmetics, skincare, and fragrance.'}
          </p>
        </div>

        {activeBrand && (
          <Link
            to="/brands"
            className="self-start md:self-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-white border border-[#EEEEEE] hover:border-[#E80071] text-[#282828] rounded-lg"
          >
            View All Brands
          </Link>
        )}
      </div>

      {/* Brand Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
        {TOP_BRANDS.map((brand) => {
          const isSelected =
            activeBrand?.toLowerCase() === brand.name.toLowerCase();
          return (
            <Link
              key={brand.name}
              to={`/brand/${encodeURIComponent(brand.name)}`}
              className={`p-4 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-[#E80071] text-white border-[#E80071]'
                  : 'bg-white text-[#282828] border-[#EEEEEE] hover:border-[#E80071]'
              }`}
            >
              <p className="font-display text-sm font-bold">{brand.name}</p>
              <p
                className={`text-[11px] mt-0.5 ${
                  isSelected ? 'text-white/90' : 'text-[#E80071] font-semibold'
                }`}
              >
                {brand.offerText}
              </p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display text-lg font-bold text-[#282828] mb-5">
        {activeBrand ? `${activeBrand} Products (${brandProducts.length})` : 'All Featured Brand Icons'}
      </h2>

      {brandProducts.length === 0 ? (
        <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-xl p-10 text-center">
          <p className="text-sm text-[#777777] mb-4">
            New {activeBrand} launches are arriving soon. Explore our complete catalog in the meantime.
          </p>
          <Link
            to="/category/All"
            className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#E80071] text-white rounded-lg"
          >
            Shop All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
