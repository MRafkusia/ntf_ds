/* =====================================================================
   Notaflow Design System — data, tokens, and export builders
   Shared between the landing page (demo) and the export bundle.
   ===================================================================== */

export type NotaColor = {
  name: string;
  label: string;
  light: string;
  dark: string;
  cat: string;
};

export const brandColors: NotaColor[] = [
  { name: "wine", label: "Primary (Dark Wine)", light: "#7f2924", dark: "#7f2924", cat: "Brand" },
  { name: "ashBrown", label: "Secondary (Ash Brown)", light: "#665345", dark: "#665345", cat: "Brand" },
  { name: "taupe", label: "Neutral (Taupe)", light: "#9b8d89", dark: "#9b8d89", cat: "Brand" },
  { name: "dustGrey", label: "Border (Dust Grey)", light: "#d5ccca", dark: "#d5ccca", cat: "Brand" },
  { name: "carbonBlack", label: "Text (Carbon Black)", light: "#2b2621", dark: "#2b2621", cat: "Brand" },
];

export const semanticColors: NotaColor[] = [
  { name: "success", label: "Success (Sage)", light: "#4a6b4f", dark: "#4a6b4f", cat: "Semantic" },
  { name: "warning", label: "Warning (Amber)", light: "#c78122", dark: "#c78122", cat: "Semantic" },
  { name: "danger", label: "Danger (Brick)", light: "#b83737", dark: "#b83737", cat: "Semantic" },
];

export const themeTokens: NotaColor[] = [
  { name: "background", label: "background", light: "#F8F7F6", dark: "#161311", cat: "Theme" },
  { name: "card", label: "card", light: "#FFFFFF", dark: "#1E1A18", cat: "Theme" },
  { name: "secondary", label: "secondary", light: "#EEEBE9", dark: "#2B2623", cat: "Theme" },
  { name: "muted", label: "muted", light: "#F2EFEF", dark: "#352F2B", cat: "Theme" },
  { name: "foreground", label: "foreground", light: "#2B2621", dark: "#F8F7F6", cat: "Theme" },
  { name: "mutedForeground", label: "muted-foreground", light: "#5D5452", dark: "#B5A9A5", cat: "Theme" },
  { name: "primary", label: "primary", light: "#7F2924", dark: "#D9655F", cat: "Theme" },
  { name: "border", label: "border", light: "#D5CCCA", dark: "#47403B", cat: "Theme" },
];

export const spacingScale = [
  { l: "1", v: "4px" }, { l: "2", v: "8px" }, { l: "3", v: "12px" }, { l: "4", v: "16px" },
  { l: "5", v: "20px" }, { l: "6", v: "24px" }, { l: "8", v: "32px" }, { l: "10", v: "40px" },
  { l: "12", v: "48px" }, { l: "16", v: "64px" }, { l: "20", v: "80px" }, { l: "24", v: "96px" },
];

export const radiusScale = [
  { l: "xs", v: "2px" }, { l: "sm", v: "4px" }, { l: "md", v: "8px" }, { l: "lg", v: "12px" },
  { l: "xl", v: "16px" }, { l: "2xl", v: "24px" }, { l: "pill", v: "9999px" },
];

export const shadowScale = {
  light: [
    { l: "sm", v: "0 1px 2px rgba(43,38,33,.06)" },
    { l: "md", v: "0 4px 12px rgba(43,38,33,.08)" },
    { l: "lg", v: "0 8px 32px rgba(43,38,33,.1)" },
    { l: "xl", v: "0 16px 48px rgba(43,38,33,.14)" },
  ],
  dark: [
    { l: "sm", v: "0 1px 2px rgba(0,0,0,.25)" },
    { l: "md", v: "0 4px 12px rgba(0,0,0,.3)" },
    { l: "lg", v: "0 8px 32px rgba(0,0,0,.35)" },
    { l: "xl", v: "0 16px 48px rgba(0,0,0,.4)" },
  ],
};

export const iconSizes = [
  { l: "xs", v: "14px" }, { l: "sm", v: "16px" }, { l: "md", v: "20px" },
  { l: "lg", v: "24px" }, { l: "xl", v: "32px" },
];

export const iconNames = [
  "search", "house", "settings", "user", "mail", "bell", "calendar", "clock", "heart", "star",
  "bookmark", "share-2", "download", "upload", "pencil-line", "trash-2", "plus", "minus", "check", "x",
  "chevron-left", "chevron-right", "chevron-up", "chevron-down", "arrow-left", "arrow-right",
  "arrow-up", "arrow-down", "eye", "lock", "lock-open", "shield", "zap", "globe", "map-pin", "camera",
  "image", "file-text", "folder", "copy", "link", "external-link", "menu", "ellipsis",
  "funnel", "refresh-cw", "maximize-2", "minimize-2", "layout-grid", "list", "code", "terminal",
  "database", "cloud", "wifi", "battery", "power", "volume-2", "mic", "headphones", "play", "pause",
  "dollar-sign", "trending-up", "trending-down", "chart-pie", "chart-column", "activity",
  "credit-card", "receipt", "send", "paperclip", "message-circle", "phone", "map", "compass",
  "sun", "moon", "flag", "tag", "hash", "at-sign", "aperture", "palette", "pen-tool", "scissors",
  "circle", "square", "triangle", "award", "gift", "package", "truck", "store", "building-2",
  "landmark", "briefcase", "users", "user-plus", "log-in", "log-out",
];

export const typographyRows = [
  { key: "typography.displayH1", val: "Newsreader 600 / clamp(36-56px) / -0.02em" },
  { key: "typography.displayH2", val: "Newsreader 600 / clamp(28-40px) / -0.015em" },
  { key: "typography.displayH3", val: "Newsreader 500 / clamp(22-28px) / -0.01em" },
  { key: "typography.heading4", val: "Newsreader 600 / 20px / -0.01em" },
  { key: "typography.bodyLarge", val: "Outfit 400 / 18px / 1.6" },
  { key: "typography.body", val: "Outfit 400 / 16px / 1.6" },
  { key: "typography.bodySmall", val: "Outfit 400 / 14px / 1.5" },
  { key: "typography.caption", val: "Outfit 400 / 12px / 1.5" },
  { key: "typography.overline", val: "Outfit 600 / 12px / 0.08em" },
];

/* ---------------------------------------------------------------------
   Token Map groups (for the Token Map section + copy-to-clipboard)
   --------------------------------------------------------------------- */
export type TmRow = { key: string; val: string; isColor?: boolean; hex?: string };
export type TmGroup = { title: string; count: number; rows: TmRow[] };

export function buildTokenMapGroups(isDark: boolean): TmGroup[] {
  const groups: TmGroup[] = [];
  const pick = (c: NotaColor) => (isDark ? c.dark : c.light);

  const brandRows: TmRow[] = brandColors.map((c) => {
    const hex = pick(c);
    return { key: `color.brand.${c.name}`, val: hex, isColor: true, hex };
  });
  groups.push({ title: "Color — Brand", count: brandRows.length, rows: brandRows });

  const semRows: TmRow[] = semanticColors.map((c) => {
    const hex = pick(c);
    return { key: `color.semantic.${c.name}`, val: hex, isColor: true, hex };
  });
  groups.push({ title: "Color — Semantic", count: semRows.length, rows: semRows });

  const tlRows: TmRow[] = themeTokens.map((c) => ({
    key: `color.theme.light.${c.name}`, val: c.light, isColor: true, hex: c.light,
  }));
  groups.push({ title: "Color — Theme Light", count: tlRows.length, rows: tlRows });

  const tdRows: TmRow[] = themeTokens.map((c) => ({
    key: `color.theme.dark.${c.name}`, val: c.dark, isColor: true, hex: c.dark,
  }));
  groups.push({ title: "Color — Theme Dark", count: tdRows.length, rows: tdRows });

  groups.push({ title: "Typography", count: typographyRows.length, rows: typographyRows });

  const spRows: TmRow[] = spacingScale.map((s) => ({ key: `spacing.${s.l}`, val: s.v }));
  groups.push({ title: "Spacing", count: spRows.length, rows: spRows });

  const rdRows: TmRow[] = radiusScale.map((r) => ({ key: `radius.${r.l}`, val: r.v }));
  groups.push({ title: "Radius", count: rdRows.length, rows: rdRows });

  const shlRows: TmRow[] = shadowScale.light.map((s) => ({ key: `shadow.light.${s.l}`, val: s.v }));
  groups.push({ title: "Shadow — Light", count: shlRows.length, rows: shlRows });

  const shdRows: TmRow[] = shadowScale.dark.map((s) => ({ key: `shadow.dark.${s.l}`, val: s.v }));
  groups.push({ title: "Shadow — Dark", count: shdRows.length, rows: shdRows });

  const icRows: TmRow[] = iconSizes.map((s) => ({ key: `icon.size.${s.l}`, val: s.v }));
  icRows.push({ key: "icon.strokeWidth", val: "2px" });
  groups.push({ title: "Icon", count: icRows.length, rows: icRows });

  const bwRows: TmRow[] = [
    { key: "borderWidth.1", val: "1px" },
    { key: "borderWidth.2", val: "2px" },
    { key: "borderWidth.3", val: "3px" },
  ];
  groups.push({ title: "Border Width", count: bwRows.length, rows: bwRows });

  return groups;
}

/* ---------------------------------------------------------------------
   Export bundle builders
   --------------------------------------------------------------------- */
export function buildTokenJSON() {
  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    notaflow: {
      color: {
        brand: Object.fromEntries(
          brandColors.map((c) => [c.name, { $type: "color", $value: c.light }])
        ),
        semantic: Object.fromEntries(
          semanticColors.map((c) => [c.name, { $type: "color", $value: c.light }])
        ),
        theme: {
          light: Object.fromEntries(
            themeTokens.map((c) => [c.name, { $type: "color", $value: c.light }])
          ),
          dark: Object.fromEntries(
            themeTokens.map((c) => [c.name, { $type: "color", $value: c.dark }])
          ),
        },
      },
      typography: {
        fontFamily: {
          display: { $type: "fontFamily", $value: ["Newsreader", "Georgia", "serif"] },
          body: { $type: "fontFamily", $value: ["Outfit", "system-ui", "sans-serif"] },
        },
        displayH1: { $type: "typography", $value: { fontFamily: "Newsreader", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12 } },
        displayH2: { $type: "typography", $value: { fontFamily: "Newsreader", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2 } },
        displayH3: { $type: "typography", $value: { fontFamily: "Newsreader", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3 } },
        heading4: { $type: "typography", $value: { fontFamily: "Newsreader", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.4 } },
        bodyLarge: { $type: "typography", $value: { fontFamily: "Outfit", fontSize: "18px", fontWeight: 400, lineHeight: 1.6 } },
        body: { $type: "typography", $value: { fontFamily: "Outfit", fontSize: "16px", fontWeight: 400, lineHeight: 1.6 } },
        bodySmall: { $type: "typography", $value: { fontFamily: "Outfit", fontSize: "14px", fontWeight: 400, lineHeight: 1.5 } },
        caption: { $type: "typography", $value: { fontFamily: "Outfit", fontSize: "12px", fontWeight: 400, lineHeight: 1.5 } },
        overline: { $type: "typography", $value: { fontFamily: "Outfit", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1.5, textTransform: "uppercase" } },
      },
      spacing: Object.fromEntries(spacingScale.map((s) => [s.l, { $type: "dimension", $value: s.v }])),
      radius: Object.fromEntries(radiusScale.map((r) => [r.l, { $type: "dimension", $value: r.v }])),
      shadow: {
        light: Object.fromEntries(shadowScale.light.map((s) => [s.l, { $type: "shadow", $value: [{ offsetX: "0px", offsetY: s.v.split(" ")[1] || "0px", blur: s.v.split(" ")[2] || "0px", spread: "0px", color: (s.v.match(/rgba\([^)]+\)/) || [""])[0] }] }])),
        dark: Object.fromEntries(shadowScale.dark.map((s) => [s.l, { $type: "shadow", $value: [{ offsetX: "0px", offsetY: s.v.split(" ")[1] || "0px", blur: s.v.split(" ")[2] || "0px", spread: "0px", color: (s.v.match(/rgba\([^)]+\)/) || [""])[0] }] }])),
      },
      icon: {
        size: Object.fromEntries(iconSizes.map((s) => [s.l, { $type: "dimension", $value: s.v }])),
        strokeWidth: { $type: "dimension", $value: "2px" },
      },
      borderWidth: {
        "1": { $type: "dimension", $value: "1px" },
        "2": { $type: "dimension", $value: "2px" },
        "3": { $type: "dimension", $value: "3px" },
      },
    },
  };
}

export function buildThemeCSS(): string {
  return `:root {
  --wine:#7f2924; --ash:#665345; --taupe:#9b8d89;
  --dust:#d5ccca; --carbon:#2b2621;
  --success:#4a6b4f; --warning:#c78122; --danger:#b83737;
  --background:#F8F7F6; --card:#FFFFFF; --secondary:#EEEBE9;
  --muted:#F2EFEF; --foreground:#2B2621; --muted-foreground:#5D5452;
  --primary:#7F2924; --border:#D5CCCA;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;
  --space-6:24px;--space-8:32px;--space-10:40px;--space-12:48px;
  --space-16:64px;--space-20:80px;--space-24:96px;
  --radius-xs:2px;--radius-sm:4px;--radius-md:8px;--radius-lg:12px;
  --radius-xl:16px;--radius-2xl:24px;--radius-pill:9999px;
  --icon-xs:14px;--icon-sm:16px;--icon-md:20px;--icon-lg:24px;--icon-xl:32px;
  --icon-stroke:2px;
  --shadow-sm:0 1px 2px rgba(43,38,33,0.06);
  --shadow-md:0 4px 12px rgba(43,38,33,0.08);
  --shadow-lg:0 8px 32px rgba(43,38,33,0.1);
  --shadow-xl:0 16px 48px rgba(43,38,33,0.14);
}
.dark {
  --background:#161311; --card:#1E1A18; --secondary:#2B2623;
  --muted:#352F2B; --foreground:#F8F7F6; --muted-foreground:#B5A9A5;
  --primary:#D9655F; --border:#47403B;
  --shadow-sm:0 1px 2px rgba(0,0,0,0.25);
  --shadow-md:0 4px 12px rgba(0,0,0,0.3);
  --shadow-lg:0 8px 32px rgba(0,0,0,0.35);
  --shadow-xl:0 16px 48px rgba(0,0,0,0.4);
}`;
}

export function buildFontsCSS(): string {
  return `@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Outfit:wght@300;400;500;600;700&display=swap');`;
}

export function buildButtonTSX(): string {
  return `import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans font-medium rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        brand: 'bg-[var(--primary)] text-white hover:brightness-110',
        secondary: 'bg-[var(--secondary)] text-[var(--foreground)] hover:brightness-105',
        outline: 'border border-[var(--border)] hover:bg-[var(--muted)]',
        ghost: 'hover:bg-[var(--muted)]',
        link: 'text-[var(--primary)] hover:underline p-0 rounded-none',
        danger: 'bg-[var(--danger)] text-white hover:brightness-110',
        inverted: 'bg-white text-[var(--wine)] hover:brightness-95',
      },
      size: { sm: 'text-xs px-3.5 py-1.5', default: 'text-sm px-5 py-2.5', lg: 'text-base px-7 py-3.5', icon: 'p-2' },
    },
    defaultVariants: { variant: 'brand', size: 'default' },
  }
);`;
}

export function buildBadgeTSX(): string {
  return `import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full',
  {
    variants: {
      variant: {
        neutral: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
        success: 'bg-[rgba(74,107,79,0.12)] text-[var(--success)]',
        warning: 'bg-[rgba(199,129,34,0.12)] text-[var(--warning)]',
        danger: 'bg-[rgba(184,55,55,0.12)] text-[var(--danger)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
);`;
}

export function buildCardTSX(): string {
  return `import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 transition-shadow hover:shadow-md',
  {
    variants: {
      accent: { none: '', top: 'border-t-[3px] border-t-[var(--primary)]', left: 'border-l-[3px] border-l-[var(--primary)]', brand: 'bg-[var(--wine)] border-[var(--wine)] text-white' },
    },
    defaultVariants: { accent: 'none' },
  }
);`;
}

export function buildCheckboxTSX(): string {
  return `import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
  'peer h-5 w-5 shrink-0 rounded-[4px] border-2 border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed',
);`;
}

export function buildIndexTS(): string {
  return `export { Button, buttonVariants } from './Button';
export { Badge, badgeVariants } from './Badge';
export { Card, cardVariants } from './Card';
export { Checkbox, checkboxVariants } from './Checkbox';`;
}

export function buildReadmeMD(fileCount: number, logoCount: number): string {
  return `# Notaflow Design System v1.1

Editorial Modern — sophisticated, warm, earthy, editorial-yet-functional.

## Bundle contents (${fileCount} files)

- \`notaflow-tokens.json\` — Design Tokens Format JSON (colors, typography, spacing, radius, shadow, icon, border).
- \`theme.css\` — CSS custom properties for light & dark themes.
- \`fonts.css\` — Google Fonts import (Newsreader + Outfit).
- \`notaflow.css\` — Full component stylesheet (buttons, badges, cards, checkboxes, forms, alerts, stats, toasts, token map, logo tiles). Drop-in, scoped to \`:root\` / \`.dark\`.
- \`logos/\` — ${logoCount} brand SVG assets (wordmarks, app icons, favicon).
- \`src/app/components/notaflow/\` — React + TS component variants (Button, Badge, Card, Checkbox, index).

## Usage

1. Import the fonts and tokens:
   \`\`\`ts
   import './fonts.css';
   import './theme.css';
   import './notaflow.css'; // optional: full component styles
   \`\`\`
2. Toggle dark mode by adding the \`dark\` class to \`<html>\`.
3. Use the design tokens via \`var(--primary)\`, \`var(--radius-lg)\`, etc.

## Brand colors

- Wine \`#7f2924\` · Ash \`#665345\` · Taupe \`#9b8d89\` · Dust \`#d5ccca\` · Carbon \`#2b2621\`

— Generated by the Notaflow Design System showcase.
`;
}

export function formatBytes(b: number): string {
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

/* ---------------------------------------------------------------------
   Brand SVG logos — embedded so the export bundle is self-contained
   and the landing-page gallery can inline them (currentColor support).
   --------------------------------------------------------------------- */
export type NotaLogo = {
  id: string;
  name: string;
  file: string;
  desc: string;
  /** background for the gallery preview tile */
  previewBg: string;
  /** foreground color (for currentColor logos) */
  previewColor?: string;
  svg: string;
};

export const logos: NotaLogo[] = [
  {
    id: "logo-full",
    name: "Primary Wordmark",
    file: "logo-full.svg",
    desc: "Full wordmark on dark surfaces. White serif with coral dot.",
    previewBg: "var(--wine)",
    svg: `<svg width="300" height="100" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="100" fill="none" />
  <text x="10" y="70" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="500" fill="white">Notaflow<tspan fill="#E57373">.</tspan></text>
</svg>`,
  },
  {
    id: "logo-mono",
    name: "Monochrome Wordmark",
    file: "logo-mono.svg",
    desc: "Single-color wordmark. Uses currentColor — inherits text color.",
    previewBg: "var(--card)",
    previewColor: "var(--foreground)",
    svg: `<svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="60" font-family="Georgia, serif" font-size="55" font-weight="bold" fill="currentColor">Notaflow.</text>
</svg>`,
  },
  {
    id: "logo-inverted",
    name: "Inverted Wordmark",
    file: "logo-inverted.svg",
    desc: "Carbon wordmark for light surfaces, with brick-red dot.",
    previewBg: "var(--card)",
    previewColor: "var(--foreground)",
    svg: `<svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="60" font-family="Georgia, serif" font-size="55" font-weight="bold" fill="#1A1A1A">Notaflow<tspan fill="#E63946">.</tspan></text>
</svg>`,
  },
  {
    id: "favicon",
    name: "Favicon Mark",
    file: "favicon.svg",
    desc: "Square favicon mark. Serif N with red dot, transparent corners.",
    previewBg: "var(--wine)",
    svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" rx="15" fill="none"/>
  <text x="15" y="60" font-family="Georgia, serif" font-size="60" font-weight="bold" fill="#FFFFFF">N</text>
  <circle cx="65" cy="55" r="7" fill="#E63946"/>
</svg>`,
  },
  {
    id: "icon-wine-text",
    name: "App Icon — Wine Text",
    file: "icon-wine-text.svg",
    desc: "Rounded app icon, white surface with wine N + dot.",
    previewBg: "var(--muted)",
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#ffffff"/>
  <text x="25" y="72" font-family="Georgia, serif" font-size="70" font-weight="bold" fill="#7f2924">N</text>
  <circle cx="78" cy="68" r="6" fill="#7f2924"/>
</svg>`,
  },
  {
    id: "icon-wine",
    name: "App Icon — Wine",
    file: "icon-wine.svg",
    desc: "Rounded app icon, solid wine surface with white N + dot.",
    previewBg: "var(--muted)",
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#7f2924"/>
  <text x="25" y="72" font-family="Georgia, serif" font-size="70" font-weight="bold" fill="#ffffff">N</text>
  <circle cx="78" cy="68" r="6" fill="#ffffff"/>
</svg>`,
  },
  {
    id: "icon-light",
    name: "App Icon — Light",
    file: "icon-light.svg",
    desc: "Rounded app icon, white surface with carbon N + dot.",
    previewBg: "var(--muted)",
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#ffffff"/>
  <text x="25" y="72" font-family="Georgia, serif" font-size="70" font-weight="bold" fill="#2b2621">N</text>
  <circle cx="78" cy="68" r="6" fill="#2b2621"/>
</svg>`,
  },
  {
    id: "icon-inverted",
    name: "App Icon — Inverted",
    file: "icon-inverted.svg",
    desc: "Rounded app icon, carbon surface with white N + dot.",
    previewBg: "var(--muted)",
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#2b2621"/>
  <text x="25" y="72" font-family="Georgia, serif" font-size="70" font-weight="bold" fill="#ffffff">N</text>
  <circle cx="78" cy="68" r="6" fill="#ffffff"/>
</svg>`,
  },
];
