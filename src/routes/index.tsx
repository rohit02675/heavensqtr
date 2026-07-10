import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { products, categories, type Product } from "@/lib/products";
import { ChevronDown, ShoppingBag, Instagram, X } from "lucide-react";
import logoSrc from "@/assets/heavens-logo.png";

const INSTAGRAM_URL =
  "https://www.instagram.com/heavens.qtr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const ORDER_LINKS = {
  snoonu: "https://snoonu.com/restaurants/heavens-doha?source=global%20search",
  talabat: "https://www.talabat.com/qatar/heavens-doha-for-preparing-pies",
  keeta: "https://url-eu.mykeeta.com/ifHwaexz",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heavens Doha — High-Protein Desserts, Zero Compromise" },
      {
        name: "description",
        content:
          "Premium protein desserts in Doha. Ice creams, brownies, cookies & tiramisu — zero added sugar, high protein.",
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

// Slider bounds — chosen so extremes yield 0 matches (min>maxProtein or max<minCal)
const MAX_CAL = 300;
const MAX_PROTEIN = 25;

function Index() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [maxCal, setMaxCal] = useState(MAX_CAL);
  const [minProtein, setMinProtein] = useState(0);
  const [sort, setSort] = useState<SortKey>("default");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (p.calories > maxCal) return false;
      if (p.protein < minProtein) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "protein-desc") sorted.sort((a, b) => b.protein - a.protein);
    else if (sort === "calories-asc") sorted.sort((a, b) => a.calories - b.calories);
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }, [cat, maxCal, minProtein, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <section id="menu" className="relative mx-auto max-w-6xl px-4 pb-32 pt-12 md:px-8">
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={() => setSelected(p)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-24 text-center text-muted-foreground animate-float-up">
            No items match your filters. Loosen them up.
          </div>
        )}
      </section>
      <OrderDeck />
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
      className="object-contain transition-transform duration-500 hover:scale-105"
      style={{ height: size, width: "auto" }}
    />
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
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

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 md:px-8 md:pt-28 md:pb-32">
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
          High-protein, zero added sugar indulgence — crafted in Doha for athletes, aesthetes, and
          anyone who refuses to compromise on taste.
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
          Slide the filters, sort by your goal, and tap any dessert for the full nutrition story.
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
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 md:text-sm ${
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
        <SliderInput
          label="Max Calories"
          value={maxCal}
          min={0}
          max={MAX_CAL}
          step={5}
          suffix="kcal"
          onChange={setMaxCal}
        />
        <SliderInput
          label="Min Protein"
          value={minProtein}
          min={0}
          max={MAX_PROTEIN}
          step={0.5}
          suffix="g"
          onChange={setMinProtein}
        />
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold"
          >
            <option value="default">Featured</option>
            <option value="protein-desc">Highest Protein</option>
            <option value="calories-asc">Lowest Calories</option>
            <option value="price-asc">Lowest Price</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Showing <span className="text-foreground font-semibold">{count}</span>{" "}
        {count === 1 ? "item" : "items"}
      </div>
    </div>
  );
}

function SliderInput(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (n: number) => void;
}) {
  const pct = ((props.value - props.min) / (props.max - props.min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {props.label}
        </label>
        <span className="text-sm font-semibold text-foreground">
          {props.value}
          {props.suffix}
        </span>
      </div>
      <input
        type="range"
        className="heavens-range w-full"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${pct}%, oklch(0.28 0.02 55) ${pct}%, oklch(0.28 0.02 55) 100%)`,
        }}
      />
    </div>
  );
}

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 animate-float-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold-foreground">
            Bestseller
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold tracking-tight">{product.name}</h3>
          <span className="whitespace-nowrap text-sm font-semibold text-gold">
            {product.price} QR
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4 grid grid-cols-4 gap-1.5 text-center text-[10px] uppercase tracking-wider">
          <Macro label="Cal" value={product.calories} />
          <Macro label="Protein" value={`${product.protein}g`} />
          <Macro label="Carbs" value={`${product.carbs}g`} />
          <Macro label="Fat" value={`${product.fat}g`} />
        </div>
      </div>
    </button>
  );
}

function Macro({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 py-2">
      <div className="text-[13px] font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-muted-foreground">{label}</div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-fade-bg"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card animate-modal-pop md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex md:w-1/2 md:flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-background md:aspect-auto md:flex-1">
            <img
              src={product.images[imgIdx] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 p-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                    i === imgIdx ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 md:w-1/2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold">
              {product.category}
            </div>
            <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
              {product.name}
            </h3>
            <div className="mt-1 text-sm text-muted-foreground">Net weight: {product.weight}</div>
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>

          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Nutrition — whole pack
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-wider">
              <Macro label="Cal" value={product.calories} />
              <Macro label="Protein" value={`${product.protein}g`} />
              <Macro label="Carbs" value={`${product.carbs}g`} />
              <Macro label="Fat" value={`${product.fat}g`} />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gold"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-xl font-semibold text-gold">{product.price} QR</span>
            <a
              href="#order-deck"
              onClick={onClose}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold transition hover:scale-[1.04]"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderDeck() {
  const items: { name: string; href: string; bg: string }[] = [
    { name: "Snoonu", href: ORDER_LINKS.snoonu, bg: "var(--color-snoonu)" },
    { name: "Talabat", href: ORDER_LINKS.talabat, bg: "var(--color-talabat)" },
    { name: "Keeta", href: ORDER_LINKS.keeta, bg: "var(--color-keeta)" },
  ];
  return (
    <section id="order-deck" className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Order in one tap.
      </h2>
      <p className="mt-2 text-muted-foreground">Delivered fresh across Doha.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <a
            key={it.name}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center rounded-2xl border border-border bg-card/60 p-6 text-lg font-semibold transition-all hover:-translate-y-1 hover:border-gold/40"
          >
            <span style={{ color: it.bg }}>{it.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
      <div className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Say hi.
        </h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Questions, catering, or gathering boxes — reach out on Instagram.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-gold transition hover:scale-[1.04]"
        >
          <Instagram className="h-4 w-4" /> @heavens.qtr
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Heavens Doha. All rights reserved.
    </footer>
  );
}
