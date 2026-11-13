import { CheckCircle2, Lock, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: '100% Authentic Products',
    description: 'Directly sourced from authorized brand partners and ateliers.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 15-day doorstep pickup on unopened beauty items.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: '256-bit encrypted UPI, cards, netbanking & Cash on Delivery.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: '48-hour express dispatch across 19,000+ Indian PIN codes.',
  },
];

export function TrustAndNewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <>
      {/* 4-Column Customer Trust Strip */}
      <section className="border-t border-[#EEEEEE] bg-white py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FFF5F9] text-[#E80071] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#282828]">{item.title}</h3>
                  <p className="text-xs text-[#777777] leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#FFF5F9] border-t border-[#EEEEEE] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#282828] mb-2">
            LET&apos;S STAY BEAUTIFUL
          </h2>
          <p className="text-sm text-[#777777] mb-6">
            Get the latest beauty trends, exclusive offers and new launches delivered to your inbox.
          </p>

          {subscribedEmail ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#EEEEEE] text-sm font-semibold text-[#282828]">
              <CheckCircle2 className="w-4 h-4 text-[#E80071]" aria-hidden="true" />
              <span>
                Subscribed {subscribedEmail} — check your inbox for code{' '}
                <strong className="text-[#E80071]">MAAN15</strong>
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address for Maan newsletter"
                className="flex-1 px-4 py-3 text-sm bg-white border border-[#EEEEEE] rounded-lg text-[#282828] placeholder:text-[#777777] focus:outline-none focus:border-[#E80071]"
              />
              <button
                type="submit"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}

          {error && <p className="text-xs text-[#E80071] mt-2">{error}</p>}
        </div>
      </section>
    </>
  );
}
