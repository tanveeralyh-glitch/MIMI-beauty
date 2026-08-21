import { findProduct, products, type Product } from "@/lib/products";

export const GIFT_PACKAGING_FEE = 300;

export type Bundle = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  products: string[];
  image: string;
  /** How many unique body oils the shopper must pick. 0 = no body-oil selector. */
  bodyOilSlots: number;
  /** When false, hide the “products in this set” picker entirely. */
  showProductOptions?: boolean;
  /** Cap how many included products can be selected at once. */
  productSelectionMax?: number;
};

const bundleTheme = {
  bg: "#121A15",
  accent: "#C9A86A",
  accentMuted: "rgba(201,168,106,0.15)",
  surface: "rgba(255,255,255,0.03)",
  glow: "rgba(201,168,106,0.06)",
};

export const bundles: Bundle[] = [
  {
    id: "bundle-1",
    name: "Luna Glow Duo",
    description: "Face and body, your daily glow.",
    price: 7650,
    originalPrice: 8500,
    discountPercent: 10,
    products: ["halo", "pearl", "santorini", "amalfi"],
    image: "/products/luna-glow.jpg",
    bodyOilSlots: 0,
  },
  {
    id: "bundle-2",
    name: "Root to Radiance",
    description: "Nourish your roots. Shine through.",
    price: 7200,
    originalPrice: 8000,
    discountPercent: 10,
    products: ["veil", "herbe"],
    image: "/products/root-to-radiance.jpg",
    bodyOilSlots: 0,
    showProductOptions: false,
  },
  {
    id: "bundle-3",
    name: "Radiant You",
    description: "For skin that glows and hair that flows.",
    price: 10350,
    originalPrice: 11500,
    discountPercent: 10,
    products: ["dew", "veil", "halo"],
    image: "/products/radiant-you.jpg",
    bodyOilSlots: 0,
    showProductOptions: false,
  },
  {
    id: "bundle-4",
    name: "The Complete Glow",
    description: "All the essentials. All for you.",
    price: 14850,
    originalPrice: 16500,
    discountPercent: 10,
    products: ["halo", "pearl", "santorini", "amalfi"],
    image: "/products/complete-glow.jpg",
    bodyOilSlots: 0,
    productSelectionMax: 1,
  },
  {
    id: "bundle-5",
    name: "Halo Duo",
    description: "Double the glow, double the glow.",
    price: 9000,
    originalPrice: 10000,
    discountPercent: 10,
    products: ["halo", "pearl"],
    image: "/products/halo-duo.jpg",
    bodyOilSlots: 2,
  },
  {
    id: "bundle-6",
    name: "Halo Quartet",
    description: "Four shades. Endless luminosity.",
    price: 18000,
    originalPrice: 20000,
    discountPercent: 10,
    products: ["halo", "pearl", "amalfi", "santorini"],
    image: "/products/halo-quartet.jpg",
    bodyOilSlots: 0,
    showProductOptions: false,
  },
  {
    id: "bundle-7",
    name: "The Everything Set",
    description: "Seven essentials. One complete you.",
    price: 25200,
    originalPrice: 31500,
    discountPercent: 20,
    products: ["dew", "veil", "herbe", "halo"],
    image: "/products/everything-set.jpg",
    bodyOilSlots: 0,
    showProductOptions: false,
  },
];

export const bodyOilProducts = () => products.filter((p) => p.category === "BODY");

export function includedProducts(bundle: Bundle): Product[] {
  return bundle.products
    .map((slug) => findProduct(slug))
    .filter((item): item is Product => Boolean(item));
}

export function showsBodyOilSelector(bundle: Bundle) {
  return bundle.bodyOilSlots > 0 && bundle.id !== "bundle-7";
}

export function showsProductOptions(bundle: Bundle) {
  if (bundle.showProductOptions === false) return false;
  if (showsBodyOilSelector(bundle)) return true;
  return includedProducts(bundle).length > 0;
}

export function selectionMax(bundle: Bundle) {
  if (showsBodyOilSelector(bundle)) return bundle.bodyOilSlots;
  if (bundle.productSelectionMax != null) return bundle.productSelectionMax;
  return includedProducts(bundle).length;
}

export function defaultSelectedSlugs(bundle: Bundle) {
  if (showsBodyOilSelector(bundle)) return [];
  const included = includedProducts(bundle);
  const max = selectionMax(bundle);
  if (max <= 1) return included[0] ? [included[0].slug] : [];
  return included.map((p) => p.slug);
}

export function toggleUnique(list: string[], slug: string, max: number) {
  if (max <= 1) return [slug];
  if (list.includes(slug)) return list.filter((item) => item !== slug);
  if (list.length >= max) return list;
  return [...list, slug];
}

export function optionLabel(slugs: string[]) {
  return slugs
    .map((slug) => findProduct(slug)?.name)
    .filter(Boolean)
    .join(" · ");
}

export const customSetBuilder = {
  name: "Mimi's Edit",
  discountPercent: 10,
};

export type QuantityMap = Record<string, number>;

export function selectedEntries(quantities: QuantityMap) {
  return Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([slug, qty]) => {
      const product = findProduct(slug);
      return product ? { product, qty } : null;
    })
    .filter((item): item is { product: Product; qty: number } => Boolean(item));
}

export function totalSelectedQuantity(quantities: QuantityMap) {
  return Object.values(quantities).reduce((sum, qty) => sum + Math.max(0, qty), 0);
}

export function customSetSubtotal(quantities: QuantityMap) {
  return selectedEntries(quantities).reduce((sum, { product, qty }) => sum + product.price * qty, 0);
}

export function customSetLabel(quantities: QuantityMap) {
  return selectedEntries(quantities)
    .map(({ product, qty }) => `${product.name} × ${qty}`)
    .join(" · ");
}

export function customSetDiscountAmount(subtotal: number) {
  return Math.round(subtotal * (customSetBuilder.discountPercent / 100));
}

export function customSetDiscountedProductsTotal(quantities: QuantityMap) {
  const subtotal = customSetSubtotal(quantities);
  return subtotal - customSetDiscountAmount(subtotal);
}

export function toCustomSetProduct(giftPackaging: boolean, quantities: QuantityMap): Product {
  const entries = selectedEntries(quantities);
  const subtotal = customSetSubtotal(quantities);
  const discounted = customSetDiscountedProductsTotal(quantities);
  const totalPrice = discounted + (giftPackaging ? GIFT_PACKAGING_FEE : 0);
  const cover = entries[0]?.product.image || "/products/mimis-edit.jpg";
  const slugKey = entries.map(({ product, qty }) => `${product.slug}x${qty}`).join("_");

  return {
    slug: `custom-set-${giftPackaging ? "gift" : "only"}-${slugKey || "empty"}`,
    name: customSetBuilder.name,
    tagline: customSetLabel(quantities) || customSetBuilder.name,
    category: "BUNDLE",
    collection: "Mimi Sets",
    price: totalPrice,
    originalPrice: subtotal + (giftPackaging ? GIFT_PACKAGING_FEE : 0),
    size: giftPackaging ? "Set · Gift Packaging" : "Set",
    image: cover,
    hoverImage: cover,
    rating: 5.0,
    reviews: 0,
    benefits: [],
    ingredients: [],
    directions: "",
    howToUse: "",
    skinType: [],
    description: customSetLabel(quantities),
    gallery: [cover],
    theme: bundleTheme,
  };
}

export function toBundleProduct(
  bundle: Bundle,
  giftPackaging: boolean,
  totalPrice: number,
  selectedSlugs: string[],
): Product {
  const label = optionLabel(selectedSlugs);
  return {
    slug: `${bundle.id}-${giftPackaging ? "gift" : "only"}-${selectedSlugs.slice().sort().join("_") || "set"}`,
    name: bundle.name,
    tagline: label || (giftPackaging ? "Gift packaging included" : bundle.description),
    category: "BUNDLE",
    collection: "Mimi Sets",
    price: totalPrice,
    originalPrice: bundle.originalPrice,
    size: giftPackaging ? "Set · Gift Packaging" : "Set",
    image: bundle.image,
    hoverImage: bundle.image,
    rating: 5.0,
    reviews: 0,
    benefits: [],
    ingredients: [],
    directions: "",
    howToUse: "",
    skinType: [],
    description: bundle.description,
    gallery: [bundle.image],
    theme: bundleTheme,
  };
}
