import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EDITORIAL_ARTICLES } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function BeautyEditSection() {
  return (
    <section
      id="beauty-edit"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#282828]">
            THE BEAUTY EDIT
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-0.5">
            Expert routines, ingredient breakdowns, and seasonal lookbooks
          </p>
        </div>
        <Link
          to="/beauty-edit"
          className="text-xs font-semibold text-[#E80071] hover:underline whitespace-nowrap"
        >
          All Guides
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {EDITORIAL_ARTICLES.map((article) => (
          <Link
            key={article.id}
            to={`/beauty-edit/${encodeURIComponent(article.id)}`}
            className="group bg-white border border-[#EEEEEE] rounded-xl overflow-hidden text-left shadow-xs hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5F9]">
              <ProductImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                  {article.category} · {article.readTime}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-display text-sm font-bold text-[#282828] mb-1.5 group-hover:text-[#E80071] transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed mb-3 flex-1">
                {article.summary}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E80071]">
                Read Guide
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
