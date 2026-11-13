import { Check } from 'lucide-react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ScrollToTop } from './components/ScrollToTop';
import { StoreProvider, useStore } from './context/StoreContext';
import { AccountPage } from './pages/AccountPage';
import { BeautyEditPage } from './pages/BeautyEditPage';
import { BrandsPage } from './pages/BrandsPage';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { LuxePage } from './pages/LuxePage';
import { OffersPage } from './pages/OffersPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';

function AppShell() {
  const navigate = useNavigate();
  const { toastMessage, clearToast, setIsBagOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#282828]">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand/:brandSlug" element={<BrandsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/luxe" element={<LuxePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/beauty-edit" element={<BeautyEditPage />} />
          <Route path="/beauty-edit/:articleId" element={<BeautyEditPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
      <CartDrawer />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-18 md:bottom-5 right-4 sm:right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#282828] text-white text-xs sm:text-sm rounded-xl shadow-lg border border-white/10"
        >
          <Check className="w-4 h-4 text-[#E80071] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              clearToast();
              setIsBagOpen(true);
            }}
            className="text-xs font-bold text-[#F48FB1] hover:underline ml-1 whitespace-nowrap cursor-pointer"
          >
            View Bag
          </button>
          <button
            type="button"
            onClick={() => {
              clearToast();
              navigate('/checkout');
            }}
            className="text-xs font-bold text-white/80 hover:underline whitespace-nowrap cursor-pointer"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </BrowserRouter>
  );
}
