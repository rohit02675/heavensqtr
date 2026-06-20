export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  image?: string;
  images?: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  badges: string[];
  bestseller?: boolean;
  note?: string;
}

export const categories = [
  "All",
  "Ice Cream",
  "Brownies",
  "Cookies",
  "Cakes & Tiramisu",
] as const;

export const products: Product[] = [
  {
    id: "heavens-cookie-bites",
    name: "Heavens Cookie Bites",
    description: "Premium, bite-sized high-protein cookie dough items coated seamlessly with custom low-sugar chocolate bases.",
    price: 45,
    category: "Cookies",
    calories: 38,
    protein: 3,
    carbs: 2.4,
    fat: 1.8,
    badges: ["High Protein", "Sugar Free", "Keto"],
    bestseller: true,
    note: "Nutritional content listed reflects values on a singular per-bite scale."
  },
  {
    id: "protein-brownie-blast",
    name: "Fudge Protein Brownie",
    description: "Rich, dense chocolate fudge brownie crafted with ultra-pure whey protein isolate and completely zero refined sugars.",
    price: 22,
    category: "Brownies",
    calories: 180,
    protein: 16,
    carbs: 12,
    fat: 6,
    badges: ["Whey Isolate", "Gluten Free"],
    bestseller: false
  },
  {
    id: "macro-ice-cream-vanilla",
    name: "Aesthetic Vanilla Bean Cream",
    description: "Creamy, slow-churned premium high-protein ice cream loaded up with real Madagascar vanilla pods.",
    price: 18,
    category: "Ice Cream",
    calories: 120,
    protein: 14,
    carbs: 8,
    fat: 2,
    badges: ["Low Fat", "High Protein"],
    bestseller: true
  }
];