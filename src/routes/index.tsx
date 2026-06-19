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
  const [maxCal, setMaxCal] = useState(3000);
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

        <div
          className="mt-16 grid max-w-3xl grid-cols-3 gap-4 md:gap-6 animate-float-up"
          style={{ animationDelay: "320ms" }}
        >
          <Stat icon={<Dumbbell className="h-4 w-4" />} value="20g" label="Protein per serving" />
          <Stat icon={<Flame className="h-4 w-4" />} value="≤187" label="Calories" />
          <Stat icon={<Leaf className="h-4 w-4" />} value="0g" label="Added sugar" />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card/50 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-gold/40 hover:bg-card">
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      </div>
      <div className="mt-2 font-display text-3xl font-semibold">{value}</div>
    </div>
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
        <Slider label="Max Calories" value={maxCal} min={50} max={300} step={5} unit="kcal" onChange={setMaxCal} />
        <Slider label="Min Protein" value={minProtein} min={0} max={25} step={1} unit="g" onChange={setMinProtein} />
        <div className="flex flex-wrap items-center gap-2">
          <SortChip active={sort === "protein-desc"} onClick={() => setSort("protein-desc")}>Highest Protein</SortChip>
          <SortChip active={sort === "calories-asc"} onClick={() => setSort("calories-asc")}>Lowest Calories</SortChip>
          <SortChip active={sort === "price-asc"} onClick={() => setSort("price-asc")}>Lowest Price</SortChip>
          <SortChip active={sort === "default"} onClick={() => setSort("default")}>Default</SortChip>
        </div>
      </div>
      <div className="mt-5 text-xs text-muted-foreground">
        Showing <span className="font-semibold text-gold">{count}</span> products
      </div>
    </div>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-display text-sm font-semibold text-gold">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="heavens-range w-full"
        style={{ background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${pct}%, var(--input) ${pct}%, var(--input) 100%)` }}
      />
    </label>
  );
}

function SortChip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
        active
          ? "border-gold bg-gold/10 text-gold"
          : "border-border bg-background/40 text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({
  product, index, onOpen,
}: { product: Product; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group animate-float-up text-left"
      style={{ animationDelay: `${Math.min(index * 45, 500)}ms` }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-gold">
        {/* shimmer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-y-0 -left-1/4 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-shimmer" />
        </div>

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {product.bestseller && (
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                Bestseller
              </span>
            )}
            {product.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="my-6 flex flex-1 items-center justify-center">
          <DessertGlyph name={product.name} image={product.image} />
        </div>

        <h3 className="relative font-display text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>

        <div className="relative mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-gold">{product.price}</span>
            <span className="text-xs text-muted-foreground">QR</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
            )}
          </div>
          <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold transition group-hover:bg-gold group-hover:text-gold-foreground">
            View
          </span>
        </div>
      </div>
    </button>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const gallery = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : [];
  const [activeIdx, setActiveIdx] = useState(0);
  const active = gallery[activeIdx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 animate-fade-bg"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-gold/30 bg-card shadow-card animate-modal-pop">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition hover:bg-gold hover:text-gold-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* IMAGE + GALLERY */}
          <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-card to-background p-6 md:min-h-[560px] md:p-8">
            <div className="absolute inset-0 bg-noise opacity-50" />
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-gold/15 blur-3xl" />
              {active ? (
                <img
                  key={active}
                  src={active}
                  alt={product.name}
                  className="relative h-64 w-64 rounded-2xl object-cover shadow-card ring-2 ring-gold/30 animate-float-up md:h-80 md:w-80"
                />
              ) : (
                <div className="relative grid h-64 w-64 place-items-center rounded-2xl bg-gradient-to-br from-gold/20 to-transparent text-8xl md:h-80 md:w-80">
                  🍩
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="relative mt-5 flex flex-wrap items-center justify-center gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      i === activeIdx
                        ? "border-gold scale-105 shadow-gold"
                        : "border-border/60 opacity-70 hover:opacity-100 hover:border-gold/50"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {product.bestseller && (
              <span className="absolute left-6 top-6 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground shadow-gold">
                Bestseller
              </span>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              {product.category}
            </div>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-tight">{product.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

            {product.note && (
              <div className="mt-3 rounded-xl border border-gold/30 bg-gold/5 p-3 text-xs leading-relaxed text-foreground/90">
                <span className="font-bold uppercase tracking-wider text-gold">Note · </span>
                {product.note}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-gold">{product.price}</span>
              <span className="text-sm text-muted-foreground">QR</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice} QR</span>
              )}
            </div>

            {/* Nutrition */}
            <div className="mt-6 rounded-2xl border-2 border-foreground/80 bg-background/40 p-4">
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em]">Nutrition Facts</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Whole {product.category === "Bites Boxes" ? "box" : product.category === "Gathering Box" ? "box" : "item"}
                </div>
              </div>
              <div className="mt-2 border-b-4 border-foreground/80" />
              <div className="mt-2 space-y-1 text-sm">
                <NRow label="Calories" value={`${product.calories ?? "—"}`} bold />
                <NRow label="Protein" value={`${product.protein ?? "—"}g`} highlight />
                <NRow label="Net Carbs" value={`${product.carbs ?? "—"}g`} />
                <NRow label="Fat" value={`${product.fat ?? "—"}g`} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Macro label="Protein" value={product.protein ?? 0} />
                <Macro label="Carbs" value={product.carbs ?? 0} />
                <Macro label="Fat" value={product.fat ?? 0} />
              </div>

              {product.perServing && (
                <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                      Per {product.perServing.label}
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {product.perServing.count} {product.perServing.label}
                      {product.perServing.count === 1 ? "" : "s"} per pack
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {product.perServing.calories != null && (
                      <NRow label="Calories" value={`${product.perServing.calories}`} />
                    )}
                    {product.perServing.protein != null && (
                      <NRow label="Protein" value={`${product.perServing.protein}g`} highlight />
                    )}
                    {product.perServing.carbs != null && (
                      <NRow label="Net Carbs" value={`${product.perServing.carbs}g`} />
                    )}
                    {product.perServing.fat != null && (
                      <NRow label="Fat" value={`${product.perServing.fat}g`} />
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Order now on
              </div>
              <OrderDeck />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NRow({ label, value, bold, highlight }: { label: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1">
      <span className={`text-muted-foreground ${bold ? "font-bold text-foreground" : ""}`}>{label}</span>
      <span className={`font-display font-semibold ${highlight ? "text-gold" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

function Macro({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-2 text-center">
      <div className="font-display text-base font-semibold text-gold">
        {value}<span className="text-[10px] text-muted-foreground">g</span>
      </div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function DessertGlyph({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      <div className="relative grid h-40 w-40 place-items-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/25 via-gold/5 to-transparent blur-2xl" />
        <div className="absolute inset-1 rounded-full border border-gold/20" />
        <img
          src={image}
          alt={name}
          className="relative h-36 w-36 rounded-full object-cover shadow-card ring-1 ring-white/10"
          loading="lazy"
        />
      </div>
    );
  }
  const n = name.toLowerCase();
  const glyph = n.includes("ice cream") ? "🍦" : n.includes("brownie") ? "🍫"
    : n.includes("cookie") ? "🍪" : n.includes("madeleine") ? "🧁"
    : n.includes("cheesecake") ? "🍰" : n.includes("tiramisu") ? "🍮"
    : n.includes("mix") ? "🥣" : "🍩";
  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-gold/20 via-gold/5 to-transparent transition-transform duration-500 group-hover:scale-110">
      <div className="absolute inset-2 rounded-full border border-gold/20" />
      <div className="text-6xl drop-shadow-[0_0_24px_oklch(0.78_0.135_75/0.5)]">{glyph}</div>
    </div>
  );
}

function OrderDeck({ large = false }: { large?: boolean }) {
  const pad = large ? "py-4 text-sm" : "py-3 text-xs";
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <OrderLink href={ORDER_LINKS.snoonu} bg="#ff00b8" color="#fff" pad={pad}>Snoonu</OrderLink>
      <OrderLink href={ORDER_LINKS.talabat} bg="#ff5a00" color="#fff" pad={pad}>Talabat</OrderLink>
      <OrderLink href={ORDER_LINKS.keeta} bg="#ffd400" color="#1a1a1a" pad={pad}>Keeta</OrderLink>
    </div>
  );
}

function OrderLink({
  href, bg, color, pad, children,
}: { href: string; bg: string; color: string; pad: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group/btn relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-3 ${pad} font-bold uppercase tracking-wider transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.6)]`}
      style={{ backgroundColor: bg, color }}
    >
      <span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
      />
      <span className="relative">Order on {children}</span>
    </a>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-border bg-gradient-to-b from-background to-card/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="animate-float-up">
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold">Call · Follow</div>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Get in touch.
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Reach out for orders, gatherings, or anything sweet on your mind.
            </p>

            <div className="mt-8 space-y-4">
              <ContactRow icon={<Clock className="h-5 w-5" />} label="Hours" value="Open daily · until 10:00 PM" />
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Contact Number" value="xxxxxxxx" />
              <ContactRow
                icon={<Instagram className="h-5 w-5" />}
                label="Instagram"
                value="@heavens.qtr"
                href={INSTAGRAM_URL}
              />
            </div>
          </div>

          <div
            id="order-deck"
            className="animate-float-up rounded-3xl border border-gold/30 bg-card/60 p-6 backdrop-blur md:p-10"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold">Order Now</div>
                <div className="font-display text-xl font-semibold">Pick your delivery</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Direct links to our official storefronts on every major delivery platform in Qatar.
            </p>
            <div className="mt-6">
              <OrderDeck large />
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              Tap any logo above to open Heavens Doha on that app.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon, label, value, href,
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-gold/40">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-gold-foreground">
        {icon}
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="font-display text-base font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner;
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Logo size={44} />
            <div>
              <div className="font-display text-xl font-semibold">
                Heavens <span className="text-gold">Doha</span>
              </div>
              <p className="text-xs text-muted-foreground">High-protein desserts.</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Heavens Doha. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
