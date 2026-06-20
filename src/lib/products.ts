// All product imagery uses user-provided gallery shots (PNG).
import gBrownieBites24 from "@/assets/products/gallery/brownie-bites-24-a.png";
import gBrownieMini12 from "@/assets/products/gallery/brownie-mini-12-a.png";
import gMadeleines from "@/assets/products/gallery/madeleines-a.png";
import gProteinBombMini from "@/assets/products/gallery/protein-bomb-mini-a.png";
import gCookieBites from "@/assets/products/gallery/cookie-bites-a.png";
import gTiramisu from "@/assets/products/gallery/tiramisu-a.png";
import gProteinBrownie from "@/assets/products/gallery/protein-brownie-a.png";
import gOreoIc from "@/assets/products/gallery/oreo-ic-a.png";
import gStrawberryIc from "@/assets/products/gallery/strawberry-ic-a.png";
import gChocIc from "@/assets/products/gallery/choc-ic-a.png";
import gVanillaIc from "@/assets/products/gallery/vanilla-ic-a.png";
import gCheesecake from "@/assets/products/gallery/cheesecake-a.png";
import gGatheringTiramisu from "@/assets/products/gallery/gathering-tiramisu-a.png";
import gCookieMixSmall from "@/assets/products/gallery/cookie-mix-small-a.png";
import gBrownieMixSmall from "@/assets/products/gallery/brownie-mix-small-a.png";
import gBrownieMix from "@/assets/products/gallery/brownie-mix-a.png";
import gCookieMix from "@/assets/products/gallery/cookie-mix-a.png";
import gCookieBites24 from "@/assets/products/gallery/cookie-bites-24-a.png";
import gCookieBites16 from "@/assets/products/gallery/cookie-bites-16-a.png";
import gChessBites16a from "@/assets/products/gallery/chess-bites-16-a.png";
import gChessBites16b from "@/assets/products/gallery/chess-bites-16-b.png";
import gChessBites24 from "@/assets/products/gallery/chess-bites-24-a.png";

export type Category = "Desserts" | "Bites Boxes" | "Heavens Mixes" | "Cakes" | "Gathering Box";

export interface PerServing {
  label: string;
  count: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Category;
  // Whole-product (per package) macros — used for filters & sorting
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  perServing?: PerServing;
  badges: string[];
  bestseller?: boolean;
  image?: string;
  images?: string[];
  note?: string;
}

const GALLERIES: Record<string, string[]> = {
  "brownie-bites-24": [gBrownieBites24],
  "brownie-mini-12": [gBrownieMini12],
  "madeleines": [gMadeleines],
  "protein-bomb-mini": [gProteinBombMini],
  "heavens-cookie-bites": [gCookieBites, gCookieBites24],
  "tiramisu": [gTiramisu],
  "protein-brownie": [gProteinBrownie],
  "oreo-ic": [gOreoIc],
  "strawberry-ic": [gStrawberryIc],
  "choc-ic": [gChocIc],
  "vanilla-ic": [gVanillaIc],
  "cheesecake": [gCheesecake],
  "gathering-tiramisu": [gGatheringTiramisu],
  "cookie-mix-small": [gCookieMixSmall],
  "brownie-mix-small": [gBrownieMixSmall],
  "brownie-mix": [gBrownieMix],
  "cookie-mix": [gCookieMix],
  "cookie-bites-24": [gCookieBites24],
  "cookie-bites-16": [gCookieBites16],
  "chess-bites-16": [gChessBites16a, gChessBites16b],
  "chess-bites-24": [gChessBites24],
};

export const products: Product[] = [
  {
    id: "brownie-bites-24",
    name: "Brownie Bites Box (24pc)",
    description:
      "Deliciously rich, fudgy brownie bites made with the finest Valrhona chocolate. Soft, sweet, and indulgent — ideal for sharing with friends, bringing to gatherings, or keeping all to yourself (we won't judge).",
    note: "Keto-friendly and gluten-free.",
    price: 144,
    oldPrice: 174,
    category: "Bites Boxes",
    calories: 1728,
    protein: 120,
    carbs: 18,
    fat: 114,
    perServing: { label: "bite", count: 24, calories: 72, protein: 5, carbs: 0.75, fat: 4.75 },
    badges: ["Keto", "Gluten Free", "20% Off"],
  },
  {
    id: "brownie-mini-12",
    name: "Brownie Mini Box (12pc)",
    description:
      "Fudgy chocolate brownie bites packed with rich, decadent flavor in every single piece. A whole box of guilt-free indulgence — perfect for sharing or savoring all to yourself!",
    price: 180,
    category: "Gathering Box",
    badges: ["Keto", "Gluten Free"],
  },
  {
    id: "madeleines",
    name: "Heavens Chocolate Madeleines",
    description:
      "Guilt-free indulgence made fresh daily. 4 fluffy, chocolatey madeleines per cup. Proudly Qatari — sweet, soft, and packed with protein.",
    price: 29,
    category: "Desserts",
    calories: 55,
    protein: 20,
    perServing: { label: "piece", count: 4, calories: 13.75, protein: 5 },
    badges: ["Sugar Free", "Gluten Free", "20g Protein / Cup"],
  },
  {
    id: "protein-bomb-mini",
    name: "Protein Bomb (Mini)",
    description:
      "Tastes like cookies, fuels like protein. Packed with rich chocolate chip cookie flavor in every bite-sized ball. Feels like a treat. Acts like fuel.",
    price: 15,
    category: "Desserts",
    calories: 100,
    protein: 10,
    fiber: 2,
    badges: ["Zero Added Sugar", "10g Protein", "2g Fiber"],
  },
  {
    id: "heavens-cookie-bites",
    name: "Heavens Cookie Bites",
    description:
      "Treat yourself to a mix of warm cookie crumble and rich chocolate melt in every bite. Gluten-free, keto, and zero added sugar, made with fresh ingredients.",
    price: 29,
    category: "Desserts",
    calories: 272,
    protein: 24,
    carbs: 0.8,
    fat: 19,
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "oreo-ic",
    name: "Oreo Ice Cream",
    description:
      "Unbelievably creamy Oreo ice cream packed with crunchy cookies — a decadent treat with 20g of protein and zero added sugar. You'd never guess it's healthy.",
    price: 29,
    category: "Desserts",
    calories: 237,
    protein: 20,
    carbs: 7.9,
    fat: 8.4,
    badges: ["Keto", "Zero Added Sugar", "20g Protein"],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description:
      "Enjoy the taste of your super yummy & super creamy tiramisu in its authentic flavor. You'll never know it was healthy.",
    price: 29,
    category: "Desserts",
    calories: 282,
    protein: 20,
    carbs: 4,
    fat: 21,
    badges: ["Keto", "Gluten Free", "20g Protein"],
  },
  {
    id: "protein-brownie",
    name: "Protein Brownie",
    description: "Fudgy chocolate protein bombs! Loaded with 20g protein. Guilt-free richness that fuels gains.",
    price: 29,
    category: "Desserts",
    protein: 20,
    badges: ["20g Protein"],
  },
  {
    id: "kinder-ic",
    name: "Kinder Ice Cream",
    description: "Creamy, rich Kinder flavor you love — now zero sugar.",
    price: 29,
    category: "Desserts",
    calories: 187,
    protein: 20,
    carbs: 5.6,
    fat: 11,
    badges: ["Bestseller", "Zero Sugar", "20g Protein"],
    bestseller: true,
  },
  {
    id: "strawberry-ic",
    name: "Strawberry Ice Cream",
    description:
      "The most delicious strawberry flavor and the creamiest yummy healthy ice cream. Everyone who tries it falls in love.",
    price: 29,
    category: "Desserts",
    calories: 187,
    protein: 20,
    carbs: 5.6,
    fat: 11,
    badges: ["Bestseller", "Zero Sugar", "20g Protein"],
    bestseller: true,
  },
  {
    id: "choc-ic",
    name: "Chocolate Ice Cream",
    description: "Unbelievably creamy, rich and sweet — you'll never believe it's healthy.",
    price: 29,
    category: "Desserts",
    calories: 187,
    protein: 20,
    carbs: 5.6,
    fat: 11,
    badges: ["Zero Sugar", "20g Protein"],
  },
  {
    id: "vanilla-ic",
    name: "Vanilla Ice Cream",
    description:
      "Creamy. Delicious. Guilt-free. Made with real Madagascan vanilla seeds. High in taste, low in sugar — pure joy in every scoop.",
    price: 29,
    category: "Desserts",
    calories: 187,
    protein: 20,
    carbs: 5.6,
    fat: 12,
    badges: ["Zero Sugar", "20g Protein"],
  },
  {
    id: "cheesecake",
    name: "Heavens Cheesecake — The Original",
    description:
      "Rich, creamy cheesecake — no sugar added, yet irresistibly delicious. A velvety blend of smooth, natural sweetness that leaves you craving more.",
    price: 29,
    category: "Cakes",
    calories: 240,
    protein: 9,
    carbs: 6,
    fat: 18,
    badges: ["No Added Sugar", "9g Protein"],
  },
  {
    id: "gathering-tiramisu",
    name: "Gathering Tiramisu",
    description:
      "A rich, creamy, guilt-free centerpiece the whole family will love. Zero sugar. High protein. Gluten-free. Keto-friendly. Our signature Heavens Tiramisu — now made for sharing.",
    price: 290,
    category: "Gathering Box",
    badges: ["Zero Sugar", "Keto", "Gluten Free"],
  },
  {
    id: "cookie-mix-small",
    name: "Chocolate Chip Cookie Mix (Small)",
    description:
      "Soft, rich, chocolatey cookies packed with protein and made with zero sugar and no gluten. Super easy to prepare and impossible to resist.",
    price: 62,
    category: "Heavens Mixes",
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "brownie-mix-small",
    name: "Brownie Mix (Small)",
    description:
      "Smooth, soft brownies with deep chocolate taste, packed with protein and made with zero sugar and no gluten. Easy to prepare, consistently perfect.",
    price: 62,
    category: "Heavens Mixes",
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "brownie-mix",
    name: "Brownie Mix",
    description:
      "Big flavor the smart way. Smooth, soft brownies with deep chocolate taste, packed with protein, zero sugar, gluten free.",
    price: 124,
    category: "Heavens Mixes",
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "cookie-mix",
    name: "Chocolate Chip Cookie Mix",
    description:
      "Soft, rich, chocolatey cookies packed with protein and made with zero sugar and no gluten. A smarter dessert without compromising on taste.",
    price: 124,
    category: "Heavens Mixes",
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "cookie-bites-24",
    name: "Heavens Cookie Bites Box (24pc)",
    description:
      "Packed with warm cookie crumble and rich chocolate melt. Perfect for sharing (or not). Gluten-free, keto, and zero added sugar, made with fresh ingredients.",
    price: 150,
    category: "Bites Boxes",
    calories: 1632,
    protein: 144,
    carbs: 4.8,
    fat: 120,
    perServing: { label: "bite", count: 24, calories: 68, protein: 6, carbs: 0.2, fat: 5 },
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "cookie-bites-16",
    name: "Heavens Cookie Bites Box (16pc)",
    description:
      "Packed with warm cookie crumble and rich chocolate melt. Perfect for sharing (or not). Gluten-free, keto, and zero added sugar, made with fresh ingredients.",
    price: 110,
    category: "Bites Boxes",
    calories: 1088,
    protein: 96,
    carbs: 3.2,
    fat: 80,
    perServing: { label: "bite", count: 16, calories: 68, protein: 6, carbs: 0.2, fat: 5 },
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "chess-bites-16",
    name: "Heavens Chess Bites Box (16pc)",
    description:
      "Perfect for sharing, a box full of warm cookie crumble and rich chocolate melt in every bite (sharing is optional, we won't judge). All bites are keto & gluten free with zero added sugar, made with fresh ingredients.",
    note: "Per brownie bite: 72 cal · 5g protein · 4.75g fat · 0.75g net carbs. Per cookie bite: 68 cal · 6g protein · 5g fat · 0.2g net carbs. Box contains 8 brownie + 8 cookie bites.",
    price: 130,
    category: "Bites Boxes",
    calories: 1120,
    protein: 88,
    carbs: 7.6,
    fat: 78,
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "chess-bites-24",
    name: "Heavens Chess Bites Box (24pc)",
    description:
      "Perfect for sharing, a box full of warm cookie crumble and rich chocolate melt in every bite (sharing is optional, we won't judge). All bites are keto & gluten free with zero added sugar, made with fresh ingredients.",
    note: "Per brownie bite: 72 cal · 5g protein · 4.75g fat · 0.75g net carbs. Per cookie bite: 68 cal · 6g protein · 5g fat · 0.2g net carbs. Box contains 12 brownie + 12 cookie bites.",
    price: 170,
    category: "Bites Boxes",
    calories: 1680,
    protein: 132,
    carbs: 11.4,
    fat: 117,
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
].map((p) => {
  const gallery = GALLERIES[p.id] ?? [];
  return { ...p, image: gallery[0], images: gallery };
}) as Product[];

export const categories: Array<"All" | Category> = [
  "All",
  "Desserts",
  "Bites Boxes",
  "Heavens Mixes",
  "Cakes",
  "Gathering Box",
];
