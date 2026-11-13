import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function Footer() {
  const { setIsBagOpen } = useStore();

  return (
    <footer className="bg-[#282828] text-white pb-20 md:pb-0">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
          <div>
            <Link to="/" className="inline-block bg-white rounded-lg px-3 py-1.5 mb-3">
              <img
                src="/assets/aistudio/Maan_Beauty_Profile_Logo_22d3b0be.webp"
                alt="Maan — Beauty · Care · You"
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              About
            </p>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/" className="hover:text-[#F48FB1]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/beauty-edit" className="hover:text-[#F48FB1]">
                  Our Story &amp; Beauty Edit
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-[#F48FB1]">
                  Partner Brands
                </Link>
              </li>
              <li>
                <span className="text-white/70">Contact: care@maanbeauty.in</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Customer Support
            </p>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/account" className="hover:text-[#F48FB1]">
                  My Account &amp; Orders
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsBagOpen(true)}
                  className="hover:text-[#F48FB1] cursor-pointer"
                >
                  Shopping Bag &amp; Checkout
                </button>
              </li>
              <li>
                <span className="text-white/75">Free Shipping ₹499+</span>
              </li>
              <li>
                <span className="text-white/75">15-Day Easy Returns</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Categories
            </p>
            <ul className="space-y-2 text-xs text-white/80">
              {(['Makeup', 'Skin', 'Hair', 'Fragrance', 'Bath & Body'] as const).map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      to={`/category/${encodeURIComponent(cat)}`}
                      className="hover:text-[#F48FB1]"
                    >
                      {cat === 'Skin' ? 'Skincare' : cat === 'Hair' ? 'Haircare' : cat}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Popular Destinations
            </p>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link to="/brands" className="hover:text-[#F48FB1]">
                  Brand Directory
                </Link>
              </li>
              <li>
                <Link to="/category/All?filter=new" className="hover:text-[#F48FB1]">
                  New Launches
                </Link>
              </li>
              <li>
                <Link to="/luxe" className="hover:text-[#F48FB1]">
                  Maan Luxe
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#F48FB1]">
                  Beauty Festival Offers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Social Media
            </p>
            <ul className="space-y-2 text-xs text-white/80">
              <li>Instagram · @maanbeauty</li>
              <li>Facebook · Maan Beauty India</li>
              <li>YouTube · Maan Beauty Edit</li>
              <li>Pinterest · Maan Lookbooks</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-semibold text-white/85 mr-1">We Accept:</span>
            {['UPI', 'VISA', 'Mastercard', 'RuPay', 'NetBanking', 'Cash on Delivery'].map(
              (method) => (
                <span
                  key={method}
                  className="px-2 py-0.5 rounded border border-white/20 text-[11px] text-white/85"
                >
                  {method}
                </span>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>Terms &amp; Conditions</span>
            <span>Privacy Policy</span>
            <span>© {new Date().getFullYear()} Maan E-Retail Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
