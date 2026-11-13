import { CheckCircle2, ChevronRight, LogOut, Package, User } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/catalog';

export function AccountPage() {
  const { user, orders, loginUser, logoutUser } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setError('');
    const resolvedName =
      mode === 'register'
        ? name.trim()
        : email.split('@')[0].replace(/[._]/g, ' ');
    loginUser({
      name: resolvedName,
      email: email.trim(),
      phone: phone.trim() || '98765 43210',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">My Account</span>
      </nav>

      {user ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#E80071] text-white flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="font-display text-lg font-bold text-[#282828] capitalize">
                    {user.name}
                  </h1>
                  <p className="text-xs text-[#777777]">{user.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] space-y-1.5 text-xs text-[#555555]">
                <p className="flex items-center gap-1.5 font-semibold text-[#282828]">
                  <CheckCircle2 className="w-4 h-4 text-[#E80071]" aria-hidden="true" />
                  Maan Prive Festival Member
                </p>
                <p>Mobile: {user.phone}</p>
              </div>

              <button
                type="button"
                onClick={logoutUser}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider border border-[#EEEEEE] bg-white hover:border-[#E80071] text-[#282828] hover:text-[#E80071] rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-display text-xl font-bold text-[#282828] mb-4">
              Order History ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <div className="bg-white border border-[#EEEEEE] rounded-2xl p-10 text-center">
                <Package className="w-10 h-10 text-[#E80071]/50 mx-auto mb-3" aria-hidden="true" />
                <p className="font-display text-lg font-bold text-[#282828] mb-1">
                  No orders placed yet
                </p>
                <p className="text-sm text-[#777777] mb-5">
                  Once you place an order on Maan, your shipment status and receipt will appear here.
                </p>
                <Link
                  to="/category/All"
                  className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#E80071] text-white rounded-lg"
                >
                  Shop Bestsellers
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderNumber}
                    className="bg-white border border-[#EEEEEE] rounded-xl p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#EEEEEE]">
                      <div>
                        <p className="font-display text-sm font-bold text-[#282828]">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-xs text-[#777777]">
                          {order.date} · PIN {order.pinCode} · {order.paymentMethod}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-[#E80071] tabular-nums">
                        {formatINR(order.totalPaid)}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#555555]">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.brand} — {item.name} ({item.variantLabel}) × {item.quantity}
                          </span>
                          <span className="font-semibold text-[#282828] tabular-nums">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white border border-[#EEEEEE] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#FFF5F9] px-6 py-5 border-b border-[#EEEEEE] text-center">
            <img
              src="/assets/aistudio/Maan_Beauty_Profile_Logo_22d3b0be.webp"
              alt="Maan — Beauty · Care · You"
              referrerPolicy="no-referrer"
              className="h-11 w-auto object-contain mix-blend-multiply mx-auto mb-2"
            />
            <h1 className="font-display text-lg font-bold text-[#282828]">
              {mode === 'login' ? 'Sign In to Maan' : 'Create Your Maan Account'}
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#F5F5F6] rounded-lg mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={`py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  mode === 'login' ? 'bg-white text-[#E80071] shadow-xs' : 'text-[#777777]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={`py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-[#E80071] shadow-xs'
                    : 'text-[#777777]'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <>
                  <div>
                    <label htmlFor="acc-name" className="block text-xs font-medium text-[#282828] mb-1">
                      Full Name
                    </label>
                    <input
                      id="acc-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ananya Sharma"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                    />
                  </div>
                  <div>
                    <label htmlFor="acc-phone" className="block text-xs font-medium text-[#282828] mb-1">
                      Mobile Number
                    </label>
                    <input
                      id="acc-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="acc-email" className="block text-xs font-medium text-[#282828] mb-1">
                  Email Address
                </label>
                <input
                  id="acc-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                />
              </div>

              <div>
                <label htmlFor="acc-pass" className="block text-xs font-medium text-[#282828] mb-1">
                  Password
                </label>
                <input
                  id="acc-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
                />
              </div>

              {error && <p className="text-xs text-[#E80071] font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg transition-colors cursor-pointer"
              >
                {mode === 'login' ? 'Sign In' : 'Register & Join Maan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
