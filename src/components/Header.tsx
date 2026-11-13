import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  MEGA_MENUS,
  PRODUCTS,
  SECONDARY_NAV_CATEGORIES,
  TOP_BRANDS,
  type CategorySlug,
} from '../data/catalog';
import { ProductImage } from './ProductImage';

export function Header() {
  const navigate = useNavigate();
  const { totalBagCount, wishlistIds, user, setIsBagOpen } = useStore();

  const [showPromoStrip, setShowPromoStrip] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(8 * 3600 + 42 * 60 + 19);
  const [hoveredCategory, setHoveredCategory] = useState<Exclude<
    CategorySlug,
    'All'
  > | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenuTimer = useRef<number | null>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 8 * 3600));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}h : ${m}m : ${s}s`;
  };

  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return {
        products: PRODUCTS.slice(0, 4),
        brands: TOP_BRANDS.slice(0, 4).map((b) => b.name),
      };
    }
    return {
      products: PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      ).slice(0, 5),
      brands: TOP_BRANDS.filter((b) => b.name.toLowerCase().includes(q)).map(
        (b) => b.name,
      ),
    };
  }, [searchQuery]);

  const openMegaMenu = (cat: Exclude<CategorySlug, 'All'>) => {
    if (closeMenuTimer.current) window.clearTimeout(closeMenuTimer.current);
    setHoveredCategory(cat);
  };

  const scheduleCloseMegaMenu = () => {
    closeMenuTimer.current = window.setTimeout(() => {
      setHoveredCategory(null);
    }, 140);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setIsSearchFocused(false);
    if (q) {
      navigate(`/category/All?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/category/All');
    }
  };

  const activeMegaMenu = hoveredCategory ? MEGA_MENUS[hoveredCategory] : null;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EEEEEE]">
      {/* Top Promotional Strip */}
      {showPromoStrip && (
        <div className="bg-[#E80071] text-white text-xs py-2 px-4 relative flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4 pr-7 text-center truncate">
            <span className="font-semibold tracking-wide">
              BEAUTY FESTIVAL – UP TO 50% OFF
            </span>
            <span className="hidden sm:inline text-white/75">|</span>
            <span className="hidden sm:inline font-medium tabular-nums">
              Ends in {formatTimer(secondsLeft)}
            </span>
            <Link
              to="/offers"
              className="hidden md:inline underline font-semibold hover:text-white/90"
            >
              Shop Offers
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowPromoStrip(false)}
            aria-label="Close promotional announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/85 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Main Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden p-2 -ml-2 text-[#282828] hover:text-[#E80071] cursor-pointer"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <Link
            to="/"
            aria-label="Maan Beauty Home"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded"
          >
            <img
              src="/assets/aistudio/Maan_Beauty_Profile_Logo_22d3b0be.webp"
              alt="Maan — Beauty · Care · You"
              referrerPolicy="no-referrer"
              className="h-11 sm:h-12 w-auto object-contain mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Center Primary Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-[#282828] shrink-0"
        >
          <Link
            to="/category/All"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            Categories
          </Link>
          <Link
            to="/brands"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            Brands
          </Link>
          <Link
            to="/luxe"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            Luxe
          </Link>
          <Link
            to="/beauty-edit"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            Beauty Advice
          </Link>
          <Link
            to="/category/All?filter=new"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            What&apos;s New
          </Link>
          <Link
            to="/offers"
            className="hover:text-[#E80071] transition-colors whitespace-nowrap"
          >
            Offers
          </Link>
        </nav>

        {/* Right: Search Bar + Account + Wishlist + Bag */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 xl:flex-initial justify-end">
          <div
            ref={searchWrapperRef}
            className="relative hidden md:block w-full max-w-xs lg:max-w-sm xl:w-80"
          >
            <form onSubmit={handleSearchSubmit}>
              <Search
                className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder="Search for Products, Brands & More"
                aria-label="Search for Products, Brands and More"
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#F5F5F6] border border-[#EEEEEE] rounded-lg text-[#282828] placeholder:text-[#777777] focus:bg-white focus:outline-none focus:border-[#E80071]"
              />
            </form>

            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#EEEEEE] rounded-xl shadow-xl p-4 z-50">
                {searchSuggestions.brands.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] mb-2">
                      Popular Brands
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {searchSuggestions.brands.map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => {
                            setIsSearchFocused(false);
                            navigate(`/brand/${encodeURIComponent(brand)}`);
                          }}
                          className="px-2.5 py-1 text-xs font-medium bg-[#FFF5F9] text-[#E80071] rounded-md hover:bg-[#E80071] hover:text-white transition-colors cursor-pointer"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] mb-2">
                    {searchQuery ? 'Matching Products' : 'Trending Searches'}
                  </p>
                  {searchSuggestions.products.length === 0 ? (
                    <p className="text-xs text-[#777777] py-2">
                      No products matched &ldquo;{searchQuery}&rdquo;
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {searchSuggestions.products.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSearchFocused(false);
                              navigate(`/product/${item.id}`);
                            }}
                            className="w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#FFF5F9] text-left transition-colors cursor-pointer"
                          >
                            <div className="w-9 h-9 rounded overflow-hidden bg-[#F5F5F6] shrink-0">
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-[#282828] truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-[#777777]">
                                {item.brand} · ₹{item.variants[0].price}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/account"
            aria-label={user ? `Account: ${user.name}` : 'Sign in or Register'}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-[#282828] hover:text-[#E80071] transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline">
              {user ? user.name.split(' ')[0] : 'Sign In'}
            </span>
          </Link>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlistIds.length} saved)`}
            className="relative p-2 text-[#282828] hover:text-[#E80071] transition-colors shrink-0"
          >
            <Heart className="w-5 h-5" aria-hidden="true" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E80071] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            aria-label={`Shopping Bag (${totalBagCount} items)`}
            className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#FFF5F9] text-[#E80071] hover:bg-[#E80071] hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-bold">({totalBagCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search
            className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Products, Brands & More"
            aria-label="Search for Products, Brands and More"
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#F5F5F6] border border-[#EEEEEE] rounded-lg text-[#282828] placeholder:text-[#777777] focus:bg-white focus:outline-none focus:border-[#E80071]"
          />
        </div>
      </form>

      {/* Secondary Category Navigation + Hover Mega Menu */}
      <div
        className="hidden lg:block border-t border-[#EEEEEE] bg-white relative"
        onMouseLeave={scheduleCloseMegaMenu}
      >
        <nav
          aria-label="Beauty categories"
          className="max-w-[1440px] mx-auto px-6 lg:px-8 h-11 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar"
        >
          {SECONDARY_NAV_CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              onMouseEnter={() => openMegaMenu(category)}
              onFocus={() => openMegaMenu(category)}
              onClick={() => setHoveredCategory(null)}
              className={`inline-flex items-center gap-1 text-xs font-medium whitespace-nowrap shrink-0 py-2.5 border-b-2 transition-colors ${
                hoveredCategory === category
                  ? 'border-[#E80071] text-[#E80071]'
                  : category === 'Sale'
                    ? 'border-transparent text-[#E80071] font-semibold'
                    : 'border-transparent text-[#555555] hover:text-[#E80071]'
              }`}
            >
              <span>{category}</span>
              <ChevronDown className="w-3 h-3 opacity-60" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        {/* Mega Menu Dropdown */}
        {activeMegaMenu && (
          <div
            onMouseEnter={() => openMegaMenu(activeMegaMenu.slug)}
            className="absolute left-0 right-0 top-full bg-white border-t border-b border-[#EEEEEE] shadow-xl z-40"
          >
            <div className="max-w-[1440px] mx-auto px-8 py-7 grid grid-cols-12 gap-8">
              <div className="col-span-6 grid grid-cols-3 gap-6">
                {activeMegaMenu.columns.map((col) => (
                  <div key={col.heading}>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#282828] mb-3">
                      {col.heading}
                    </h4>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/category/${encodeURIComponent(activeMegaMenu.slug)}`}
                            onClick={() => setHoveredCategory(null)}
                            className="text-xs text-[#555555] hover:text-[#E80071] transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="col-span-3 border-l border-[#EEEEEE] pl-6 space-y-5">
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#282828] mb-2.5">
                    Popular Brands
                  </h4>
                  <ul className="space-y-1.5">
                    {activeMegaMenu.popularBrands.map((brand) => (
                      <li key={brand}>
                        <Link
                          to={`/brand/${encodeURIComponent(brand)}`}
                          onClick={() => setHoveredCategory(null)}
                          className="text-xs font-medium text-[#555555] hover:text-[#E80071]"
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#282828] mb-2.5">
                    Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeMegaMenu.trendingSearches.map((term) => (
                      <Link
                        key={term}
                        to={`/category/All?q=${encodeURIComponent(term.split(' ')[0])}`}
                        onClick={() => setHoveredCategory(null)}
                        className="px-2.5 py-1 text-[11px] bg-[#FFF5F9] text-[#E80071] font-medium rounded-md hover:bg-[#E80071] hover:text-white transition-colors"
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <Link
                  to={`/category/${encodeURIComponent(activeMegaMenu.slug)}`}
                  onClick={() => setHoveredCategory(null)}
                  className="group block w-full text-left bg-[#FFF5F9] border border-[#EEEEEE] rounded-xl overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <ProductImage
                      src={activeMegaMenu.promoImage}
                      alt={activeMegaMenu.promoTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-bold text-[#E80071] mb-0.5">
                      {activeMegaMenu.promoTitle}
                    </p>
                    <p className="text-[11px] text-[#555555]">
                      {activeMegaMenu.promoSubtitle}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden flex"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EEEEEE]">
              <img
                src="/assets/aistudio/Maan_Beauty_Profile_Logo_22d3b0be.webp"
                alt="Maan — Beauty · Care · You"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="p-1.5 text-[#282828]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="py-4 space-y-1 border-b border-[#EEEEEE]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] mb-2">
                Explore Store
              </p>
              {[
                { label: 'Home', to: '/' },
                { label: 'Best Offers For You', to: '/offers' },
                { label: 'Top Brands', to: '/brands' },
                { label: 'Discover Luxe Beauty', to: '/luxe' },
                { label: 'The Beauty Edit', to: '/beauty-edit' },
                { label: 'My Wishlist', to: '/wishlist' },
                { label: 'My Account', to: '/account' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left py-2 text-sm font-medium text-[#282828] hover:text-[#E80071]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="py-4 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] mb-2">
                All Categories
              </p>
              {SECONDARY_NAV_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/category/${encodeURIComponent(category)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left py-2 text-sm font-medium ${
                    category === 'Sale' ? 'text-[#E80071] font-semibold' : 'text-[#282828]'
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
