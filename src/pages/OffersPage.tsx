import { Check, ChevronRight, Copy } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { TopOffersSection } from '../components/TopOffersSection';
import { PRODUCTS, PROMO_CODES } from '../data/catalog';

export function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => undefined);
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
          <Link to="/" className="hover:text-[#E80071]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="font-semibold text-[#282828]">Beauty Festival Offers</span>
        </nav>

        <div className="bg-[#E80071] text-white rounded-2xl p-6 sm:p-10 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/85 mb-2">
            LIMITED TIME FESTIVAL CODES
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-bold mb-2">
            Beauty Festival Steals &amp; Bank Coupons
          </h1>
          <p className="text-sm sm:text-base text-white/90 mb-6 max-w-2xl">
            Copy any active Maan coupon below and apply it in your Shopping Bag for instant festival savings.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(PROMO_CODES).map(([code, details]) => (
              <div
                key={code}
                className="bg-white text-[#282828] rounded-xl p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-display text-base font-bold text-[#E80071]">
                    {code}
                  </p>
                  <p className="text-xs text-[#555555]">{details.label}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(code)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#FFF5F9] text-[#E80071] hover:bg-[#E80071] hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode === code ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TopOffersSection />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h2 className="font-display text-xl font-bold text-[#282828] mb-6">
          FESTIVAL PRICE DROPS ({PRODUCTS.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
