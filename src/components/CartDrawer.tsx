import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  STANDARD_SHIPPING_FEE,
  formatINR,
} from '../data/catalog';
import { ProductImage } from './ProductImage';

export function CartDrawer() {
  const navigate = useNavigate();
  const {
    bagItems,
    totalBagCount,
    isBagOpen,
    setIsBagOpen,
    updateBagQty,
    removeFromBag,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (!isBagOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBagOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isBagOpen, setIsBagOpen]);

  if (!isBagOpen) return null;

  const subtotal = bagItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0,
  );
  const promoDetails = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const discountAmount = promoDetails
    ? Math.round(subtotal * promoDetails.discountRate)
    : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingFee =
    discountedSubtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;
  const grandTotal = discountedSubtotal + shippingFee;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal,
  );

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Try MAAN15, GLOW20 or WELCOME10.');
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try MAAN15, GLOW20 or WELCOME10.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={() => setIsBagOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col border-l border-[#EEEEEE] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#EEEEEE] bg-[#FFF5F9] flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#282828]">
              Shopping Bag ({totalBagCount})
            </h2>
            {bagItems.length > 0 && (
              <p className="text-xs text-[#777777] mt-0.5">
                {remainingForFreeShipping === 0
                  ? 'Free insured shipping unlocked'
                  : `Add ${formatINR(remainingForFreeShipping)} more for free shipping`}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsBagOpen(false)}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-full bg-white border border-[#EEEEEE] flex items-center justify-center text-[#282828] hover:border-[#E80071] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 bg-[#FAFAFA]">
          {bagItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag
                className="w-10 h-10 text-[#E80071]/50 mb-4"
                aria-hidden="true"
              />
              <p className="font-display text-lg font-bold text-[#282828] mb-1">
                Your Maan bag is empty
              </p>
              <p className="text-sm text-[#777777] max-w-xs mb-6">
                Explore Beauty Festival deals and add your favourite makeup, skincare, and haircare essentials.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsBagOpen(false);
                  navigate('/category/All');
                }}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E80071] hover:bg-[#C90061] rounded-lg transition-colors cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {bagItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex gap-3.5 p-3.5 bg-white border border-[#EEEEEE] rounded-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsBagOpen(false);
                      navigate(`/product/${item.product.id}`);
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-[#FFF5F9] shrink-0 cursor-pointer"
                  >
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      title={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
                          {item.product.brand}
                        </p>
                        <h3 className="text-sm font-semibold text-[#282828] truncate">
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeFromBag(item.product.id, item.variant.id)
                        }
                        aria-label={`Remove ${item.product.name}`}
                        className="p-1 text-[#777777] hover:text-[#E80071] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-[#777777] mt-0.5 truncate">
                      {item.variant.label}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#EEEEEE] rounded-md bg-[#FFF5F9]">
                        <button
                          type="button"
                          onClick={() =>
                            updateBagQty(item.product.id, item.variant.id, -1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#E80071] hover:bg-[#E80071]/10 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateBagQty(item.product.id, item.variant.id, 1)
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#E80071] hover:bg-[#E80071]/10 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#282828] tabular-nums">
                        {formatINR(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white border border-[#EEEEEE] rounded-xl p-4">
                <label
                  htmlFor="promo-input"
                  className="block text-xs font-bold uppercase tracking-wider text-[#282828] mb-2"
                >
                  Apply Coupon (Try MAAN15 or GLOW20)
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-input"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 text-sm bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 text-xs font-bold uppercase bg-[#282828] text-white hover:bg-[#E80071] rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-[#E80071] mt-1.5">{promoError}</p>
                )}
                {appliedPromo && promoDetails && (
                  <div className="flex items-center justify-between text-xs text-[#E80071] font-semibold mt-2">
                    <span>
                      {appliedPromo} applied ({promoDetails.label})
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {bagItems.length > 0 && (
          <div className="px-6 py-4 border-t border-[#EEEEEE] bg-white space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#777777]">
                <span>Bag Total</span>
                <span className="tabular-nums text-[#282828]">
                  {formatINR(subtotal)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E80071] font-semibold">
                  <span>Coupon ({appliedPromo})</span>
                  <span className="tabular-nums">-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#777777]">
                <span>Shipping</span>
                <span className="tabular-nums text-[#282828]">
                  {shippingFee === 0 ? 'Free' : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#282828] pt-2 border-t border-[#EEEEEE]">
                <span>Grand Total</span>
                <span className="tabular-nums">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsBagOpen(false);
                navigate(
                  appliedPromo
                    ? `/checkout?coupon=${encodeURIComponent(appliedPromo)}`
                    : '/checkout',
                );
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#E80071] hover:bg-[#C90061] rounded-lg transition-colors cursor-pointer"
            >
              Proceed to Checkout · {formatINR(grandTotal)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
