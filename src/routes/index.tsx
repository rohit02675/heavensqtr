import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { products, categories, type Product } from "@/lib/products";
import {
  Flame,
  Dumbbell,
  Leaf,
  ChevronDown,
  ShoppingBag,
  Phone,
  Clock,
  Instagram,
  X,
} from "lucide-react";
import logoSrc from "@/assets/heavens-logo.png";

const INSTAGRAM_URL =
  "https://www.instagram.com/heavens.qtr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heavens Doha — High-Protein Desserts, Zero Compromise" },
      {
        name: "description",
        content:
          "Premium protein desserts in Doha. Ice creams, brownies, cookies & cakes — zero sugar, high protein, keto-friendly.",
      },
      { property: "og:title", content: "Heavens Doha — Protein Desserts" },
      {
        property: "og:description",
        content: "Premium high-protein, zero-sugar desserts crafted in Doha.",
      },
    ],
  }),
  component: Index,
});

type SortKey = "default" | "protein-desc" | "calories-asc" | "price-asc";

const ORDER_LINKS = {
  snoonu: "https://snoonu.com/restaurants/heavens-doha?source=global%20search",
  talabat: "https://www.talabat.com/qatar/heavens-doha-for-preparing-pies",
  keeta: "https://url-eu.mykeeta.com/ifHwaexz",
};

function Index() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [maxCal, setMaxCal] = useState(250); 
  const [minProtein, setMinProtein] = useState(0);
  const [sort, setSort] = useState<SortKey>("default");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if ((p.calories ?? 0) > maxCal) return false;
      if ((p.protein ?? 0) < minProtein) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "protein-desc") sorted.sort((a, b) => (b.protein ?? 0) - (a.protein ?? 0));
    else if (sort === "calories-asc")
      sorted.sort((a, b) => (a.calories ?? 99999) - (b.calories ?? 99999));
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }, [cat, maxCal, minProtein, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <section id="menu" className="relative mx-auto max-w-7xl px-4 pb-32 pt-12 md:px-8">
        <SectionHeader />
        <Controls
          cat={cat}
          setCat={setCat}
          maxCal={maxCal}
          setMaxCal={setMaxCal}
          minProtein={minProtein}
          setMinProtein={setMinProtein}
          sort={sort}
          setSort={setSort}
          count={filtered.length}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onOpen={() => setSelected(p)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-24 text-center text-muted-foreground animate-float-up">
            No items match your filters. Try loosening them up.
          </div>
        )}
      </section>
      <Contact />
      <Footer />
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Logo({ size = 36 }: { size?: number }) {
  return (
    <img
      src={logoSrc}
      alt="Heavens Doha"
      height={size}
      className="object-contain transition-transform duration-500 hover:scale-105"
      style={{ height: size, width: "auto" }}
    />
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#" className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight">
          <Logo size={56} />
          <span className="hidden sm:inline">
            Heavens <span className="text-gold">Qtr</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#menu" className="transition-colors hover:text-foreground">Menu</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          <a href="#order-deck" className="transition-colors hover:text-foreground">Order</a>
        </nav>
        <a
          href="#order-deck"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold transition-transform hover:scale-[1.04]"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <ShoppingBag className="h-4 w-4" /> Order Now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-grid opacity-50"
        style={{ maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)" }}
      />
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 bg-noise opacity-50" />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 md:px-8 md:pt-28 md:pb-32">
        <div className="flex items-center gap-4 animate-float-up">
          <Logo size={96} />
        </div>

        <h1
          className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl animate-float-up"
          style={{ animationDelay: "80ms" }}
        >
          Desserts that <em className="not-italic text-gold text-glow">fuel gains</em>,
          <br className="hidden md:block" /> not guilt.
        </h1>
        <p
          className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg animate-float-up"
          style={{ animationDelay: "160ms" }}
        >
          High-protein, low-sugar, gluten-free indulgence. Crafted in Doha for athletes,
          aesthetes, and anyone who refuses to compromise on taste.
        </p>
        <div
          className="mt-10 flex flex-wrap items-center gap-3 animate-float-up"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition hover:scale-[1.04]"
          >
            Explore Menu <ChevronDown className="h-4 w-4" />
          </a>
          <a
            href="#order-deck"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-gold/50 hover:bg-card"
          >
            Order on Snoonu · Talabat · Keeta
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div id="about" className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div className="text-[11px] uppercase tracking-[0.24em] text-gold">The Menu</div>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Pick your macros.
        </h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Slide the filters, sort by your goal, and tap any dessert to see the full nutrition story.
        </p>
      </div>
    </div>
  );
}

function Controls(props: {
  cat: (typeof categories)[number];
  setCat: (c: (typeof categories)[number]) => void;
  maxCal: number;
  setMaxCal: (n: number) => void;
  minProtein: number;
  setMinProtein: (n: number) => void;
  sort: SortKey;
  setSort: (s: SortKey) => void;
  count: number;
}) {
  const { cat, setCat, maxCal, setMaxCal, minProtein, setMinProtein, sort, setSort, count } = props;
  return (
    <div className="mt-10 rounded-3xl border border-border bg-card/50 p-5 backdrop-blur md:p-7">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              cat === c
                ? "border-gold bg-gold text-gold-foreground shadow-gold"
                : "border-border bg-background/40 text-muted-foreground hover:-translate-y-0.5 hover:border-gold/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <Slider label="Max Calories" value