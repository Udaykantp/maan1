import { Heart, Minus, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatINR, getDiscountPercent, type Product } from '../data/catalog';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  badgeMode?: 'discount' | 'new';
  className?: string;
}

export function ProductCard({
  product,
  badgeMode = 'discount',
  className = '',
}: ProductCardProps) {
  const {
    wishlistIds,
    toggleWishlist,
    getBagQuantity,
    addToBag,
    updateBagQty,
  } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0].id,
  );
  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];
  const discount = getDiscountPercent(activeVariant.price, activeVariant.mrp);
  const isWishlisted = wishlistIds.includes(product.id);
  const bagQty = getBagQuantity(product.id, activeVariant.id);
  const productUrl = `/product/${product.id}?variant=${encodeURIComponent(activeVariant.id)}`;

  return (
    <article
      className={`group bg-white border border-[#EEEEEE] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col ${className}`}
    >
      <div className="relative aspect-[4/3] bg-[#FFF5F9] overflow-hidden">
        <Link
          to={productUrl}
          aria-label={`View ${product.name}`}
          className="block w-full h-full"
        >
          <ProductImage
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            title={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {badgeMode === 'new' && product.isNew ? (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#282828] text-white text-[10px] font-bold tracking-wider uppercase">
            NEW
          </span>
        ) : discount > 0 ? (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#E80071] text-white text-[10px] font-bold tracking-wider uppercase tabular-nums">
            {discount}% OFF
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 border border-[#EEEEEE] flex items-center justify-center hover:border-[#E80071] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#E80071] text-[#E80071]' : 'text-[#777777]'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/brand/${encodeURIComponent(product.brand)}`}
          className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] hover:text-[#E80071] mb-1 truncate"
        >
          {product.brand}
        </Link>

        <Link to={productUrl} className="text-left">
          <h3 className="text-sm font-semibold text-[#282828] leading-snug line-clamp-2 min-h-[40px] group-hover:text-[#E80071] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-[#777777] mt-2 mb-3">
          <span className="inline-flex items-center gap-1 font-semibold text-[#282828] tabular-nums">
            <Star
              className="w-3.5 h-3.5 fill-[#282828] text-[#282828]"
              aria-hidden="true"
            />
            {product.rating.toFixed(1)}
          </span>
          <span>({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>

        {product.variants.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {product.variants.map((variant) => {
              const selected = variant.id === activeVariant.id;
              if (variant.swatchHex) {
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    title={variant.label}
                    aria-label={`Select shade ${variant.label}`}
                    className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                      selected
                        ? 'ring-2 ring-[#E80071] ring-offset-1 scale-105 border-white'
                        : 'border-[#DDDDDD] hover:scale-105'
                    }`}
                    style={{ backgroundColor: variant.swatchHex }}
                  />
                );
              }
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded border transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#282828] text-white border-[#282828]'
                      : 'bg-white text-[#777777] border-[#EEEEEE] hover:border-[#282828]'
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-[#EEEEEE] space-y-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-bold text-[#282828]">
              {formatINR(activeVariant.price)}
            </span>
            {discount > 0 && (
              <>
                <span className="text-xs text-[#777777] line-through">
                  {formatINR(activeVariant.mrp)}
                </span>
                <span className="text-xs font-bold text-[#E80071]">
                  {discount}% Off
                </span>
              </>
            )}
          </div>

          {bagQty > 0 ? (
            <div className="flex items-center justify-between border border-[#E80071] rounded-lg bg-[#FFF5F9] h-9 px-2">
              <button
                type="button"
                onClick={() => updateBagQty(product.id, activeVariant.id, -1)}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-7 h-7 flex items-center justify-center text-[#E80071] hover:bg-[#E80071]/10 rounded cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <span className="text-xs font-bold text-[#282828] tabular-nums">
                {bagQty} in Bag
              </span>
              <button
                type="button"
                onClick={() => updateBagQty(product.id, activeVariant.id, 1)}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-7 h-7 flex items-center justify-center text-[#E80071] hover:bg-[#E80071]/10 rounded cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToBag(product, activeVariant.id, 1)}
              className="w-full h-9 text-xs font-bold uppercase tracking-wide text-white bg-[#E80071] hover:bg-[#C90061] rounded-lg transition-colors cursor-pointer"
            >
              Add to Bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
