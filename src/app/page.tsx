"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JSZip from "jszip";
import {
  icons,
  type LucideIcon,
} from "lucide-react";
import {
  brandColors,
  semanticColors,
  themeTokens,
  spacingScale,
  radiusScale,
  iconSizes,
  iconNames,
  typographyRows,
  buildTokenMapGroups,
  buildTokenJSON,
  buildThemeCSS,
  buildFontsCSS,
  buildButtonTSX,
  buildBadgeTSX,
  buildCardTSX,
  buildCheckboxTSX,
  buildIndexTS,
  buildReadmeMD,
  formatBytes,
  logos,
  type NotaColor,
} from "@/lib/notaflow-data";

/* ---------------- helpers ---------------- */
const toPascal = (s: string) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

function getIcon(name: string): LucideIcon | undefined {
  return (icons as Record<string, LucideIcon>)[toPascal(name)];
}

function hexLum(h: string): number {
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/* ---------------- toast system ---------------- */
type ToastType = "success" | "error" | "warning" | "info";
type Toast = {
  id: number;
  type: ToastType;
  title: string;
  msg: string;
  duration: number;
};

const TOAST_ICONS: Record<ToastType, LucideIcon> = {
  success: getIcon("circle-check-big") as LucideIcon,
  error: getIcon("circle-x") as LucideIcon,
  warning: getIcon("triangle-alert") as LucideIcon,
  info: getIcon("info") as LucideIcon,
};

/* ---------------- copy helper ---------------- */
async function copyText(text: string, pushToast: (t: Omit<Toast, "id">) => void) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      pushToast({ type: "success", title: "Copied", msg: text, duration: 2500 });
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      pushToast({ type: "success", title: "Copied", msg: text, duration: 2500 });
    }
  } catch {
    pushToast({ type: "error", title: "Copy failed", msg: "Browser blocked copy.", duration: 4000 });
  }
}

/* ---------------- small inline icon helpers ---------------- */
const FileDownIcon = getIcon("file-down") as LucideIcon;
const DownloadIcon = getIcon("download") as LucideIcon;
const SearchIcon = getIcon("search") as LucideIcon;
const XIcon = getIcon("x") as LucideIcon;
const MenuIcon = getIcon("menu") as LucideIcon;
const SunIcon = getIcon("sun") as LucideIcon;
const MoonIcon = getIcon("moon") as LucideIcon;
const ChevronDownIcon = getIcon("chevron-down") as LucideIcon;
const CheckIcon = getIcon("check") as LucideIcon;
const CheckCircleIcon = getIcon("circle-check-big") as LucideIcon;
const AlertTriangleIcon = getIcon("triangle-alert") as LucideIcon;
const AlertCircleIcon = getIcon("circle-alert") as LucideIcon;
const TrendingUpIcon = getIcon("trending-up") as LucideIcon;
const TrendingDownIcon = getIcon("trending-down") as LucideIcon;

/* ===================================================================== */
export default function Home() {
  const [dark, setDark] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [iconFilter, setIconFilter] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>({
    4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true,
  });
  const [exporting, setExporting] = useState<null | "export" | "download">(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);

  const isDark = dark;

  /* ----- theme init ----- */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("notaflow-theme");
    } catch {
      /* ignore */
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved === "dark" || (!saved && prefersDark);
    setDark(useDark);
    if (useDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("notaflow-theme", next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  /* ----- scroll handler ----- */
  useEffect(() => {
    const onScroll = () => {
      setNavbarScrolled(window.scrollY > 80);
      const secs = ["foundations", "components", "token-map"];
      let act = "";
      for (const id of secs) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) act = id;
      }
      setActiveSection(act);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- lock body on drawer ----- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* ----- toasts ----- */
  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { ...t, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, t.duration);
  }, []);

  const dismissToast = (id: number) =>
    setToasts((prev) => prev.filter((x) => x.id !== id));

  /* ----- copy ----- */
  const copy = useCallback(
    (text: string) => copyText(text, pushToast),
    [pushToast]
  );

  /* ----- search index ----- */
  const searchIndex = useMemo(() => {
    const all = [...brandColors, ...semanticColors, ...themeTokens];
    const idx: { label: string; cat: string; hex?: string; target: string; type: string }[] = [];
    all.forEach((c) => {
      const hex = isDark ? c.dark : c.light;
      idx.push({ label: c.label || c.name, cat: c.cat, hex, target: "#sec-colors", type: "color" });
      idx.push({ label: hex.toUpperCase(), cat: c.cat, hex, target: "#sec-colors", type: "color" });
    });
    idx.push({ label: "Brand & Logos", cat: "Foundations", target: "#sec-logos", type: "section" });
    idx.push({ label: "Typography", cat: "Foundations", target: "#sec-typography", type: "section" });
    idx.push({ label: "Iconography", cat: "Foundations", target: "#sec-iconography", type: "section" });
    idx.push({ label: "Token Map", cat: "Export", target: "#token-map", type: "section" });
    iconNames.forEach((n) =>
      idx.push({ label: n, cat: "Icon", target: "#sec-iconography", type: "icon" })
    );
    return idx;
  }, [isDark]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 1) return [];
    return searchIndex
      .filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          (i.hex && i.hex.toLowerCase().includes(q))
      )
      .slice(0, 12);
  }, [searchQuery, searchIndex]);

  const onSearchSelect = (r: (typeof searchResults)[number]) => {
    if (r.type === "color" || r.type === "icon") copy(r.hex || r.label);
    else if (r.target) {
      document.querySelector(r.target)?.scrollIntoView({ behavior: "smooth" });
      setSearchFocused(false);
    }
  };

  /* ----- token map groups ----- */
  const tokenGroups = useMemo(() => buildTokenMapGroups(isDark), [isDark]);

  /* ----- export logic ----- */
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runExport = async () => {
    if (exporting) return;
    setExporting("export");
    pushToast({ type: "info", title: "Building bundle", msg: "Collecting design tokens, styles & logos...", duration: 3000 });
    try {
      const zip = new JSZip();
      zip.file("notaflow-tokens.json", JSON.stringify(buildTokenJSON(), null, 2));
      zip.file("theme.css", buildThemeCSS());
      zip.file("fonts.css", buildFontsCSS());

      // full component stylesheet (the "styles")
      let cssText = "";
      try {
        const res = await fetch("/notaflow.css");
        cssText = await res.text();
      } catch {
        cssText = buildThemeCSS() + "\n/* Full component CSS unavailable — see theme.css for tokens. */\n";
      }
      zip.file("notaflow.css", cssText);

      // brand logos
      const logoFolder = zip.folder("logos")!;
      logos.forEach((l) => logoFolder.file(l.file, l.svg));

      // README
      const fileCount = 4 + logos.length + 1; // tokens, theme, fonts, notaflow.css, logos, readme
      zip.file("README.md", buildReadmeMD(fileCount, logos.length));

      const blob = await zip.generateAsync({ type: "blob" });
      triggerDownload(blob, "notaflow-token-bundle.zip");
      pushToast({
        type: "success",
        title: "Bundle exported",
        msg: `notaflow-token-bundle.zip (${formatBytes(blob.size)}) — ${fileCount} files incl. styles + ${logos.length} logos.`,
        duration: 6000,
      });
    } catch (e) {
      pushToast({ type: "error", title: "Export failed", msg: (e as Error).message || "Unexpected error.", duration: 5000 });
    } finally {
      setExporting(null);
    }
  };

  const runDownload = async () => {
    if (exporting) return;
    setExporting("download");
    pushToast({ type: "info", title: "Preparing source", msg: "Packing tokens, styles, logos & React components...", duration: 3000 });
    try {
      const zip = new JSZip();
      const root = zip.folder("notaflow-design-system")!;
      root.file("notaflow-tokens.json", JSON.stringify(buildTokenJSON(), null, 2));
      root.file("theme.css", buildThemeCSS());
      root.file("fonts.css", buildFontsCSS());

      let cssText = "";
      try {
        const res = await fetch("/notaflow.css");
        cssText = await res.text();
      } catch {
        cssText = buildThemeCSS();
      }
      root.file("notaflow.css", cssText);

      const logoFolder = root.folder("logos")!;
      logos.forEach((l) => logoFolder.file(l.file, l.svg));

      const comp = root.folder("src")!.folder("app")!.folder("components")!.folder("notaflow")!;
      comp.file("Button.tsx", buildButtonTSX());
      comp.file("Badge.tsx", buildBadgeTSX());
      comp.file("Card.tsx", buildCardTSX());
      comp.file("Checkbox.tsx", buildCheckboxTSX());
      comp.file("index.ts", buildIndexTS());

      const fileCount = 4 + logos.length + 1 + 5;
      root.file("README.md", buildReadmeMD(fileCount, logos.length));

      const blob = await zip.generateAsync({ type: "blob" });
      triggerDownload(blob, "notaflow-design-system.zip");
      pushToast({
        type: "success",
        title: "Source downloaded",
        msg: `notaflow-design-system.zip (${formatBytes(blob.size)}) — ${fileCount} files incl. styles, logos & components.`,
        duration: 6000,
      });
    } catch (e) {
      pushToast({ type: "error", title: "Download failed", msg: (e as Error).message || "Unexpected error.", duration: 5000 });
    } finally {
      setExporting(null);
    }
  };

  /* ----- welcome toast ----- */
  useEffect(() => {
    const t = window.setTimeout(
      () =>
        pushToast({
          type: "info",
          title: "Welcome to Notaflow",
          msg: "Export bundles all styles, tokens & logos. Source adds React components.",
          duration: 5000,
        }),
      800
    );
    return () => window.clearTimeout(t);
  }, [pushToast]);

  /* =================================================================== */
  return (
    <div
      className="nf-scope"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* ---------------- Navbar ---------------- */}
      <nav
        ref={navbarRef}
        className={`nf-navbar${navbarScrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            width: "100%",
          }}
        >
          <a href="#hero" className="logo-text" style={{ flexShrink: 0 }}>
            Notaflow<span className="logo-dot">.</span>
          </a>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="#foundations" className={`nav-link${activeSection === "foundations" ? " active" : ""}`}>Foundations</a>
            <a href="#components" className={`nav-link${activeSection === "components" ? " active" : ""}`}>Components</a>
            <a href="#token-map" className={`nav-link${activeSection === "token-map" ? " active" : ""}`}>Token Map</a>
          </div>

          <div className="hide-mobile" style={{ position: "relative", flexShrink: 0 }}>
            <div className={`search-bar${searchQuery ? " has-query" : ""}`} style={{ width: 220 }}>
              <SearchIcon size={14} />
              <input
                type="text"
                placeholder="Search tokens, colors..."
                aria-label="Search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 150)}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  aria-label="Clear search"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchQuery("");
                  }}
                >
                  <XIcon size={10} />
                </button>
              )}
            </div>
            {searchFocused && searchQuery && (
              <div className="search-dropdown open">
                {searchResults.length === 0 ? (
                  <div className="search-dropdown-empty">No results for &ldquo;{searchQuery}&rdquo;</div>
                ) : (
                  searchResults.map((r, i) => (
                    <div
                      key={i}
                      className="search-dropdown-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onSearchSelect(r);
                      }}
                    >
                      <SearchIcon size={14} />
                      <span className="sd-label">{r.label}</span>
                      <span className="sd-cat">{r.cat}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button
              className={`btn btn-ghost btn-sm${exporting === "export" ? " loading" : ""}`}
              aria-label="Export bundle"
              disabled={!!exporting}
              onClick={runExport}
            >
              <span className="btn-spinner" />
              <FileDownIcon size={15} />
              Export
            </button>
            <button
              className={`btn btn-ghost btn-sm${exporting === "download" ? " loading" : ""}`}
              aria-label="Download source"
              disabled={!!exporting}
              onClick={runDownload}
            >
              <span className="btn-spinner" />
              <DownloadIcon size={15} />
              Source
            </button>
            <button
              className="theme-toggle"
              role="switch"
              aria-label="Toggle dark mode"
              aria-checked={dark}
              onClick={toggleTheme}
            >
              <span className="theme-toggle-knob">
                <SunIcon className="toggle-sun" size={11} />
                <MoonIcon className="toggle-moon" size={11} />
              </span>
            </button>
          </div>

          <div className="hide-desktop" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button className="theme-toggle" role="switch" aria-label="Toggle dark mode" aria-checked={dark} onClick={toggleTheme}>
              <span className="theme-toggle-knob">
                <SunIcon className="toggle-sun" size={11} />
                <MoonIcon className="toggle-moon" size={11} />
              </span>
            </button>
            <button className="btn btn-ghost btn-icon" aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ---------------- Mobile drawer ---------------- */}
      <div className={`drawer-overlay${drawerOpen ? " open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="drawer-bg" onClick={() => setDrawerOpen(false)} />
        <div className="drawer-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <span className="logo-text">Notaflow<span className="logo-dot">.</span></span>
            <button className="btn btn-ghost btn-icon" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
              <XIcon size={20} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 28 }}>
            <a href="#foundations" className="nav-link" onClick={() => setDrawerOpen(false)}>Foundations</a>
            <a href="#components" className="nav-link" onClick={() => setDrawerOpen(false)}>Components</a>
            <a href="#token-map" className="nav-link" onClick={() => setDrawerOpen(false)}>Token Map</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button className={`btn btn-outline${exporting === "export" ? " loading" : ""}`} style={{ width: "100%" }} disabled={!!exporting} onClick={runExport}>
              <span className="btn-spinner" />
              <FileDownIcon size={16} />
              Export Bundle
            </button>
            <button className={`btn btn-brand${exporting === "download" ? " loading" : ""}`} style={{ width: "100%" }} disabled={!!exporting} onClick={runDownload}>
              <span className="btn-spinner" />
              <DownloadIcon size={16} />
              Download Source
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- Hero ---------------- */}
      <section
        id="hero"
        className="noise-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(180deg,var(--secondary) 0%,var(--background) 80%)",
        }}
      >
        <div className="hero-glow" style={{ width: 300, height: 300, top: "10%", left: "5%" }} />
        <div className="hero-glow" style={{ width: 200, height: 200, bottom: "15%", right: "8%", opacity: 0.04 }} />
        <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 720 }}>
          <p className="overline" style={{ marginBottom: 16 }}>Design System v1.1</p>
          {/* Inline primary logo on the wine-aware hero */}
          <div
            style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
            dangerouslySetInnerHTML={{
              __html: logos[0].svg.replace('width="300" height="100"', 'width="260" height="86"'),
            }}
          />
          <p className="body-lg" style={{ color: "var(--muted-foreground)", maxWidth: 520, margin: "0 auto 40px" }}>
            Editorial Modern — sophisticated, warm, earthy, editorial-yet-functional.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <a href="#foundations" className="btn btn-brand btn-lg">Explore Foundations</a>
            <a href="#token-map" className="btn btn-outline btn-lg">View Token Map</a>
          </div>
        </div>
      </section>

      {/* ---------------- Main ---------------- */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        {/* ===== Foundations ===== */}
        <section id="foundations" className="section-sep" style={{ padding: "80px 0 64px" }}>
          <div style={{ marginBottom: 48 }}>
            <p className="overline" style={{ marginBottom: 8 }}>Part 01</p>
            <h2 className="h2-d">Foundations</h2>
            <p className="body" style={{ color: "var(--muted-foreground)", maxWidth: 560, marginTop: 8 }}>
              Core design tokens — brand assets, colors, typography, iconography, spacing, and radius.
            </p>
          </div>

          {/* ----- Brand & Logos ----- */}
          <div id="sec-logos" style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 8 }}>Brand &amp; Logos</h3>
            <p className="body-sm" style={{ color: "var(--muted-foreground)", marginBottom: 20 }}>
              The full SVG logo set — wordmarks, app icons and favicon. Every asset is bundled in the export. Click a tile to copy its SVG.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
              {logos.map((l) => (
                <div
                  key={l.id}
                  className="logo-tile"
                  title={`Click to copy ${l.file}`}
                  onClick={() => copy(l.svg)}
                >
                  <div
                    className="logo-tile-preview"
                    style={{
                      background: l.previewBg,
                      color: l.previewColor || "var(--foreground)",
                    }}
                    dangerouslySetInnerHTML={{ __html: l.svg }}
                  />
                  <div className="logo-tile-info">
                    <span className="logo-tile-name">{l.name}</span>
                    <span className="logo-tile-meta">{l.file}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ----- Color Palette ----- */}
          <div id="sec-colors" style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Color Palette</h3>
            <p className="overline" style={{ marginBottom: 16 }}>Brand Colors</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 48 }}>
              {brandColors.map((c) => <Swatch key={c.name} c={c} isDark={isDark} onCopy={copy} />)}
            </div>
            <p className="overline" style={{ marginBottom: 16 }}>Semantic Colors</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 48 }}>
              {semanticColors.map((c) => <Swatch key={c.name} c={c} isDark={isDark} onCopy={copy} />)}
            </div>
            <p className="overline" style={{ marginBottom: 16 }}>Theme Tokens (Light / Dark)</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
              {themeTokens.map((c) => <Swatch key={c.name} c={c} isDark={isDark} onCopy={copy} />)}
            </div>
          </div>

          {/* ----- Typography ----- */}
          <div id="sec-typography" style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Typography</h3>
            <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: 28, display: "flex", flexDirection: "column", gap: 40 }}>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Display H1 — Newsreader 600, clamp(36-56px)</p>
                <p className="h1-d">The Editorial Voice</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Display H2 — Newsreader 600, clamp(28-40px)</p>
                <p className="h2-d">Structural Hierarchy</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Display H3 — Newsreader 500, clamp(22-28px)</p>
                <p className="h3-d">Warmth in Every Detail</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Heading 4 — Newsreader 600, 20px</p>
                <p className="h4">Section Lead</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Body Large — Outfit 400, 18px</p>
                <p className="body-lg">Notaflow brings editorial sophistication to functional interfaces.</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Body — Outfit 400, 16px</p>
                <p className="body">Every token is designed to feel intentional and refined.</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Caption — Outfit 400, 12px</p>
                <p className="caption">Labels, timestamps, and metadata</p>
              </div>
              <div>
                <p className="caption" style={{ marginBottom: 6 }}>Overline — Outfit 600, 12px, uppercase, 0.08em</p>
                <p className="overline">Section Category</p>
              </div>
            </div>
          </div>

          {/* ----- Iconography ----- */}
          <div id="sec-iconography" style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Iconography</h3>
            <p className="body-sm" style={{ color: "var(--muted-foreground)", marginBottom: 20 }}>
              Lucide icons — 2px stroke. Click to copy name.
            </p>
            <div className="search-bar" style={{ maxWidth: 320, marginBottom: 16 }}>
              <SearchIcon size={14} />
              <input
                type="text"
                placeholder="Filter icons..."
                aria-label="Filter icons"
                value={iconFilter}
                onChange={(e) => setIconFilter(e.target.value)}
              />
            </div>
            <div className="icon-grid">
              {iconNames
                .filter((n) => !iconFilter || n.toLowerCase().includes(iconFilter.toLowerCase().trim()))
                .map((n) => {
                  const Icon = getIcon(n);
                  if (!Icon) return null;
                  return (
                    <div key={n} className="icon-item" title={`Click to copy: ${n}`} onClick={() => copy(n)}>
                      <Icon size={20} strokeWidth={2} />
                      <span>{n}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* ----- Spacing & Radius ----- */}
          <div id="sec-spacing" style={{ marginBottom: 32 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Spacing &amp; Radius</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <div>
                <p className="overline" style={{ marginBottom: 16 }}>Spacing Scale (4px base)</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {spacingScale.map((s) => (
                    <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--muted-foreground)", width: 72, flexShrink: 0 }}>space-{s.l}</span>
                      <div style={{ height: 20, width: s.v, background: "var(--primary)", borderRadius: "var(--radius-sm)", opacity: 0.35, minWidth: 4 }} />
                      <span className="caption">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="overline" style={{ marginBottom: 16 }}>Radius Scale</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {radiusScale.map((r) => (
                    <div key={r.l} className="nf-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px" }}>
                      <div style={{ width: 48, height: 48, border: "2px solid var(--primary)", borderRadius: r.v, opacity: 0.5 }} />
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted-foreground)" }}>radius-{r.l}</span>
                      <span className="caption">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Components ===== */}
        <section id="components" className="section-sep" style={{ padding: "80px 0 64px" }}>
          <div style={{ marginBottom: 48 }}>
            <p className="overline" style={{ marginBottom: 8 }}>Part 02</p>
            <h2 className="h2-d">Components</h2>
          </div>

          {/* Button */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Button</h3>
            <p className="overline" style={{ marginBottom: 12 }}>Variants</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <button className="btn btn-brand">Brand</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-outline">Outline</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-link">Link</button>
              <button className="btn btn-danger">Danger</button>
            </div>
            <p className="overline" style={{ marginBottom: 12 }}>Sizes</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <button className="btn btn-brand btn-sm">Small</button>
              <button className="btn btn-brand">Default</button>
              <button className="btn btn-brand btn-lg">Large</button>
            </div>
            <p className="overline" style={{ marginBottom: 12 }}>Brand Presentation — buttons on brand surface</p>
            <div className="noise-bg" style={{ background: "var(--wine)", borderRadius: "var(--radius-lg)", padding: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <span style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: 600, fontSize: 24, color: "#fff", marginRight: "auto" }}>
                Notaflow<span style={{ color: "var(--dust)" }}>.</span>
              </span>
              <button className="btn btn-inverted">Get Started</button>
              <button className="btn btn-on-brand">Learn More</button>
            </div>
            <p className="overline" style={{ marginBottom: 12 }}>Loading</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <button className="btn btn-brand loading" disabled><span className="btn-spinner" />Exporting</button>
              <button className="btn btn-outline loading" disabled><span className="btn-spinner" />Loading</button>
              <button className="btn btn-danger loading" disabled><span className="btn-spinner" />Deleting</button>
            </div>
            <p className="overline" style={{ marginBottom: 12 }}>Disabled</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
              <button className="btn btn-brand" disabled>Brand</button>
              <button className="btn btn-secondary" disabled>Secondary</button>
              <button className="btn btn-outline" disabled>Outline</button>
            </div>
          </div>

          {/* Badge */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Badge</h3>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
              <span className="badge badge-neutral">Draft</span>
              <span className="badge badge-success">Published</span>
              <span className="badge badge-warning">Pending</span>
              <span className="badge badge-danger">Expired</span>
            </div>
          </div>

          {/* Card */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Card</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
              <div className="nf-card">
                <h4 className="h4" style={{ marginBottom: 8 }}>Default</h4>
                <p className="body-sm" style={{ color: "var(--muted-foreground)" }}>Standard card with border.</p>
              </div>
              <div className="nf-card nf-card-accent-top">
                <p className="overline" style={{ marginBottom: 8 }}>Featured</p>
                <h4 className="h4" style={{ marginBottom: 8 }}>Accent Top</h4>
                <p className="body-sm" style={{ color: "var(--muted-foreground)" }}>Primary top border.</p>
              </div>
              <div className="nf-card nf-card-accent-left">
                <p className="overline" style={{ marginBottom: 8 }}>Sidebar</p>
                <h4 className="h4" style={{ marginBottom: 8 }}>Accent Left</h4>
                <p className="body-sm" style={{ color: "var(--muted-foreground)" }}>Left accent variant.</p>
              </div>
              <div className="nf-card nf-card-brand">
                <p className="overline" style={{ marginBottom: 8, color: "rgba(255,255,255,.7)" }}>On Brand</p>
                <h4 className="h4" style={{ marginBottom: 8, color: "#fff" }}>Brand Surface</h4>
                <p className="caption">Inverted card on Dark Wine.</p>
              </div>
              <div className="nf-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <h4 className="h4">Akta Jual Beli</h4>
                  <span className="badge badge-warning">Pending</span>
                </div>
                <p className="body-sm" style={{ color: "var(--muted-foreground)" }}>Complete card — header, status badge, body, and footer actions.</p>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button className="btn btn-brand btn-sm">Open</button>
                  <button className="btn btn-ghost btn-sm">Archive</button>
                </div>
              </div>
              <div className="nf-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <h4 className="h4">Akta Pendirian PT</h4>
                  <span className="badge badge-success">Published</span>
                </div>
                <p className="body-sm" style={{ color: "var(--muted-foreground)" }}>Card with metadata footer for document listings.</p>
                <p className="caption" style={{ marginTop: 4 }}>Updated 2 hours ago · Pihak: 3</p>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Checkbox</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 420 }}>
              <CheckRow label="Checked" defaultChecked />
              <CheckRow label="Unchecked" />
              <CheckRow label="With description" desc="Send a notification when the deed status changes." defaultChecked />
              <CheckRow label="Disabled" disabled />
            </div>
          </div>

          {/* Form Field */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Form Field</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, maxWidth: 640 }}>
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" placeholder="Enter your name" />
                <span className="form-helper">As it appears on your invoice.</span>
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <div style={{ position: "relative" }}>
                  <input className="form-input form-input-success" type="email" defaultValue="hello@notaflow.com" style={{ paddingRight: 36 }} />
                  <CheckCircleIcon size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--success)" }} />
                </div>
                <span className="form-helper form-helper-success">Email verified</span>
              </div>
              <div className="form-field">
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input className="form-input form-input-error" type="password" defaultValue="123" style={{ paddingRight: 36 }} />
                  <AlertCircleIcon size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--danger)" }} />
                </div>
                <span className="form-helper form-helper-error">Must be at least 8 characters</span>
              </div>
            </div>
          </div>

          {/* Stat Card */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Stat Card</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
              <div className="stat-card">
                <span className="stat-label">Revenue</span>
                <span className="stat-value">$48.2k</span>
                <span className="stat-trend stat-trend-up"><TrendingUpIcon size={14} />+12.5%</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Invoices</span>
                <span className="stat-value">1,284</span>
                <span className="stat-trend stat-trend-up"><TrendingUpIcon size={14} />+8.1%</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Overdue</span>
                <span className="stat-value">23</span>
                <span className="stat-trend stat-trend-down"><TrendingDownIcon size={14} />-3.2%</span>
              </div>
            </div>
          </div>

          {/* Alert */}
          <div style={{ marginBottom: 80 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Alert</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
              <div className="nf-alert nf-alert-success">
                <CheckCircleIcon size={20} />
                <div>
                  <p className="alert-title">Invoice Sent</p>
                  <p className="caption">Your invoice #1042 has been sent successfully.</p>
                </div>
              </div>
              <div className="nf-alert nf-alert-warning">
                <AlertTriangleIcon size={20} />
                <div>
                  <p className="alert-title">Payment Pending</p>
                  <p className="caption">Invoice #1038 is overdue by 5 days.</p>
                </div>
              </div>
              <div className="nf-alert nf-alert-danger">
                <AlertCircleIcon size={20} />
                <div>
                  <p className="alert-title">Action Required</p>
                  <p className="caption">Your subscription has expired.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div style={{ marginBottom: 32 }}>
            <h3 className="h3-d" style={{ marginBottom: 24 }}>Theme Toggle</h3>
            <div className="nf-card" style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 400 }}>
              <button className="theme-toggle" role="switch" aria-label="Demo toggle" aria-checked={dark} onClick={toggleTheme}>
                <span className="theme-toggle-knob">
                  <SunIcon className="toggle-sun" size={11} />
                  <MoonIcon className="toggle-moon" size={11} />
                </span>
              </button>
              <div>
                <p className="body-sm" style={{ fontWeight: 500 }}>Switch Appearance</p>
                <p className="caption">Toggle between light and dark mode</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Token Map ===== */}
        <section id="token-map" className="section-sep" style={{ padding: "80px 0 64px" }}>
          <div style={{ marginBottom: 48 }}>
            <p className="overline" style={{ marginBottom: 8 }}>Part 03</p>
            <h2 className="h2-d">Token Map</h2>
            <p className="body" style={{ color: "var(--muted-foreground)", maxWidth: 600, marginTop: 8 }}>
              Complete visual representation of every token that gets exported. Click any row to copy its token path. Groups are collapsible.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
              <div className="nf-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <FileDownIcon size={20} style={{ color: "var(--primary)" }} />
                <div>
                  <p className="body-sm" style={{ fontWeight: 600 }}>Export Bundle</p>
                  <p className="caption">tokens.json + theme.css + fonts.css + notaflow.css + logos/ + README</p>
                </div>
              </div>
              <div className="nf-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <DownloadIcon size={20} style={{ color: "var(--primary)" }} />
                <div>
                  <p className="body-sm" style={{ fontWeight: 600 }}>Download Source</p>
                  <p className="caption">Full bundle + React/TS component variants (ZIP)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="token-map">
            {tokenGroups.map((g, idx) => {
              const collapsed = !!collapsedGroups[idx];
              return (
                <div key={idx} className={`tm-group${collapsed ? " collapsed" : ""}`}>
                  <div
                    className="tm-header"
                    onClick={() =>
                      setCollapsedGroups((p) => ({ ...p, [idx]: !p[idx] }))
                    }
                  >
                    <div className="tm-header-left">
                      <ChevronDownIcon size={16} />
                      <span className="body-sm" style={{ fontWeight: 600 }}>{g.title}</span>
                    </div>
                    <span className="tm-count">{g.count}</span>
                  </div>
                  <div className="tm-body" style={{ maxHeight: collapsed ? 0 : g.rows.length * 44 }}>
                    {g.rows.map((r, ri) => (
                      <div key={ri} className="tm-row" onClick={() => copy(`${r.key}: ${r.val}`)}>
                        <span className="tm-key">{r.key}</span>
                        <div className="tm-row-right">
                          {r.isColor && <div className="tm-swatch" style={{ background: r.hex }} />}
                          <span className="tm-val">{r.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "40px 24px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p className="caption">Notaflow Design System v1.1 · Editorial Modern</p>
      </footer>

      {/* ---------------- Toasts ---------------- */}
      <div className="toast-wrap">
        {toasts.map((t) => {
          const TIcon = TOAST_ICONS[t.type];
          return (
            <div key={t.id} className={`toast toast-${t.type}`}>
              <span className="toast-icon"><TIcon size={18} /></span>
              <div className="toast-body">
                <p className="toast-title">{t.title}</p>
                <p className="toast-msg">{t.msg}</p>
              </div>
              <button className="toast-close" aria-label="Dismiss" onClick={() => dismissToast(t.id)}>
                <XIcon size={14} />
              </button>
              <div className="toast-progress" style={{ animationDuration: `${t.duration}ms` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- sub components ---------------- */
function Swatch({ c, isDark, onCopy }: { c: NotaColor; isDark: boolean; onCopy: (t: string) => void }) {
  const cur = isDark ? c.dark : c.light;
  const oth = isDark ? c.light : c.dark;
  const othLbl = isDark ? "Light" : "Dark";
  const insetBdr = hexLum(oth) > 0.55 ? "rgba(0,0,0,.15)" : "rgba(255,255,255,.35)";
  return (
    <div className="color-swatch" title={`Click to copy ${cur}`} onClick={() => onCopy(cur)}>
      <div className="swatch-color" style={{ background: cur }}>
        <div className="swatch-inset" style={{ background: oth, borderColor: insetBdr }} title={`${othLbl}: ${oth}`} />
      </div>
      <div className="swatch-info">
        <p className="swatch-name">{c.label || c.name}</p>
        <p className="swatch-hex">{cur.toUpperCase()}</p>
        <p className="swatch-other">{othLbl}: {oth.toUpperCase()}</p>
      </div>
    </div>
  );
}

function CheckRow({
  label,
  desc,
  defaultChecked,
  disabled,
}: {
  label: string;
  desc?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className={`nf-checkbox${disabled ? " disabled" : ""}`}>
      <input type="checkbox" defaultChecked={defaultChecked} disabled={disabled} />
      <span className="nf-checkbox-box">
        <CheckIcon size={12} />
      </span>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span className="nf-checkbox-label">{label}</span>
        {desc && <span className="nf-checkbox-desc">{desc}</span>}
      </span>
    </label>
  );
}
