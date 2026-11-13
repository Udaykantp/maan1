import { ChevronRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import {
  PRODUCTS,
  SECONDARY_NAV_CATEGORIES,
  TOP_BRANDS,
} from '../data/catalog';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export function CategoryPage() {
  const { slug = 'All' } = useParams<{ slug: string }>();
  const decodedSlug = decodeURIComponent(slug);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') ?? '';
  const filterNewOnly = searchParams.get('filter') === 'new';

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [localSearch, setLocalSearch] = useState(initialQuery);

  const filteredProducts = useMemo(() => {
    const q = (searchParams.get('q') ?? localSearch).trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      if (filterNewOnly && !product.isNew) return false;

      if (decodedSlug === 'Sale') {
        const v = product.variants[0];
        if (v.mrp <= v.price) return false;
      } else if (decodedSlug !== 'All') {
        const matchesCat =
          product.category.toLowerCase() === decodedSlug.toLowerCase() ||
          product.tags.some((t) => t.toLowerCase() === decodedSlug.toLowerCase());
        if (!matchesCat) return false;
      }

      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }

      if (q) {
        const haystack = [
          product.name,
          product.brand,
          product.subtitle,
          product.category,
          ...product.tags,
          ...product.keyIngredients,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [decodedSlug, filterNewOnly, selectedBrand, sortBy, searchParams, localSearch]);

  const pageTitle = filterNewOnly
    ? "What's New — Just Dropped"
    : decodedSlug === 'All'
      ? 'All Beauty Products'
      : decodedSlug === 'Sale'
        ? 'Beauty Festival Sale'
        : `${decodedSlug} Collection`;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">{pageTitle}</span>
      </nav>

      <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#E80071] mb-1">
            MAAN STOREFRONT
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828]">
            {pageTitle}
          </h1>
          <p className="text-sm text-[#777777] mt-1 tabular-nums">
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchParams.get('q') ? ` matching “${searchParams.get('q')}”` : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search
              className="w-4 h-4 text-[#777777] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (e.target.value.trim()) {
                  setSearchParams({ q: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
              placeholder="Filter within category..."
              aria-label="Filter within category"
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#EEEEEE] rounded-lg focus:outline-none focus:border-[#E80071]"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  setSearchParams({});
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777777] hover:text-[#282828]"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            aria-label="Filter by brand"
            className="px-3 py-2 text-xs font-semibold bg-white border border-[#EEEEEE] rounded-lg text-[#282828] focus:outline-none focus:border-[#E80071]"
          >
            <option value="All">Brand: All</option>
            {TOP_BRANDS.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort products"
            className="px-3 py-2 text-xs font-semibold bg-white border border-[#EEEEEE] rounded-lg text-[#282828] focus:outline-none focus:border-[#E80071]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-7 border-b border-[#EEEEEE]">
        <button
          type="button"
          onClick={() => navigate('/category/All')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
            decodedSlug === 'All' && !filterNewOnly
              ? 'bg-[#282828] text-white'
              : 'bg-[#F5F5F6] text-[#555555] hover:text-[#E80071]'
          }`}
        >
          All
        </button>
        {SECONDARY_NAV_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
              decodedSlug.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#E80071] text-white'
                : 'bg-[#F5F5F6] text-[#555555] hover:text-[#E80071]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-12 text-center">
          <h2 className="font-display text-xl font-bold text-[#282828] mb-2">
            No products found in this filter
          </h2>
          <p className="text-sm text-[#777777] mb-6">
            Try clearing your brand or search filters to view all curated Maan items.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand('All');
              setLocalSearch('');
              setSearchParams({});
              navigate('/category/All');
            }}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg cursor-pointer"
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badgeMode={filterNewOnly ? 'new' : 'discount'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
