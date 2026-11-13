import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { EDITORIAL_ARTICLES, PRODUCTS } from '../data/catalog';

export function BeautyEditPage() {
  const { articleId } = useParams<{ articleId?: string }>();
  const activeArticle = articleId
    ? EDITORIAL_ARTICLES.find((a) => a.id === decodeURIComponent(articleId))
    : null;

  if (activeArticle) {
    const recommendedProducts = PRODUCTS.filter((p) =>
      activeArticle.recommendedProductIds.includes(p.id),
    );

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
          <Link to="/" className="hover:text-[#E80071]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link to="/beauty-edit" className="hover:text-[#E80071]">
            The Beauty Edit
          </Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="font-semibold text-[#282828] truncate">
            {activeArticle.title}
          </span>
        </nav>

        <article className="bg-white border border-[#EEEEEE] rounded-2xl overflow-hidden shadow-xs mb-10">
          <div className="aspect-[16/9] bg-[#FFF5F9]">
            <ProductImage
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#E80071] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                {activeArticle.category} · {activeArticle.readTime}
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828] mb-3">
                {activeArticle.title}
              </h1>
              <p className="text-base text-[#555555] leading-relaxed">
                {activeArticle.summary}
              </p>
            </div>

            <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-xl p-6 space-y-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#282828]">
                Step-by-Step Routine
              </h2>
              <ol className="space-y-3 text-sm text-[#282828]">
                {activeArticle.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-bold text-[#E80071] tabular-nums">
                      0{i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>

        <section>
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#282828] mb-5">
            SHOP PRODUCTS IN THIS GUIDE
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#777777] mb-5">
        <Link to="/" className="hover:text-[#E80071]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="font-semibold text-[#282828]">The Beauty Edit</span>
      </nav>

      <div className="bg-[#FFF5F9] border border-[#EEEEEE] rounded-2xl p-6 sm:p-10 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[#E80071] mb-1">
          MAAN BEAUTY ADVICE
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#282828]">
          The Beauty Edit — Guides &amp; Routines
        </h1>
        <p className="text-sm text-[#777777] mt-1">
          Dermatologist-backed routines, sunscreen guides, and festive makeup playbooks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDITORIAL_ARTICLES.map((article) => (
          <Link
            key={article.id}
            to={`/beauty-edit/${encodeURIComponent(article.id)}`}
            className="group bg-white border border-[#EEEEEE] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="aspect-[16/10] bg-[#FFF5F9] overflow-hidden">
              <ProductImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#E80071] mb-1.5">
                {article.category} · {article.readTime}
              </p>
              <h2 className="font-display text-lg font-bold text-[#282828] mb-2 group-hover:text-[#E80071] transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-[#777777] leading-relaxed mb-4 flex-1">
                {article.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E80071]">
                Read Full Guide
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
