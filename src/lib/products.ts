import cookieBitesA from "@/assets/products/gallery/cookie-bites-a.png";
import cookieBitesB from "@/assets/products/gallery/cookie-bites-b.png";
import proteinBrownie from "@/assets/products/gallery/protein-brownie-a.png";
import tiramisu from "@/assets/products/gallery/tiramisu-a.png";
import oreoIc from "@/assets/products/gallery/oreo-ic-a.png";
import vanillaIc from "@/assets/products/gallery/vanilla-ic-a.png";
import chocIc from "@/assets/products/gallery/choc-ic-a.png";
import kinderIc from "@/assets/products/gallery/kinder-ic-a.png";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  weight: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  badges: string[];
  bestseller?: boolean;
}

export const categories = [
  "All",
  "Ice Cream",
  "Brownies",
  "Cookies",
  "Tiramisu",
] as const;

export const products: Product[] = [
  {
    id: "cookie-bites",
    name: "Cookie Bites",
    description:
      "Premium high-protein cookie bites — bite-sized dough coated in low-sugar chocolate. Microwave for the yummiest results.",
    price: 45,
    category: "Cookies",
    image: cookieBitesA,
    images: [cookieBitesA, cookieBitesB],
    weight: "80g",
    calories: 272,
    protein: 23.9,
    carbs: 14.1,
    fat: 19.1,
    badges: ["High Protein", "Zero Added Sugar"],
    bestseller: true,
  },
  {
    id: "protein-brownie",
    name: "Protein Brownies",
    description:
      "Rich, dense chocolate fudge brownie crafted with whey protein isolate and zero refined sugars.",
    price: 22,
    category: "Brownies",
    image: proteinBrownie,
    images: [proteinBrownie],
    weight: "80g",
    calories: 289,
    protein: 19.8,
    carbs: 7.8,
    fat: 19.8,
    badges: ["Whey Isolate", "Gluten Free"],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description:
      "Silky mascarpone layered with espresso-soaked sponge — high-protein, zero added sugar.",
    price: 29,
    category: "Tiramisu",
    image: tiramisu,
    images: [tiramisu],
    weight: "175g",
    calories: 282,
    protein: 21,
    carbs: 21,
    fat: 13,
    badges: ["High Protein", "Zero Added Sugar"],
  },
  {
    id: "oreo-ic",
    name: "Oreo Ice Cream",
    description:
      "Cookies-and-cream indulgence, slow-churned with whey isolate. Zero added sugar.",
    price: 25,
    category: "Ice Cream",
    image: oreoIc,
    images: [oreoIc],
    weight: "140g",
    calories: 257,
    protein: 20.8,
    carbs: 9,
    fat: 12.4,
    badges: ["High Protein", "Zero Added Sugar"],
    bestseller: true,
  },
  {
    id: "vanilla-ic",
    name: "Vanilla Ice Cream",
    description:
      "Real Madagascar vanilla, slow-churned with whey isolate. Creamy without the guilt.",
    price: 25,
    category: "Ice Cream",
    image: vanillaIc,
    images: [vanillaIc],
    weight: "140g",
    calories: 187,
    protein: 19.8,
    carbs: 7.9,
    fat: 8.4,
    badges: ["High Protein", "Zero Added Sugar"],
  },
  {
    id: "choc-ic",
    name: "Chocolate Ice Cream",
    description:
      "Deep cocoa richness, slow-churned with whey isolate. Zero added sugar.",
    price: 25,
    category: "Ice Cream",
    image: chocIc,
    images: [chocIc],
    weight: "140g",
    calories: 187,
    protein: 19.8,
    carbs: 7.9,
    fat: 8.4,
    badges: ["High Protein", "Zero Added Sugar"],
  },
  {
    id: "kinder-ic",
    name: "Kinder Ice Cream",
    description:
      "Kinder chocolate flavor, slow-churned with whey isolate. Zero added sugar.",
    price: 25,
    category: "Ice Cream",
    image: kinderIc,
    images: [kinderIc],
    weight: "140g",
    calories: 187,
    protein: 19.8,
    carbs: 7.9,
    fat: 8.4,
    badges: ["High Protein", "Zero Added Sugar"],
  },
];
