// All product imagery uses user-provided gallery shots (PNG).
import gBrownieBites24 from "@/assets/products/gallery/brownie-bites-24-a.png";
import gBrownieMini12 from "@/assets/products/gallery/brownie-mini-12-a.png";
import gMadeleines from "@/assets/products/gallery/madeleines-a.png";
import gProteinBombMini from "@/assets/products/gallery/protein-bomb-mini-a.png";
import gCookieBites from "@/assets/products/gallery/cookie-bites-a.png";
import gTiramisu from "@/assets/products/gallery/tiramisu-a.png";
import gProteinBrownie from "@/assets/products/gallery/protein-brownie-a.png";
import gKinderIc from "@/assets/products/gallery/kinder-ic-a.png";
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

export type Category = "Desserts" | "Bites Boxes" | "Heavens Mixes" | "Cakes" | "Gathering Box";

export interface PerServing {
  label: string; // e.g. "bite", "piece", "serving", "cookie"
  count: number; // number of servings/bites per product
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
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
  // Optional per-bite / per-serving breakdown shown on the detail card
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
  "cookie-bites": [gCookieBites],
  "tiramisu": [gTiramisu],
  "protein-brownie": [gProteinBrownie],
  "kinder-ic": [gKinderIc],
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
};

export const products: Product[] = [
  {
    id: "brownie-bites-24",
    name: "Brownie Bites Box (24pc)",
    description:
      "Deliciously rich, fudgy brownie bites made with the finest Valrhona chocolate. Soft, sweet, and indulgent — ideal for sharing.",
    note: "Per bite: 72 cal · 5g protein · 4.75g fat · 0.75g net carbs. Keto-friendly and gluten-free.",
    price: 144,
    oldPrice: 174,
    category: "Bites Boxes",
    calories: 72,
    protein: 5,
    carbs: 0.75,
    fat: 4.75,
    badges: ["Keto", "Gluten Free", "20% Off"],
  },
  {
    id: "brownie-mini-12",
    name: "Brownie Mini Box (12pc)",
    description:
      "Fudgy chocolate brownie bites packed with rich, decadent flavor in every single piece.",
    note: "Per bite: 72 cal · 5g protein · 4.75g fat · 0.75g net carbs.",
    price: 180,
    category: "Bites Boxes",
    calories: 72,
    protein: 5,
    carbs: 0.75,
    fat: 4.75,
    badges: ["Keto", "Gluten Free"],
  },
  {
    id: "madeleines",
    name: "Heavens Chocolate Madeleines",
    description:
      "Guilt-free indulgence. 4 fluffy, chocolatey madeleines per cup — sugar-free, gluten-free.",
    note: "Per piece: 55 cal · 5g protein. 20g protein per cup. Sweet, soft, and packed with protein.",
    price: 29,
    category: "Desserts",
    calories: 55,
    protein: 5,
    carbs: 0,
    fat: 0,
    badges: ["Sugar Free", "Gluten Free", "20g Protein / Cup"],
  },
  {
    id: "protein-bomb-mini",
    name: "Protein Bomb (Mini)",
    description:
      "Tastes like cookies, fuels like protein. Rich chocolate chip cookie flavor in every bite-sized ball.",
    note: "100 cal · 10g protein · 2g fiber · zero added sugar. Feels like a treat, acts like fuel.",
    price: 15,
    category: "Desserts",
    calories: 100,
    protein: 10,
    carbs: 2,
    fat: 0,
    badges: ["Zero Added Sugar", "10g Protein"],
  },
  {
    id: "cookie-bites",
    name: "Heavens Cookie Bites",
    description:
      "Warm cookie crumble and rich chocolate melt in every bite. Made with fresh ingredients.",
    note: "Per piece: 68 cal · 6g protein · 5g fat · 0.2g net carbs. Gluten-free, keto, zero added sugar.",
    price: 29,
    category: "Desserts",
    calories: 68,
    protein: 6,
    carbs: 0.2,
    fat: 5,
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description:
      "Super yummy & super creamy tiramisu in its authentic flavor. You'd never know it was healthy.",
    note: "282 cal · 20g protein · 21g fat · 4g carbs. Keto-friendly · gluten free.",
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
    description: "Fudgy chocolate protein bombs. Guilt-free richness that fuels gains.",
    note: "289 cal · 20g protein · 12g fat · 5g carbs.",
    price: 29,
    category: "Desserts",
    calories: 289,
    protein: 20,
    carbs: 5,
    fat: 12,
    badges: ["20g Protein", "Zero Added Sugar"],
  },
  {
    id: "kinder-ic",
    name: "Kinder Ice Cream",
    description: "Creamy, rich Kinder flavor you love — now zero sugar.",
    note: "187 cal · 20g protein · 11g fat · 5.6g carbs · zero sugar added.",
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
    description: "The most delicious strawberry flavor — creamy, yummy, healthy.",
    note: "187 cal · 20g protein · 11g fat · 5.6g carbs · zero sugar added.",
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
    note: "187 cal · 20g protein · 11g fat · 5.6g carbs · zero sugar added.",
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
    note: "187 cal · 20g protein · 12g fat · 5.6g carbs · zero sugar added.",
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
    note: "9g protein per serving · zero sugar added.",
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
      "A rich, creamy, guilt-free centerpiece the whole family will love. Our signature Heavens Tiramisu — now made for sharing.",
    note: "Zero sugar · high protein · gluten-free · keto-friendly. 282 cal · 20g protein · 21g fat · 4g carbs per serving.",
    price: 290,
    category: "Gathering Box",
    calories: 282,
    protein: 20,
    carbs: 4,
    fat: 21,
    badges: ["Zero Sugar", "Keto", "Gluten Free"],
  },
  {
    id: "cookie-mix-small",
    name: "Chocolate Chip Cookie Mix (Small)",
    description:
      "Soft, rich, chocolatey cookies packed with protein and made with zero sugar and no gluten. Super easy to prepare and impossible to resist.",
    note: "Gluten free · zero sugar · high protein · low calorie. Try it once… you'll keep coming back for more.",
    price: 62,
    category: "Heavens Mixes",
    calories: 120,
    protein: 8,
    carbs: 3,
    fat: 6,
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "brownie-mix-small",
    name: "Brownie Mix (Small)",
    description:
      "Smooth, soft brownies with deep chocolate taste, packed with protein and made with zero sugar and no gluten. Easy to prepare, consistently perfect.",
    note: "Gluten free · zero sugar · high protein · low calorie. Ideal for fitness lovers and dieters.",
    price: 62,
    category: "Heavens Mixes",
    calories: 130,
    protein: 8,
    carbs: 3,
    fat: 7,
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "brownie-mix",
    name: "Brownie Mix",
    description:
      "Big flavor the smart way. Smooth, soft brownies with deep chocolate taste, packed with protein, zero sugar, gluten free.",
    note: "Gluten free · zero sugar · high protein · low calorie. One bite… and you'll want more.",
    price: 124,
    category: "Heavens Mixes",
    calories: 130,
    protein: 8,
    carbs: 3,
    fat: 7,
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "cookie-mix",
    name: "Chocolate Chip Cookie Mix",
    description:
      "Soft, rich, chocolatey cookies packed with protein and made with zero sugar and no gluten. A smarter dessert without compromising on taste.",
    note: "Gluten free · zero sugar · high protein · low calorie.",
    price: 124,
    category: "Heavens Mixes",
    calories: 120,
    protein: 8,
    carbs: 3,
    fat: 6,
    badges: ["Zero Sugar", "Gluten Free", "High Protein"],
  },
  {
    id: "cookie-bites-24",
    name: "Heavens Cookie Bites Box (24pc)",
    description:
      "Packed with warm cookie crumble and rich chocolate melt. Perfect for sharing (or not). Made with fresh ingredients.",
    note: "Per bite: 68 cal · 6g protein · 5g fat · 0.2g net carbs. Gluten-free · keto · zero added sugar.",
    price: 150,
    category: "Bites Boxes",
    calories: 68,
    protein: 6,
    carbs: 0.2,
    fat: 5,
    badges: ["Keto", "Gluten Free", "Zero Added Sugar"],
  },
  {
    id: "cookie-bites-16",
    name: "Heavens Cookie Bites Box (16pc)",
    description:
      "Packed with warm cookie crumble and rich chocolate melt. Perfect for sharing (or not). Made with fresh ingredients.",
    note: "Per bite: 68 cal · 6g protein · 5g fat · 0.2g net carbs. Gluten-free · keto · zero added sugar.",
    price: 110,
    category: "Bites Boxes",
    calories: 68,
    protein: 6,
    carbs: 0.2,
    fat: 5,
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
