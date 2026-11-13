import { useMemo } from 'react';
import { BeautyEditSection } from '../components/BeautyEditSection';
import { HeroCarousel } from '../components/HeroCarousel';
import { LuxeSection } from '../components/LuxeSection';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { ShopByCategory } from '../components/ShopByCategory';
import { TopBrandsSection } from '../components/TopBrandsSection';
import { TopOffersSection } from '../components/TopOffersSection';
import { TrendingNowSection } from '../components/TrendingNowSection';
import { TrustAndNewsletterSection } from '../components/TrustAndNewsletterSection';
import { PRODUCTS } from '../data/catalog';

export function HomePage() {
  const bestsellers = useMemo(
    () => PRODUCTS.filter((p) => p.isBestseller),
    [],
  );
  const newArrivals = useMemo(() => PRODUCTS.filter((p) => p.isNew), []);

  return (
    <>
      <HeroCarousel />
      <ShopByCategory />
      <TopOffersSection />
      <TrendingNowSection />
      <ProductCarouselSection
        id="bestsellers"
        title="BESTSELLERS"
        subtitle="Customer-loved beauty icons with verified reviews"
        products={bestsellers}
        badgeMode="discount"
        viewAllTo="/category/All"
      />
      <TopBrandsSection />
      <LuxeSection />
      <ProductCarouselSection
        id="just-dropped"
        title="JUST DROPPED"
        subtitle="Fresh launches across skincare, fragrance, and colour"
        products={newArrivals}
        badgeMode="new"
        viewAllTo="/category/All?filter=new"
      />
      <BeautyEditSection />
      <TrustAndNewsletterSection />
    </>
  );
}
