import { Grid, Heart, Home, ShoppingBag, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function MobileBottomNav() {
  const { totalBagCount, wishlistIds, setIsBagOpen } = useStore();

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EEEEEE] grid grid-cols-5 h-14 px-1"
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${
            isActive ? 'text-[#E80071]' : 'text-[#282828]'
          }`
        }
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/category/All"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${
            isActive ? 'text-[#E80071]' : 'text-[#282828]'
          }`
        }
      >
        <Grid className="w-4 h-4" aria-hidden="true" />
        <span>Categories</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${
            isActive ? 'text-[#E80071]' : 'text-[#282828]'
          }`
        }
      >
        <Heart className="w-4 h-4" aria-hidden="true" />
        <span>Wishlist</span>
        {wishlistIds.length > 0 && (
          <span className="absolute top-1.5 right-4 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#E80071] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
            {wishlistIds.length}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${
            isActive ? 'text-[#E80071]' : 'text-[#282828]'
          }`
        }
      >
        <User className="w-4 h-4" aria-hidden="true" />
        <span>Account</span>
      </NavLink>

      <button
        type="button"
        onClick={() => setIsBagOpen(true)}
        className="relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-[#E80071]"
      >
        <ShoppingBag className="w-4 h-4" aria-hidden="true" />
        <span>Bag</span>
        {totalBagCount > 0 && (
          <span className="absolute top-1.5 right-4 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#E80071] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
            {totalBagCount}
          </span>
        )}
      </button>
    </nav>
  );
}
