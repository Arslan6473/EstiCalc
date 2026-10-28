// Generates a 1200x630 SVG cover for every article in content/blog.
// Usage: npm run covers
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const blogDir = path.join(root, "content", "blog");
const outDir = path.join(root, "public", "images", "blog");

const themes = {
  "area-measurement": ["#0f766e", "#134e4a", "Area & Measurement"],
  "paint-finishes": ["#7c3aed", "#4c1d95", "Paint & Finishes"],
  flooring: ["#b45309", "#78350f", "Flooring"],
  tile: ["#0369a1", "#0c4a6e", "Tile"],
  "drywall-framing-insulation": ["#475569", "#1e293b", "Drywall & Insulation"],
  "concrete-masonry": ["#57534e", "#292524", "Concrete & Masonry"],
  landscaping: ["#15803d", "#14532d", "Landscaping"],
  "outdoor-roofing": ["#b91c1c", "#7f1d1d", "Outdoor & Roofing"],
  "comfort-room-planning": ["#0891b2", "#164e63", "Comfort & Rooms"],
  "cost-budgeting": ["#0f766e", "#1e3a8a", "Cost & Budgeting"],
  "water-volume": ["#2563eb", "#1e3a8a", "Water & Volume"],
};

const W = "#ffffff";
const A = "#fbbf24";

// Simple flat illustrations, drawn in a 360x360 box.
const art = {
  "area-measurement": `
    <rect x="40" y="70" width="280" height="200" rx="8" fill="${W}" opacity=".95"/>
    <path d="M40 170h150v100" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="10 8"/>
    <path d="M40 300h280M40 290v20M320 290v20M350 70v200M340 70h20M340 270h20" stroke="${A}" stroke-width="5"/>
    <text x="180" y="335" fill="${W}" font-size="26" font-weight="700" text-anchor="middle" font-family="Arial">14 ft</text>
    <rect x="200" y="190" width="90" height="56" rx="10" fill="${A}"/>
    <text x="245" y="227" fill="#1f2937" font-size="22" font-weight="800" text-anchor="middle" font-family="Arial">sq ft</text>`,
  "paint-finishes": `
    <rect x="60" y="60" width="200" height="70" rx="18" fill="${W}"/>
    <rect x="60" y="80" width="200" height="30" fill="${A}"/>
    <path d="M260 95h40v70H160v40" fill="none" stroke="${W}" stroke-width="12" stroke-linejoin="round"/>
    <rect x="146" y="200" width="28" height="110" rx="10" fill="#1f2937"/>
    <rect x="40" y="240" width="40" height="80" rx="8" fill="${A}"/><rect x="88" y="260" width="40" height="60" rx="8" fill="${W}" opacity=".85"/>
    <rect x="210" y="250" width="40" height="70" rx="8" fill="${W}" opacity=".6"/><rect x="258" y="230" width="40" height="90" rx="8" fill="${A}" opacity=".8"/>`,
  flooring: `
    <g fill="${W}">
      <rect x="40" y="60" width="170" height="44" rx="4"/><rect x="216" y="60" width="104" height="44" rx="4" opacity=".8"/>
      <rect x="40" y="110" width="90" height="44" rx="4" opacity=".8"/><rect x="136" y="110" width="184" height="44" rx="4"/>
      <rect x="40" y="160" width="200" height="44" rx="4"/><rect x="246" y="160" width="74" height="44" rx="4" opacity=".8"/>
      <rect x="40" y="210" width="120" height="44" rx="4" opacity=".8"/><rect x="166" y="210" width="154" height="44" rx="4"/>
    </g>
    <path d="M40 290h280" stroke="${A}" stroke-width="10" stroke-linecap="round"/>
    <path d="M60 80h120M150 130h140M60 180h150M180 230h110" stroke="#d6d3d1" stroke-width="3"/>`,
  tile: `
    <g fill="${W}">${Array.from({ length: 16 }, (_, i) => {
      const x = 50 + (i % 4) * 68;
      const y = 50 + Math.floor(i / 4) * 68;
      return `<rect x="${x}" y="${y}" width="60" height="60" rx="6" ${i === 5 || i === 10 ? `fill="${A}"` : 'opacity=".92"'}/>`;
    }).join("")}</g>
    <path d="M300 300l40 40" stroke="${A}" stroke-width="12" stroke-linecap="round"/>`,
  "drywall-framing-insulation": `
    <g fill="#d6d3d1"><rect x="40" y="60" width="280" height="16"/><rect x="40" y="284" width="280" height="16"/>
    ${[40, 110, 180, 250, 304].map((x) => `<rect x="${x}" y="76" width="16" height="208"/>`).join("")}</g>
    <rect x="56" y="76" width="54" height="208" fill="${A}" opacity=".85"/>
    <path d="M60 100q24 15 0 30t0 30 0 30 0 30 0 30 0 30" stroke="#b45309" stroke-width="3" fill="none" transform="translate(20 0)"/>
    <rect x="196" y="76" width="108" height="208" fill="${W}" opacity=".95"/>
    <circle cx="210" cy="96" r="4" fill="#64748b"/><circle cx="290" cy="96" r="4" fill="#64748b"/><circle cx="210" cy="264" r="4" fill="#64748b"/><circle cx="290" cy="264" r="4" fill="#64748b"/>`,
  "concrete-masonry": `
    <g fill="${W}" opacity=".95">
      <rect x="40" y="70" width="130" height="50" rx="4"/><rect x="178" y="70" width="130" height="50" rx="4"/>
      <rect x="40" y="128" width="62" height="50" rx="4"/><rect x="110" y="128" width="130" height="50" rx="4"/><rect x="248" y="128" width="60" height="50" rx="4"/>
      <rect x="40" y="186" width="130" height="50" rx="4"/><rect x="178" y="186" width="130" height="50" rx="4"/>
    </g>
    <rect x="30" y="250" width="300" height="60" rx="6" fill="#a8a29e"/>
    <circle cx="80" cy="280" r="6" fill="#78716c"/><circle cx="160" cy="270" r="4" fill="#78716c"/><circle cx="250" cy="288" r="5" fill="#78716c"/>
    <path d="M200 240l60-50 30 30" stroke="${A}" stroke-width="10" stroke-linecap="round" fill="none"/>`,
  landscaping: `
    <path d="M20 300q160-150 320 0z" fill="#a16207"/>
    <path d="M70 300q110-90 220 0z" fill="#854d0e"/>
    <path d="M180 200V90" stroke="${W}" stroke-width="10" stroke-linecap="round"/>
    <path d="M180 150q-70-10-80-80 70 0 80 80zM180 120q60-10 80-70-70 0-80 70z" fill="${W}"/>
    <circle cx="300" cy="80" r="28" fill="${A}"/>
    <path d="M20 300h320" stroke="${W}" stroke-width="6"/>`,
  "outdoor-roofing": `
    <path d="M50 170L180 70l130 100" fill="none" stroke="${W}" stroke-width="16" stroke-linejoin="round"/>
    <path d="M80 160v120h200V160" fill="${W}" opacity=".95"/>
    <rect x="160" y="210" width="40" height="70" fill="${A}"/>
    <rect x="100" y="190" width="40" height="34" fill="#94a3b8"/><rect x="220" y="190" width="40" height="34" fill="#94a3b8"/>
    <g fill="${A}">${[20, 50, 300, 330].map((x) => `<path d="M${x} 300v-50l10-12 10 12v50z"/>`).join("")}</g>
    <path d="M10 270h70M290 270h70" stroke="${A}" stroke-width="6"/>`,
  "comfort-room-planning": `
    <circle cx="140" cy="180" r="100" fill="none" stroke="${W}" stroke-width="10"/>
    ${[0, 120, 240].map((r) => `<path d="M140 180q-10-70 30-80 20 40-30 80z" fill="${W}" transform="rotate(${r} 140 180)"/>`).join("")}
    <circle cx="140" cy="180" r="14" fill="${A}"/>
    <rect x="280" y="70" width="34" height="200" rx="17" fill="${W}"/>
    <circle cx="297" cy="280" r="30" fill="${A}"/><rect x="290" y="150" width="14" height="120" fill="${A}"/>`,
  "cost-budgeting": `
    <rect x="60" y="50" width="180" height="250" rx="12" fill="${W}"/>
    <path d="M90 100h120M90 140h90M90 180h110M90 220h70" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/>
    <path d="M90 260h120" stroke="${A}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="270" cy="250" r="56" fill="${A}"/>
    <text x="270" y="272" fill="#1f2937" font-size="62" font-weight="800" text-anchor="middle" font-family="Arial">$</text>`,
  "water-volume": `
    <rect x="40" y="80" width="280" height="200" rx="18" fill="${W}" opacity=".25" stroke="${W}" stroke-width="6"/>
    <path d="M46 160q35-25 70 0t70 0 70 0 58 0v114H46z" fill="${W}" opacity=".9"/>
    <path d="M46 200q35-20 70 0t70 0 70 0 58 0" fill="none" stroke="#93c5fd" stroke-width="5"/>
    <path d="M300 40q-24 34-24 50a24 24 0 0 0 48 0q0-16-24-50z" fill="${A}"/>`,
};

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else line = (line + " " + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function cover({ title, category }) {
  const [c1, c2, label] = themes[category] ?? themes["area-measurement"];
  let size = 58;
  let lines = wrap(title, 22);
  if (lines.length > 4) {
    size = 48;
    lines = wrap(title, 27);
  }
  const lh = size * 1.18;
  const startY = 315 - ((lines.length - 1) * lh) / 2 + size * 0.35;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="2"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="960" cy="315" r="250" fill="#fff" fill-opacity=".08"/>
  <g transform="translate(780 135)">${art[category] ?? art["area-measurement"]}</g>
  <rect x="72" y="70" width="${label.length * 13 + 40}" height="44" rx="22" fill="#fff" fill-opacity=".15"/>
  <text x="92" y="99" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5">${esc(label.toUpperCase())}</text>
  <text fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800">${lines
    .map((l, i) => `<tspan x="72" y="${(startY + i * lh).toFixed(0)}">${esc(l)}</tspan>`)
    .join("")}</text>
  <text x="72" y="566" fill="#fff" fill-opacity=".85" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">Esti<tspan fill="${A}">Calc</tspan><tspan fill="#fff" fill-opacity=".7" font-weight="400"> · Home improvement guides</tspan></text>
</svg>
`;
}

let n = 0;
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const { data } = matter(fs.readFileSync(path.join(blogDir, file), "utf8"));
  fs.mkdirSync(path.join(outDir, slug), { recursive: true });
  fs.writeFileSync(path.join(outDir, slug, "cover.svg"), cover(data));
  n++;
}
console.log(`Generated ${n} covers`);
