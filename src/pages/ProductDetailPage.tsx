import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { useStore } from '../context/StoreContext';
import {
  PRODUCTS,
  formatINR,
  getDiscountPercent,
} from '../data/catalog';

type DetailTab = 'overview' | 'ingredients' | 'reviews';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { wishlistIds, toggleWishlist, addToBag } = useStore();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === productId),
    [productId],
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [pinInput, setPinInput] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!product) return;
    const requestedVariant = searchParams.get('variant');
    const matched = product.variants.find((v) => v.id === requestedVariant);
    setSelectedVariantId(matched ? matched.id : product.variants[0].id);
    setQuantity(1);
    setActiveTab('overview');
  }, [product, searchParams]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-[#282828] mb-2">
          Product Not Found
        </h1>
        <p className="text-sm text-[#777777] mb-6">
          This item may have sold out or moved to a new collection.
        </p>
        <Link
          to="/category/All"
          className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#E80071] text-white rounded-lg"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];
  const discount = getDiscountPercent(activeVariant.price, activeVariant.mrp);
  const isWishlisted = wishlistIds.includes(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 5);

  const handleCheckPin = () => {
    if (!/^\d{6}$/.test(pinInput.trim())) {
      setPinStatus('Enter a valid 6-digit PIN code (e.g., 400001).');
      return;
    }
    setPinStatus(`Express delivery available to ${pinInput.trim()} · Estimated 2–3 days`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#777777] mb-6">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <Link
          to={`/category/${encodeURIComponent(product.category)}`}
          className="hover:text-[#E80071]"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828] truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 items-start">
        {/* Left: Sticky Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-32 bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl overflow-hidden">
          <div className="aspect-[4/3]">
            <ProductImage
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              title={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Sticky Purchase Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <Link
              to={`/brand/${encodeURIComponent(product.brand)}`}
              className="inline-block text-xs font-bold uppercase tracking-wider text-[#E80071] hover:underline mb-1.5"
            >
              {product.brand}
            </Link>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828] leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-[#777777] mb-4">{product.subtitle}</p>

            <div className="flex items-center gap-2 text-xs text-[#777777] pb-4 border-b border-[#EEEEEE]">
              <span className="inline-flex items-center gap-1 font-bold text-[#282828] tabular-nums bg-[#FFF5F9] px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-[#E80071] text-[#E80071]" aria-hidden="true" />
                {product.rating.toFixed(1)}
              </span>
              <span className="tabular-nums">
                {product.reviewCount.toLocaleString('en-IN')} verified ratings
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 tabular-nums">
            <span className="text-3xl font-bold text-[#282828]">
              {formatINR(activeVariant.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-base text-[#777777] line-through">
                  {formatINR(activeVariant.mrp)}
                </span>
                <span className="text-sm font-bold text-[#E80071]">
                  {discount}% Off
                </span>
              </>
            )}
            <span className="text-xs text-[#777777] ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Shade / Size Variant Selector */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2.5">
              {activeVariant.swatchHex ? 'Select Shade' : 'Select Size'}:{' '}
              <span className="text-[#282828] normal-case tracking-normal">
                {activeVariant.label}
              </span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((variant) => {
                const selected = variant.id === activeVariant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    aria-pressed={selected}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#282828] text-white border-[#282828]'
                        : 'bg-white text-[#282828] border-[#EEEEEE] hover:border-[#E80071]'
                    }`}
                  >
                    {variant.swatchHex && (
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                        style={{ backgroundColor: variant.swatchHex }}
                        aria-hidden="true"
                      />
                    )}
                    <span>{variant.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Primary CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="inline-flex items-center border border-[#EEEEEE] rounded-lg bg-[#F5F5F6]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-11 flex items-center justify-center text-[#282828] hover:text-[#E80071] cursor-pointer"
              >
                <Minus className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="w-9 text-center text-sm font-bold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="w-10 h-11 flex items-center justify-center text-[#282828] hover:text-[#E80071] cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToBag(product, activeVariant.id, quantity)}
              className="flex-1 py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#E80071] hover:bg-[#C90061] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Add to Bag · {formatINR(activeVariant.price * quantity)}
            </button>

            <button
              type="button"
              onClick={() => {
                addToBag(product, activeVariant.id, quantity);
                navigate('/checkout');
              }}
              className="py-3 px-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#282828] border border-[#282828] hover:bg-[#282828] hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Buy Now
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-pressed={isWishlisted}
              className="w-11 h-11 rounded-lg border border-[#EEEEEE] bg-white flex items-center justify-center hover:border-[#E80071] transition-colors cursor-pointer shrink-0"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#E80071] text-[#E80071]' : 'text-[#777777]'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#282828]">
              <Truck className="w-4 h-4 text-[#E80071]" aria-hidden="true" />
              <span>Check Delivery &amp; COD Availability</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 6-digit PIN code"
                aria-label="Delivery PIN code"
                className="flex-1 px-3 py-2 text-sm bg-white border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071] tabular-nums"
              />
              <button
                type="button"
                onClick={handleCheckPin}
                className="px-4 py-2 text-xs font-bold uppercase text-[#E80071] bg-white border border-[#E80071] hover:bg-[#E80071] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                Check
              </button>
            </div>
            {pinStatus && <p className="text-xs text-[#282828]">{pinStatus}</p>}
            <p className="text-[11px] text-[#777777] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E80071]" aria-hidden="true" />
              100% Authentic · Easy 15-day returns · Free shipping above ₹499
            </p>
          </div>

          {/* Tabs: Overview, Key Ingredients, Verified Reviews */}
          <div className="border-t border-[#EEEEEE] pt-5">
            <div className="flex items-center gap-6 border-b border-[#EEEEEE] mb-4">
              {(
                [
                  { id: 'overview', label: 'Details & Usage' },
                  { id: 'ingredients', label: 'Key Ingredients' },
                  { id: 'reviews', label: `Reviews (${product.reviews.length})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#E80071] text-[#282828]'
                      : 'border-transparent text-[#777777] hover:text-[#282828]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-3 text-sm text-[#555555] leading-relaxed">
                <p>{product.description}</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#282828] mb-1">
                    How to Use
                  </p>
                  <p>{product.howToUse}</p>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <ul className="space-y-2 text-sm text-[#555555]">
                {product.keyIngredients.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#E80071] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="pb-4 border-b border-[#EEEEEE] last:border-b-0"
                  >
                    <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
                      <span className="font-bold text-[#282828]">
                        {rev.author} · {rev.city}
                      </span>
                      <span>{rev.date}</span>
                    </div>
                    <p className="text-xs text-[#777777] mb-1">
                      Verified: {rev.verifiedVariant} · {rev.rating}.0 / 5
                    </p>
                    <p className="text-sm text-[#282828] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="border-t border-[#EEEEEE] pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#282828]">
            YOU MAY ALSO LIKE
          </h2>
          <Link
            to="/category/All"
            className="text-xs font-semibold text-[#E80071] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
