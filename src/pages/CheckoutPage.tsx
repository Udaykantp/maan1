import { CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { useStore, type OrderRecord } from '../context/StoreContext';
import {
  FREE_SHIPPING_THRESHOLD,
  PROMO_CODES,
  STANDARD_SHIPPING_FEE,
  formatINR,
} from '../data/catalog';

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const { bagItems, user, clearBag, addOrder } = useStore();

  const initialCoupon = searchParams.get('coupon')?.toUpperCase() ?? '';
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    PROMO_CODES[initialCoupon] ? initialCoupon : null,
  );
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const [fullName, setFullName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [pinCode, setPinCode] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'CARD'>('COD');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

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

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try MAAN15, GLOW20 or WELCOME10.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pinCode.trim()) {
      setFormError('Please complete all delivery fields.');
      return;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      setFormError('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    const order: OrderRecord = {
      orderNumber: `MN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customerName: fullName.trim(),
      pinCode: pinCode.trim(),
      address: address.trim(),
      paymentMethod,
      totalPaid: grandTotal,
      items: bagItems.map((entry) => ({
        name: entry.product.name,
        brand: entry.product.brand,
        variantLabel: entry.variant.label,
        quantity: entry.quantity,
        price: entry.variant.price,
      })),
    };

    addOrder(order);
    clearBag();
    setConfirmedOrder(order);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-[#E80071] shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#777777]">
                Order Confirmation
              </p>
              <h1 className="font-display text-2xl font-bold text-[#282828]">
                Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
              </h1>
            </div>
          </div>

          <div className="bg-[#FFF5F9] rounded-xl p-5 space-y-2 text-sm text-[#555555]">
            <div className="flex justify-between">
              <span>Recipient</span>
              <span className="font-semibold text-[#282828]">
                {confirmedOrder.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Address</span>
              <span className="font-semibold text-[#282828] text-right">
                {confirmedOrder.address} · {confirmedOrder.pinCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-semibold text-[#282828]">
                {confirmedOrder.paymentMethod === 'COD'
                  ? 'Cash on Delivery'
                  : confirmedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#EEEEEE] text-base font-bold text-[#282828]">
              <span>Total Amount</span>
              <span className="tabular-nums text-[#E80071]">
                {formatINR(confirmedOrder.totalPaid)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="flex-1 text-center py-3 px-6 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg"
            >
              Continue Shopping
            </Link>
            <Link
              to="/account"
              className="py-3 px-6 text-xs font-bold uppercase tracking-wider border border-[#EEEEEE] hover:border-[#E80071] text-[#282828] rounded-lg"
            >
              View in Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (bagItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-12 h-12 text-[#E80071]/50 mx-auto mb-3" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold text-[#282828] mb-2">
          Your shopping bag is empty
        </h1>
        <p className="text-sm text-[#777777] mb-6">
          Add beauty favourites to your bag before checking out.
        </p>
        <Link
          to="/category/All"
          className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#E80071] text-white rounded-lg"
        >
          Browse Maan Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">Checkout</span>
      </nav>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828] mb-8">
        Checkout &amp; Delivery
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          id="checkout-page-form"
          onSubmit={handleSubmit}
          className="lg:col-span-7 space-y-6"
        >
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-[#282828]">
              1. Delivery Details
            </h2>
            <div>
              <label htmlFor="co-name" className="block text-xs font-medium text-[#777777] mb-1">
                Full Name
              </label>
              <input
                id="co-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ananya Sharma"
                className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="co-phone" className="block text-xs font-medium text-[#777777] mb-1">
                  Mobile Number
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                />
              </div>
              <div>
                <label htmlFor="co-pin" className="block text-xs font-medium text-[#777777] mb-1">
                  PIN Code
                </label>
                <input
                  id="co-pin"
                  type="text"
                  required
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="400001"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071] tabular-nums"
                />
              </div>
            </div>

            <div>
              <label htmlFor="co-addr" className="block text-xs font-medium text-[#777777] mb-1">
                Street Address &amp; Landmark
              </label>
              <textarea
                id="co-addr"
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat 402, Lotus Residency, Bandra West, Mumbai"
                className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
              />
            </div>
          </div>

          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 space-y-3">
            <h2 className="font-display text-base font-bold text-[#282828]">
              2. Payment Method
            </h2>
            {(
              [
                { id: 'COD', label: 'Cash on Delivery (Pay at doorstep)' },
                { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)' },
                { id: 'CARD', label: 'Credit or Debit Card' },
              ] as const
            ).map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-3 rounded-xl border text-sm cursor-pointer ${
                  paymentMethod === option.id
                    ? 'border-[#E80071] bg-[#FFF5F9] font-semibold text-[#282828]'
                    : 'border-[#EEEEEE] text-[#555555]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={paymentMethod === option.id}
                  onChange={() => setPaymentMethod(option.id)}
                  className="accent-[#E80071]"
                />
                <span>{option.label}</span>
              </label>
            ))}

            {formError && (
              <p className="text-xs font-semibold text-[#E80071]">{formError}</p>
            )}
          </div>
        </form>

        <aside className="lg:col-span-5 bg-white border border-[#EEEEEE] rounded-2xl p-6 space-y-5 lg:sticky lg:top-32">
          <h2 className="font-display text-base font-bold text-[#282828]">
            Order Summary ({bagItems.length} items)
          </h2>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {bagItems.map((item) => (
              <div
                key={`${item.product.id}-${item.variant.id}`}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FFF5F9] shrink-0">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#282828] truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-[#777777]">
                    {item.variant.label} × {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#282828] tabular-nums">
                  {formatINR(item.variant.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EEEEEE]">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Coupon code (MAAN15)"
                className="flex-1 px-3 py-2 text-xs border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 text-xs font-bold uppercase bg-[#282828] text-white hover:bg-[#E80071] rounded-lg cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-xs text-[#E80071] mt-1">{promoError}</p>}
            {appliedPromo && promoDetails && (
              <p className="text-xs text-[#E80071] font-semibold mt-1.5">
                {appliedPromo} active ({promoDetails.label})
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm border-t border-[#EEEEEE] pt-4">
            <div className="flex justify-between text-[#777777]">
              <span>Subtotal</span>
              <span className="tabular-nums text-[#282828]">{formatINR(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#E80071] font-semibold">
                <span>Coupon Discount</span>
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
              <span>Total Payable</span>
              <span className="tabular-nums">{formatINR(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-page-form"
            className="w-full py-3.5 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg transition-colors cursor-pointer"
          >
            Place Order · {formatINR(grandTotal)}
          </button>
        </aside>
      </div>
    </div>
  );
}
