import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../data/catalog';
import { ProductImage } from './ProductImage';

export function HeroCarousel() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const getSlideRoute = (slug: string) =>
    slug === 'Sale' ? '/offers' : `/category/${encodeURIComponent(slug)}`;

  return (
    <section
      aria-label="Featured beauty campaigns"
      className="w-full bg-[#FFF5F9]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.id}
              onClick={() => navigate(getSlideRoute(slide.targetCategory))}
              className="w-full shrink-0 relative h-[360px] sm:h-[420px] lg:h-[480px] cursor-pointer"
            >
              <ProductImage
                src={slide.image}
                alt={`${slide.campaign} — ${slide.headline}`}
                title={slide.headline}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D14]/80 via-[#1A0D14]/45 to-transparent flex items-center">
                <div className="px-6 sm:px-12 lg:px-16 max-w-xl text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E80071] text-white text-[11px] font-bold tracking-wider uppercase mb-3">
                    <span>{slide.campaign}</span>
                    <span>·</span>
                    <span>{slide.offer}</span>
                  </div>

                  <h1
                    className="font-display font-bold text-white leading-[1.12] tracking-tight mb-3"
                    style={{
                      fontSize: 'clamp(1.85rem, 3.8vw, 3.25rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {slide.headline}
                  </h1>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-6 max-w-md">
                    {slide.subheading}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(getSlideRoute(slide.targetCategory));
                    }}
                    className="px-7 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#E80071] hover:bg-[#C90061] text-white rounded-lg transition-colors shadow-md cursor-pointer"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous banner"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#282828] items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next banner"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#282828] items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to banner ${idx + 1}: ${slide.campaign}`}
              aria-current={activeIndex === idx ? 'true' : 'false'}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-7 bg-[#E80071]'
                  : 'w-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
