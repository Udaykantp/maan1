import heroFestivalImg from '../assets/images/maan_festival_hero_clean_1794564347572.jpg';
import heroSkincareImg from '../assets/images/maan_hero_campaign_1794563917720.jpg';
import heroMakeupImg from '../assets/images/maan_hero_makeup_glam_1794564331031.jpg';
import luxeDarkImg from '../assets/images/maan_luxe_dark_banner_1794564332197.jpg';
import lipVelvetImg from '../assets/images/maan_lip_velvet_1794563916447.jpg';
import vitaminSerumImg from '../assets/images/maan_vitamin_serum_1794563917678.jpg';
import oudPerfumeImg from '../assets/images/maan_oud_perfume_1794563918582.jpg';
import ceramideCreamImg from '../assets/images/maan_ceramide_cream_1794563917893.jpg';
import hairElixirImg from '../assets/images/maan_hair_elixir_1794563918309.jpg';
import sunscreenImg from '../assets/images/maan_sunscreen_spf_1794564331999.jpg';
import koreanGlowImg from '../assets/images/maan_korean_glow_edit_1794564332348.jpg';

export type CategorySlug =
  | 'All'
  | 'Makeup'
  | 'Skin'
  | 'Hair'
  | 'Bath & Body'
  | 'Fragrance'
  | 'Appliances'
  | 'Personal Care'
  | 'Natural'
  | 'Mom & Baby'
  | 'Wellness'
  | 'Men'
  | 'Sale';

export interface ProductVariant {
  id: string;
  label: string;
  swatchHex?: string;
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedVariant: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  category: Exclude<CategorySlug, 'All' | 'Sale'>;
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  isLuxe?: boolean;
  image: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  description: string;
  keyIngredients: string[];
  howToUse: string;
  reviews: ProductReview[];
}

export interface HeroSlide {
  id: string;
  campaign: string;
  headline: string;
  subheading: string;
  offer: string;
  cta: string;
  targetCategory: CategorySlug;
  image: string;
  align: 'left' | 'right';
}

export interface MegaMenuConfig {
  slug: Exclude<CategorySlug, 'All'>;
  columns: {
    heading: string;
    items: string[];
  }[];
  popularBrands: string[];
  trendingSearches: string[];
  promoTitle: string;
  promoSubtitle: string;
  promoImage: string;
}

export interface CategoryTile {
  label: string;
  slug: CategorySlug;
  image: string;
}

export interface OfferCard {
  id: string;
  headline: string;
  badge: string;
  description: string;
  cta: string;
  targetCategory: CategorySlug;
  image: string;
}

export interface TrendingTile {
  id: string;
  title: string;
  subtitle: string;
  targetCategory: CategorySlug;
  filterTag?: string;
  image: string;
}

export interface BrandShowcaseItem {
  name: string;
  tagline: string;
  offerText: string;
  accentStyle: 'serif' | 'bold' | 'mono' | 'classic';
}

export interface EditorialArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  steps: string[];
  recommendedProductIds: string[];
  image: string;
}

export const LUXE_BANNER_IMAGE = luxeDarkImg;

export const PROMO_CODES: Record<string, { discountRate: number; label: string }> = {
  MAAN15: { discountRate: 0.15, label: '15% Off Beauty Festival' },
  WELCOME10: { discountRate: 0.1, label: '10% Welcome Savings' },
  GLOW20: { discountRate: 0.2, label: '20% Skincare Extra Off' },
};

export const FREE_SHIPPING_THRESHOLD = 499;
export const STANDARD_SHIPPING_FEE = 69;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'beauty-festival',
    campaign: 'BEAUTY FESTIVAL',
    headline: 'Your Beauty. Your Rules.',
    subheading: 'Discover your favourite beauty essentials at irresistible prices.',
    offer: 'UP TO 50% OFF',
    cta: 'SHOP NOW',
    targetCategory: 'Sale',
    image: heroFestivalImg,
    align: 'left',
  },
  {
    id: 'skincare-special',
    campaign: 'SKINCARE SPECIAL',
    headline: 'Glow Begins With You',
    subheading: 'Discover your perfect skincare routine with dermatologist-backed actives.',
    offer: 'EXTRA 20% OFF',
    cta: 'EXPLORE NOW',
    targetCategory: 'Skin',
    image: heroSkincareImg,
    align: 'left',
  },
  {
    id: 'makeup-collection',
    campaign: 'MAKEUP COLLECTION',
    headline: 'Make Every Look Unforgettable',
    subheading: 'Explore the latest high-pigment lipsticks, silk foundations and mascaras.',
    offer: 'FLAT 30% OFF',
    cta: 'SHOP MAKEUP',
    targetCategory: 'Makeup',
    image: heroMakeupImg,
    align: 'left',
  },
];

export const SECONDARY_NAV_CATEGORIES: Exclude<CategorySlug, 'All'>[] = [
  'Makeup',
  'Skin',
  'Hair',
  'Bath & Body',
  'Fragrance',
  'Appliances',
  'Personal Care',
  'Natural',
  'Mom & Baby',
  'Wellness',
  'Men',
  'Sale',
];

export const MEGA_MENUS: Record<Exclude<CategorySlug, 'All'>, MegaMenuConfig> = {
  Makeup: {
    slug: 'Makeup',
    columns: [
      { heading: 'Face', items: ['Foundation', 'Concealer', 'Blush & Tint', 'Compact Powder', 'Primer', 'Setting Spray'] },
      { heading: 'Lips', items: ['Liquid Lipstick', 'Matte Lipstick', 'Lip Gloss', 'Lip Liner', 'Tinted Lip Balm'] },
      { heading: 'Eyes', items: ['Kajal & Eyeliner', 'Mascara', 'Eyeshadow Palettes', 'Brow Pencils'] },
    ],
    popularBrands: ['Maan Cosmetics', 'Lakmé', 'Maybelline', 'MAC', "L'Oréal Paris"],
    trendingSearches: ['Matte Lip Crème', 'Glass Skin Tint', 'Waterproof Mascara'],
    promoTitle: 'Up to 50% Off Lip & Face Icons',
    promoSubtitle: 'Festival shades crafted for Indian skin undertones',
    promoImage: lipVelvetImg,
  },
  Skin: {
    slug: 'Skin',
    columns: [
      { heading: 'Serums & Actives', items: ['Vitamin C Serums', 'Niacinamide', 'Hyaluronic Acid', 'Retinol & Peptides'] },
      { heading: 'Daily Care', items: ['Ceramide Moisturizers', 'SPF 50 Sunscreens', 'Gel Cleansers', 'Barrier Toners'] },
      { heading: 'By Concern', items: ['Glow & Radiance', 'Dark Spots', 'Acne Care', 'Dryness & Redness'] },
    ],
    popularBrands: ['Minimalist', 'The Ordinary', 'Neutrogena', 'Plum', 'Maan Cosmetics'],
    trendingSearches: ['15% Vitamin C', 'Invisible Sunscreen', '5X Ceramide Cream'],
    promoTitle: 'Extra 20% Off Clinical Skincare',
    promoSubtitle: 'Use code GLOW20 at checkout',
    promoImage: vitaminSerumImg,
  },
  Hair: {
    slug: 'Hair',
    columns: [
      { heading: 'Hair Care', items: ['Repair Shampoos', 'Keratin Masks', 'Botanical Hair Oils', 'Leave-In Serums'] },
      { heading: 'Scalp & Growth', items: ['Peptide Tonics', 'Rosemary Extracts', 'Anti-Dandruff Care'] },
      { heading: 'Styling', items: ['Heat Protectants', 'Curl Creams', 'Dry Shampoos'] },
    ],
    popularBrands: ["L'Oréal Paris", 'Mamaearth', 'Plum', 'Maan Cosmetics'],
    trendingSearches: ['Argan Hair Elixir', 'Keratin Repair Mask', 'Scalp Serum'],
    promoTitle: 'Silicone-Free Botanical Rituals',
    promoSubtitle: 'Smooth humidity frizz from first wash',
    promoImage: hairElixirImg,
  },
  'Bath & Body': {
    slug: 'Bath & Body',
    columns: [
      { heading: 'Body Care', items: ['Body Soufflés', 'Shower Oils', 'Sugar Scrubs', 'Hand Creams'] },
      { heading: 'Bath Rituals', items: ['Aromatherapy Salts', 'Botanical Washes', 'Exfoliating Mitts'] },
    ],
    popularBrands: ['Plum', 'Maan Cosmetics', 'Mamaearth'],
    trendingSearches: ['Vanilla Body Butter', 'Rose Shower Gel', 'Shea Hand Cream'],
    promoTitle: 'Buy 2 Get 1 Free on Body Rituals',
    promoSubtitle: 'Velvet hydration for soft glowing skin',
    promoImage: ceramideCreamImg,
  },
  Fragrance: {
    slug: 'Fragrance',
    columns: [
      { heading: 'Women', items: ['Eau de Parfum', 'Floral Mists', 'Discovery Sets', 'Roll-On Oils'] },
      { heading: 'Unisex & Luxe', items: ['Oud & Amber', 'Saffron & Rose', 'Citrus Woods'] },
    ],
    popularBrands: ['Maan Cosmetics', 'Atelier Aurore', 'MAC'],
    trendingSearches: ['Rose & Ambergris EDP', 'Long-Lasting Mist', 'Discovery Kit'],
    promoTitle: 'Signature Scents by Atelier Aurore',
    promoSubtitle: 'Small-batch French & Indian botanicals',
    promoImage: oudPerfumeImg,
  },
  Appliances: {
    slug: 'Appliances',
    columns: [
      { heading: 'Hair Tools', items: ['Ionic Hair Dryers', 'Ceramic Straighteners', 'Curling Wands', 'Hot Air Brushes'] },
      { heading: 'Skin Tools', items: ['Rose Quartz Rollers', 'LED Facial Wands', 'Ultrasonic Scrubbers'] },
    ],
    popularBrands: ['Maan Cosmetics', 'Philips Beauty', 'Dyson Partner'],
    trendingSearches: ['Ceramic Styler', 'Facial Sculpting Roller'],
    promoTitle: 'Salon Styling at Home',
    promoSubtitle: '2-year brand warranty on all tools',
    promoImage: koreanGlowImg,
  },
  'Personal Care': {
    slug: 'Personal Care',
    columns: [
      { heading: 'Daily Essentials', items: ['Lip Balms', 'Deodorants', 'Oral Care', 'Intimate Hygiene'] },
      { heading: 'Sun & Travel', items: ['Travel Minis', 'Sanitizing Mists', 'SPF Lip Care'] },
    ],
    popularBrands: ['Neutrogena', 'Minimalist', 'Plum'],
    trendingSearches: ['SPF 50 Fluid', 'Travel Kits'],
    promoTitle: 'Everyday Clean Care',
    promoSubtitle: 'Dermatologically tested staples',
    promoImage: sunscreenImg,
  },
  Natural: {
    slug: 'Natural',
    columns: [
      { heading: 'Ayurveda & Botanicals', items: ['Kumkumadi Oils', 'Saffron Creams', 'Rosewater Mists', 'Herbal Hair Oils'] },
      { heading: 'Clean Beauty', items: ['Vegan Makeup', 'Cruelty-Free Skincare', 'Refillable Jars'] },
    ],
    popularBrands: ['Mamaearth', 'Plum', 'Maan Cosmetics'],
    trendingSearches: ['Botanical Hair Oil', 'Clean Essence'],
    promoTitle: 'Pure Plant-Powered Formulas',
    promoSubtitle: 'Free from parabens, sulfates & mineral oil',
    promoImage: hairElixirImg,
  },
  'Mom & Baby': {
    slug: 'Mom & Baby',
    columns: [
      { heading: 'Baby Care', items: ['Tear-Free Wash', 'Ceramide Baby Lotion', 'Mineral Diaper Balm'] },
      { heading: 'Maternity', items: ['Stretch Mark Oils', 'Calming Body Balms', 'Nipple Butter'] },
    ],
    popularBrands: ['Mamaearth', 'Neutrogena'],
    trendingSearches: ['Gentle Baby Cream', 'Organic Massage Oil'],
    promoTitle: 'Pediatrician-Approved Care',
    promoSubtitle: 'Ultra-gentle fragrance-free formulas',
    promoImage: ceramideCreamImg,
  },
  Wellness: {
    slug: 'Wellness',
    columns: [
      { heading: 'Inner Glow', items: ['Collagen Peptides', 'Biotin Gummies', 'Herbal Teas'] },
      { heading: 'Sleep & Calm', items: ['Lavender Pillow Mists', 'Magnesium Bath Flakes', 'Aroma Diffusers'] },
    ],
    popularBrands: ['Maan Cosmetics', 'Plum'],
    trendingSearches: ['Marine Collagen', 'Sleep Mist'],
    promoTitle: 'Holistic Beauty From Within',
    promoSubtitle: 'Daily nutrition & evening calm',
    promoImage: vitaminSerumImg,
  },
  Men: {
    slug: 'Men',
    columns: [
      { heading: 'Skin & Shave', items: ['Charcoal Cleansers', 'Matte SPF 50', 'Soothing Aftershave'] },
      { heading: 'Hair & Scent', items: ['Beard Oils', 'Anti-Hairfall Shampoo', 'Woody Eau de Parfum'] },
    ],
    popularBrands: ['Minimalist', 'Neutrogena', 'Maan Cosmetics'],
    trendingSearches: ['Invisible Sunscreen', 'Oud Perfume'],
    promoTitle: 'Grooming Simplified',
    promoSubtitle: 'Zero white cast SPF & sharp scents',
    promoImage: oudPerfumeImg,
  },
  Sale: {
    slug: 'Sale',
    columns: [
      { heading: 'Festival Steals', items: ['Up to 50% Off Makeup', 'Flat 30% Off Skincare', 'Buy 2 Get 1 Free'] },
      { heading: 'Value Sets', items: ['Bridal Trousseau Kits', 'Skincare Combos', 'Mini Discovery Sets'] },
    ],
    popularBrands: ['Maan Cosmetics', 'Lakmé', 'Maybelline', 'Minimalist'],
    trendingSearches: ['MAAN15 Code', 'Festival Lip Trio', 'Combo Offers'],
    promoTitle: 'Beauty Festival Mega Sale',
    promoSubtitle: 'Limited-time offers across 10+ top houses',
    promoImage: heroFestivalImg,
  },
};

export const SHOP_BY_CATEGORIES: CategoryTile[] = [
  { label: 'Makeup', slug: 'Makeup', image: lipVelvetImg },
  { label: 'Skincare', slug: 'Skin', image: vitaminSerumImg },
  { label: 'Haircare', slug: 'Hair', image: hairElixirImg },
  { label: 'Bath & Body', slug: 'Bath & Body', image: ceramideCreamImg },
  { label: 'Fragrance', slug: 'Fragrance', image: oudPerfumeImg },
  { label: 'Appliances', slug: 'Appliances', image: heroMakeupImg },
  { label: 'Personal Care', slug: 'Personal Care', image: sunscreenImg },
  { label: 'Wellness', slug: 'Wellness', image: koreanGlowImg },
  { label: "Men's Grooming", slug: 'Men', image: luxeDarkImg },
  { label: 'Natural Beauty', slug: 'Natural', image: heroSkincareImg },
];

export const TOP_OFFERS: OfferCard[] = [
  {
    id: 'offer-makeup-50',
    headline: 'Up to 50% Off on Makeup',
    badge: 'UP TO 50% OFF',
    description: 'Velvet lipsticks, silk foundations, and everyday blush compacts.',
    cta: 'Shop Now',
    targetCategory: 'Makeup',
    image: lipVelvetImg,
  },
  {
    id: 'offer-b2g1',
    headline: 'Buy 2 Get 1 Free',
    badge: 'B2G1 FESTIVAL',
    description: 'Mix and match lip glosses, masks, and daily cleansers.',
    cta: 'Shop Now',
    targetCategory: 'Bath & Body',
    image: koreanGlowImg,
  },
  {
    id: 'offer-skincare-30',
    headline: 'Flat 30% Off on Skincare',
    badge: 'FLAT 30% OFF',
    description: 'Vitamin C serums, ceramide creams, and invisible SPF 50.',
    cta: 'Shop Now',
    targetCategory: 'Skin',
    image: vitaminSerumImg,
  },
  {
    id: 'offer-combos',
    headline: 'Exclusive Beauty Combos',
    badge: 'SAVE ₹850+',
    description: 'Curated routine kits for glass skin and glossy hair.',
    cta: 'Shop Now',
    targetCategory: 'Hair',
    image: hairElixirImg,
  },
  {
    id: 'offer-new-launch',
    headline: 'New Launch Offers',
    badge: 'JUST DROPPED',
    description: 'Introductory prices on Atelier Aurore & Maan Luxe.',
    cta: 'Shop Now',
    targetCategory: 'Fragrance',
    image: oudPerfumeImg,
  },
];

export const TRENDING_TILES: TrendingTile[] = [
  {
    id: 'trend-makeup',
    title: 'Trending Makeup Products',
    subtitle: 'Satin-matte lip pigments & dewy cheek tints',
    targetCategory: 'Makeup',
    image: heroMakeupImg,
  },
  {
    id: 'trend-korean',
    title: 'Korean Skincare',
    subtitle: 'Dewy barrier essences & glass-skin hydrators',
    targetCategory: 'Skin',
    filterTag: 'korean',
    image: koreanGlowImg,
  },
  {
    id: 'trend-luxe',
    title: 'Luxury Beauty',
    subtitle: 'Prestige elixirs, ambergris parfum & velvet compacts',
    targetCategory: 'Fragrance',
    filterTag: 'luxe',
    image: luxeDarkImg,
  },
  {
    id: 'trend-haircare',
    title: 'Haircare Essentials',
    subtitle: 'Cold-pressed argan oil & keratin repair masks',
    targetCategory: 'Hair',
    image: hairElixirImg,
  },
  {
    id: 'trend-celebrity',
    title: 'Celebrity Beauty Picks',
    subtitle: 'Red-carpet lip shades & invisible sun protection',
    targetCategory: 'Makeup',
    image: heroFestivalImg,
  },
  {
    id: 'trend-new',
    title: 'New Beauty Launches',
    subtitle: 'Fresh clinical actives & summer SPF drops',
    targetCategory: 'Skin',
    image: sunscreenImg,
  },
];

export const TOP_BRANDS: BrandShowcaseItem[] = [
  { name: 'Lakmé', tagline: 'Runway Colour & Skincare', offerText: 'Up to 40% Off', accentStyle: 'serif' },
  { name: 'Maybelline', tagline: 'New York Makeup Icons', offerText: 'Flat 30% Off', accentStyle: 'bold' },
  { name: "L'Oréal Paris", tagline: 'Science-Backed Hair & Skin', offerText: 'Up to 35% Off', accentStyle: 'classic' },
  { name: 'MAC', tagline: 'Backstage Artistry', offerText: 'Complimentary Gift', accentStyle: 'mono' },
  { name: 'The Ordinary', tagline: 'Clinical Formulations', offerText: 'Bestsellers In Stock', accentStyle: 'classic' },
  { name: 'Maan Cosmetics', tagline: 'Signature Indian Beauty', offerText: 'Up to 50% Off', accentStyle: 'serif' },
  { name: 'Minimalist', tagline: 'Transparent Actives', offerText: 'Flat 15% Off', accentStyle: 'mono' },
  { name: 'Mamaearth', tagline: 'Toxin-Free Botanicals', offerText: 'Buy 2 Get 1 Free', accentStyle: 'bold' },
  { name: 'Plum', tagline: '100% Vegan Goodness', offerText: 'Up to 35% Off', accentStyle: 'serif' },
  { name: 'Neutrogena', tagline: 'Dermatologist Recommended', offerText: 'Flat 25% Off', accentStyle: 'classic' },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'guide-everyday-makeup',
    title: 'Everyday Makeup Guide',
    category: 'MAKEUP MASTERCLASS',
    readTime: '4 min read',
    summary: 'A five-minute breathable base, soft flushed cheeks, and a transfer-proof rose lip that lasts from morning commute to dinner.',
    steps: [
      'Prep skin with two drops of hyaluronic serum and let it absorb for 60 seconds.',
      'Blend a sheer skin-tint or lightweight foundation outward from the T-zone.',
      'Press velvet matte lip crème onto the center of lips and tap gently with a fingertip.',
    ],
    recommendedProductIds: ['maan-velvet-lip-creme', 'lumin-velvet-foundation'],
    image: heroMakeupImg,
  },
  {
    id: 'guide-glowing-skin',
    title: 'Skincare Routine for Glowing Skin',
    category: 'DERM JOURNAL',
    readTime: '5 min read',
    summary: 'How to layer stabilized Vitamin C with biomimetic ceramides without pilling or sensitizing your skin barrier.',
    steps: [
      'Cleanse gently with lukewarm water and leave skin slightly damp.',
      'Apply 3 drops of 15% Vitamin C + Hyaluronic Serum across cheeks and forehead.',
      'Seal moisture with a pearl-sized scoop of 5X Ceramide Whipped Cream.',
    ],
    recommendedProductIds: ['vitamin-c-radiance-serum', 'hydro-barrier-ceramide-cream'],
    image: vitaminSerumImg,
  },
  {
    id: 'guide-sunscreens',
    title: 'Best Sunscreens for Every Skin Type',
    category: 'SUN PROTECTION',
    readTime: '3 min read',
    summary: 'Zero white cast, zero greasiness: choosing invisible broad-spectrum SPF 50 filters made for humid Indian afternoons.',
    steps: [
      'Use the two-finger rule for face and neck coverage every morning.',
      'Opt for invisible fluid gel textures if you have combination or acne-prone skin.',
      'Reapply every 3 hours when outdoors near reflective surfaces.',
    ],
    recommendedProductIds: ['daily-defense-spf50'],
    image: sunscreenImg,
  },
  {
    id: 'guide-haircare',
    title: 'Haircare Secrets',
    category: 'BOTANICAL LAB',
    readTime: '4 min read',
    summary: 'Restore mirror shine and tame monsoon frizz using pre-wash botanical oils paired with plant-keratin masks.',
    steps: [
      'Warm 2 pumps of argan and camellia oil between palms before shampooing.',
      'Leave restorative keratin mask on mid-lengths for 7 minutes in the shower.',
      'Finish with a single drop of botanical elixir on towel-dried ends.',
    ],
    recommendedProductIds: ['fleur-dor-botanical-hair-duo', 'keratin-repair-shampoo'],
    image: hairElixirImg,
  },
  {
    id: 'guide-trending-looks',
    title: 'Trending Beauty Looks',
    category: 'RUNWAY & FESTIVE',
    readTime: '4 min read',
    summary: 'From glass-skin K-beauty glaze to softly smoked crimson lips—the top festive looks taking over Maan.',
    steps: [
      'Tap rose-quartz shimmer gloss over lip liner for a high-shine dimensional pout.',
      'Sweep peach-rose powder blush high on the cheekbones for an instant lift.',
      'Mist rose & ambergris eau de parfum onto pulse points to complete the ritual.',
    ],
    recommendedProductIds: ['lip-dew-plumping-gloss', 'aurore-eau-de-parfum'],
    image: koreanGlowImg,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'vitamin-c-radiance-serum',
    brand: 'Minimalist',
    name: '15% Vitamin C + Hyaluronic Face Serum',
    subtitle: 'Brightening antioxidant elixir for radiant glass skin',
    category: 'Skin',
    tags: ['bestseller', 'vitamin c', 'serum', 'glow', 'korean'],
    isBestseller: true,
    image: vitaminSerumImg,
    rating: 4.8,
    reviewCount: 2410,
    variants: [
      { id: '30ml', label: '30 ml', price: 699, mrp: 899, inStock: true },
      { id: '50ml', label: '50 ml', price: 1099, mrp: 1399, inStock: true },
    ],
    description:
      'Stabilized 15% Ethyl Ascorbic Acid paired with multi-molecular Hyaluronic Acid to visibly brighten dullness and fade post-blemish marks.',
    keyIngredients: ['15% Ethyl Ascorbic Acid', '2% Hyaluronic Acid', '0.5% Ferulic Acid'],
    howToUse: 'Apply 3–4 drops onto cleansed damp face every morning before moisturizer and SPF 50.',
    reviews: [
      {
        id: 'r1',
        author: 'Meera Nair',
        city: 'Kochi',
        rating: 5,
        date: 'October 2026',
        comment: 'Zero tingling and my skin looks noticeably brighter in three weeks.',
        verifiedVariant: '30 ml',
      },
    ],
  },
  {
    id: 'maan-velvet-lip-creme',
    brand: 'Maan Cosmetics',
    name: 'Matte Liquid Lipstick — Velvet Crème',
    subtitle: '12-hour transfer-proof matte pigment with rosehip oil',
    category: 'Makeup',
    tags: ['bestseller', 'lipstick', 'matte', 'makeup', 'festival'],
    isBestseller: true,
    image: lipVelvetImg,
    rating: 4.9,
    reviewCount: 3180,
    variants: [
      { id: 'crimson-heritage', label: '01 Crimson Heritage', swatchHex: '#9E1B32', price: 599, mrp: 899, inStock: true },
      { id: 'chai-rose', label: '02 Chai Rose', swatchHex: '#C45B6E', price: 599, mrp: 899, inStock: true },
      { id: 'spiced-berry', label: '03 Spiced Berry', swatchHex: '#7A243C', price: 599, mrp: 899, inStock: true },
      { id: 'nude-cashmere', label: '04 Nude Cashmere', swatchHex: '#B88376', price: 599, mrp: 899, inStock: true },
    ],
    description:
      'A cushiony whipped matte liquid lipstick delivering single-swipe opacity without drying out lips.',
    keyIngredients: ['Rosehip Seed Oil', 'Vitamin E', 'Micro-Velvet Silica'],
    howToUse: 'Outline lips with the pointed doe-foot applicator and fill evenly.',
    reviews: [
      {
        id: 'r2',
        author: 'Ananya Verma',
        city: 'Bengaluru',
        rating: 5,
        date: 'October 2026',
        comment: 'Lasts through lunch with zero cracking. Crimson Heritage is a staple!',
        verifiedVariant: '01 Crimson Heritage',
      },
    ],
  },
  {
    id: 'hydro-barrier-ceramide-cream',
    brand: 'Neutrogena',
    name: 'Hydrating 5X Ceramide Face Moisturizer',
    subtitle: 'Cloud-whipped daily barrier cream for 48-hour hydration',
    category: 'Skin',
    tags: ['bestseller', 'moisturizer', 'ceramide', 'bath & body'],
    isBestseller: true,
    image: ceramideCreamImg,
    rating: 4.8,
    reviewCount: 1640,
    variants: [
      { id: '50g', label: '50 g Jar', price: 799, mrp: 1099, inStock: true },
      { id: '100g', label: '100 g Refill', price: 1349, mrp: 1850, inStock: true },
    ],
    description:
      'Biomimetic ceramide complex suspended in olive squalane and colloidal oat to calm redness and lock in moisture.',
    keyIngredients: ['5X Ceramides', 'Olive Squalane', 'Colloidal Oat'],
    howToUse: 'Massage a pearl-sized amount evenly across face and neck morning and evening.',
    reviews: [
      {
        id: 'r3',
        author: 'Dr. Kavya Iyer',
        city: 'Chennai',
        rating: 5,
        date: 'September 2026',
        comment: 'Absorbs satin-matte with zero heaviness in humid weather.',
        verifiedVariant: '50 g Jar',
      },
    ],
  },
  {
    id: 'daily-defense-spf50',
    brand: 'The Ordinary',
    name: 'Daily Defense Invisible Sunscreen SPF 50',
    subtitle: 'Broad-spectrum PA++++ zero-white-cast fluid',
    category: 'Skin',
    tags: ['bestseller', 'sunscreen', 'spf', 'personal care', 'men'],
    isBestseller: true,
    isNew: true,
    image: sunscreenImg,
    rating: 4.9,
    reviewCount: 1925,
    variants: [
      { id: '50ml', label: '50 ml Pump', price: 649, mrp: 850, inStock: true },
      { id: '100ml', label: '100 ml Duo', price: 1149, mrp: 1550, inStock: true },
    ],
    description:
      'Ultra-lightweight water-resistant fluid sunscreen enriched with niacinamide and panthenol that melts invisibly into all Indian skin tones.',
    keyIngredients: ['New-Gen UV Filters', '2% Niacinamide', 'Panthenol B5'],
    howToUse: 'Apply generously 15 minutes before sun exposure. Reapply every 3 hours.',
    reviews: [
      {
        id: 'r4',
        author: 'Rohan Malhotra',
        city: 'Gurugram',
        rating: 5,
        date: 'October 2026',
        comment: 'Literally disappears on dusky skin with zero grey cast or shine.',
        verifiedVariant: '50 ml Pump',
      },
    ],
  },
  {
    id: 'keratin-repair-shampoo',
    brand: "L'Oréal Paris",
    name: 'Hair Repair Shampoo & Botanical Elixir Duo',
    subtitle: 'Argan, camellia & keratin bond-building hair ritual',
    category: 'Hair',
    tags: ['bestseller', 'haircare', 'shampoo', 'natural'],
    isBestseller: true,
    image: hairElixirImg,
    rating: 4.7,
    reviewCount: 1210,
    variants: [
      { id: 'duo', label: 'Oil + Mask Duo', price: 1199, mrp: 1699, inStock: true },
      { id: 'oil', label: 'Botanical Oil 100 ml', price: 749, mrp: 999, inStock: true },
    ],
    description:
      'Silicone-free repairing hair ritual infused with Moroccan argan, Japanese camellia, and plant keratin to mend split ends and boost shine.',
    keyIngredients: ['Moroccan Argan Oil', 'Camellia Seed', 'Hydrolyzed Keratin'],
    howToUse: 'Apply mask after cleansing for 5–7 minutes, rinse, and smooth 2 drops of oil on damp ends.',
    reviews: [
      {
        id: 'r5',
        author: 'Nandini Rao',
        city: 'Hyderabad',
        rating: 5,
        date: 'October 2026',
        comment: 'Tames coastal humidity frizz without weighing down waves.',
        verifiedVariant: 'Oil + Mask Duo',
      },
    ],
  },
  {
    id: 'lip-dew-plumping-gloss',
    brand: 'Maybelline',
    name: 'Lip Dew Glass-Shine Lip Gloss & Blush Edit',
    subtitle: 'Hyaluronic peptide cushion gloss for mirror shine',
    category: 'Makeup',
    tags: ['bestseller', 'new', 'lip gloss', 'korean', 'wellness'],
    isBestseller: true,
    isNew: true,
    image: koreanGlowImg,
    rating: 4.8,
    reviewCount: 980,
    variants: [
      { id: 'rose-quartz', label: '01 Rose Quartz', swatchHex: '#E08E9D', price: 549, mrp: 750, inStock: true },
      { id: 'petal-glaze', label: '02 Petal Glaze', swatchHex: '#D89B8B', price: 549, mrp: 750, inStock: true },
      { id: 'peach-nectar', label: '03 Peach Nectar', swatchHex: '#E29E88', price: 549, mrp: 750, inStock: true },
    ],
    description:
      'Non-sticky K-beauty inspired peptide lip gloss that coats lips in mirror-like radiance and dewy moisture.',
    keyIngredients: ['Tripeptide Complex', 'Hyaluronic Microspheres', 'Jojoba Oil'],
    howToUse: 'Swipe solo for glass-lip shine or layer over matte lipstick.',
    reviews: [
      {
        id: 'r6',
        author: 'Rhea Kapoor',
        city: 'New Delhi',
        rating: 5,
        date: 'October 2026',
        comment: 'Zero stickiness and leaves lips plump even after it wears off.',
        verifiedVariant: '01 Rose Quartz',
      },
    ],
  },
  {
    id: 'aurore-eau-de-parfum',
    brand: 'Maan Cosmetics',
    name: 'Aurore Rose & Ambergris Eau de Parfum',
    subtitle: 'Warm damask rose, saffron & solar ambergris',
    category: 'Fragrance',
    tags: ['new', 'luxe', 'perfume', 'fragrance'],
    isNew: true,
    isLuxe: true,
    image: oudPerfumeImg,
    rating: 4.9,
    reviewCount: 764,
    variants: [
      { id: '50ml', label: '50 ml EDP', price: 2150, mrp: 2800, inStock: true },
      { id: '100ml', label: '100 ml EDP', price: 3450, mrp: 4500, inStock: true },
    ],
    description:
      'Macerated in small batches with Kashmiri saffron, damask rose absolute, and mineral ambergris for 10-hour sillage.',
    keyIngredients: ['Damask Rose', 'Kashmiri Saffron', 'Mineral Ambergris'],
    howToUse: 'Mist onto wrists and collarbone from six inches away.',
    reviews: [
      {
        id: 'r7',
        author: 'Sana Merchant',
        city: 'Mumbai',
        rating: 5,
        date: 'October 2026',
        comment: 'Soft floral opening that dries down into warm amber perfection.',
        verifiedVariant: '50 ml EDP',
      },
    ],
  },
  {
    id: 'nocturne-luxe-elixir',
    brand: 'MAC',
    name: 'Nocturne Gold & Obsidian Radiance Elixir',
    subtitle: 'Prestige overnight recovery facial oil & parfum duo',
    category: 'Skin',
    tags: ['new', 'luxe', 'serum', 'anti-aging'],
    isNew: true,
    isLuxe: true,
    image: luxeDarkImg,
    rating: 4.9,
    reviewCount: 420,
    variants: [
      { id: '30ml', label: '30 ml Luxe Flacon', price: 2999, mrp: 3800, inStock: true },
    ],
    description:
      'Overnight botanical-peptide recovery elixir crafted to restore elasticity, luminosity, and velvet smoothness by morning.',
    keyIngredients: ['Bakuchiol 1%', '24K Gold Peptides', 'Squalane'],
    howToUse: 'Press 3 drops into skin as the final step of your evening routine.',
    reviews: [
      {
        id: 'r8',
        author: 'Tara Deshmukh',
        city: 'Pune',
        rating: 5,
        date: 'October 2026',
        comment: 'Wake up with rested, luminous skin every single morning.',
        verifiedVariant: '30 ml Luxe Flacon',
      },
    ],
  },
  {
    id: 'lumin-velvet-foundation',
    brand: 'Lakmé',
    name: 'Velvet Silk Matte Foundation + Mascara Kit',
    subtitle: 'Medium-to-full buildable coverage with 24H oil control',
    category: 'Makeup',
    tags: ['new', 'foundation', 'mascara', 'makeup', 'appliances'],
    isNew: true,
    image: heroMakeupImg,
    rating: 4.8,
    reviewCount: 1120,
    variants: [
      { id: 'warm-sand', label: '220 Warm Sand', swatchHex: '#CFA182', price: 1199, mrp: 1599, inStock: true },
      { id: 'golden-honey', label: '310 Golden Honey', swatchHex: '#B68160', price: 1199, mrp: 1599, inStock: true },
      { id: 'rich-espresso', label: '430 Rich Caramel', swatchHex: '#8C5941', price: 1199, mrp: 1599, inStock: true },
    ],
    description:
      'Weightless velvet foundation engineered for Indian undertones paired with a smudge-proof lengthening mascara.',
    keyIngredients: ['Niacinamide', 'Silk Amino Acids', 'SPF 15'],
    howToUse: 'Pump once onto the back of your hand and buff outward with a damp sponge.',
    reviews: [
      {
        id: 'r9',
        author: 'Priya Menon',
        city: 'Mumbai',
        rating: 5,
        date: 'October 2026',
        comment: 'No oxidation after 8 hours at the office—true Indian undertones.',
        verifiedVariant: '220 Warm Sand',
      },
    ],
  },
  {
    id: 'festival-trousseau-edit',
    brand: 'Plum',
    name: 'Maan Beauty Festival Signature Trio',
    subtitle: 'Full-size satin lipstick, hydrating serum & rose blush',
    category: 'Bath & Body',
    tags: ['new', 'combo', 'mom & baby', 'natural', 'festival'],
    isNew: true,
    image: heroFestivalImg,
    rating: 5.0,
    reviewCount: 540,
    variants: [
      { id: 'rose-edit', label: 'Rose Velvet Trio', swatchHex: '#D15974', price: 1899, mrp: 3299, inStock: true },
      { id: 'coral-edit', label: 'Petal Coral Trio', swatchHex: '#D8756C', price: 1899, mrp: 3299, inStock: true },
    ],
    description:
      'Celebrate the Beauty Festival with our bestselling lip colour, hyaluronic serum, and pressed rose blush at 42% off.',
    keyIngredients: ['Hyaluronic Acid', 'Rosehip Oil', 'Mineral Pigments'],
    howToUse: 'Use morning and evening for an effortless festive flush.',
    reviews: [
      {
        id: 'r10',
        author: 'Ishita Sharma',
        city: 'Jaipur',
        rating: 5,
        date: 'October 2026',
        comment: 'Best value Beauty Festival box—gifted two sets to my bridesmaids.',
        verifiedVariant: 'Rose Velvet Trio',
      },
    ],
  },
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getDiscountPercent(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
