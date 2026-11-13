import { ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export function WishlistPage() {
  const { wishlistIds } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">My Wishlist</span>
      </nav>

      <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-6 sm:p-8 mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828]">
          My Wishlist ({savedProducts.length})
        </h1>
        <p className="text-sm text-[#777777] mt-1">
          Your saved beauty essentials ready to move into your shopping bag.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-12 text-center">
          <Heart className="w-10 h-10 text-[#E80071]/50 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold text-[#282828] mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-[#777777] max-w-md mx-auto mb-6">
            Tap the heart icon on any lipstick, serum, or perfume across Maan to save it here for later.
          </p>
          <Link
            to="/category/All"
            className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg"
          >
            Explore Bestsellers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
