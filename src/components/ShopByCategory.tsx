import { Link } from 'react-router-dom';
import { SHOP_BY_CATEGORIES } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function ShopByCategory() {
  return (
    <section
      id="shop-by-category"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
          SHOP BY CATEGORY
        </h2>
        <Link
          to="/category/All"
          className="text-xs font-semibold text-[#E80071] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex lg:grid lg:grid-cols-10 gap-5 overflow-x-auto no-scrollbar pb-2">
        {SHOP_BY_CATEGORIES.map((item) => (
          <Link
            key={item.label}
            to={`/category/${encodeURIComponent(item.slug)}`}
            className="group flex flex-col items-center shrink-0 w-24 sm:w-28 lg:w-auto text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#FFF5F9] group-hover:border-[#E80071] shadow-xs transition-all duration-200 mb-2.5 bg-[#FFF5F9]">
              <ProductImage
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-[#282828] group-hover:text-[#E80071] transition-colors leading-snug">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
