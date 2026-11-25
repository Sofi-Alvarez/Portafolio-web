// Compile every captured route/state into build chunks + a shared icon library.
const fs = require('fs'); const path = require('path');
const { convert, strip } = require('./compile');
const { parse, hex } = require('./color');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'build'); fs.mkdirSync(OUT, { recursive: true });
const LIMIT = 150000;

// ---------- icon library ----------
const icons = {}; // key -> {name, svg, w, h, mono, count}
function normSvg(svg) {
  return svg.replace(/(oklch|oklab|rgba?|color)\([^)]*\)/g, (m) => { const c = parse(m); if (!c) return m; return c.a < 1 ? `rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${Math.round(c.a*1000)/1000})` : hex(c); })
    .replace(/stroke-width="([\d.]+)px"/g, 'stroke-width="$1"');
}
function svgKey(svg) {
  let s = svg.replace(/ (width|height)="[^"]*"/g, '');
  const cols = new Set([...s.matchAll(/(?:stroke|fill|stop-color)="(rgba?\([^"]*\)|#[0-9a-fA-F]+)"/g)].map(m => m[1]).filter(c => !/^rgba\(0,0,0,0\)$/.test(c)));
  const mono = cols.size === 1;
  if (mono) s = s.replace(/(stroke|fill)="(rgba?\([^"]*\)|#[0-9a-fA-F]+)"/g, '$1="C"');
  s = s.replace(/ (stroke-width)="([\d.]+)px"/g, ' $1="$2"').replace(/ aria-hidden="[^"]*"| focusable="[^"]*"| role="[^"]*"| xmlns(:\w+)?="[^"]*"| data-[\w-]+="[^"]*"/g, '');
  return { key: s, mono, color: mono ? [...cols][0] : null };
}
function niceName(n, parentText) {
  const m = (n.cls || '').match(/lucide-([a-z0-9-]+)/); if (m) return 'Icon/' + m[1];
  if (parentText) return 'Logo/' + parentText.replace(/[^\wÁÉÍÓÚáéíóúñÑ +.-]/g, '').trim().slice(0, 24);
  return null;
}
function textOf(n) { if (n.text) return n.text.trim(); return (n.c || []).map(textOf).join(' ').trim(); }
function collectIcons(n, parent, gp) {
  if (n.t === 'svg' && n.svg && n.svg !== 'TRUNC') n.svg = normSvg(n.svg);
  if (n.t === 'svg' && n.svg && n.svg !== 'TRUNC' && n.w <= 72 && n.h <= 72 && n.w > 0) {
    const { key, mono, color } = svgKey(n.svg);
    let ptxt = parent ? textOf(parent).replace(/\s+/g, ' ') : ''; if (!ptxt && gp) ptxt = textOf(gp).replace(/\s+/g, ' ');
    const swm = n.svg.match(/stroke-width="([\d.]+)"/); n._sw = swm ? swm[1] : null;
    let ic = icons[key]; if (!ic) { ic = icons[key] = { name: niceName(n, ptxt.length < 30 ? ptxt : ''), svg: n.svg, w: n.w, h: n.h, mono, count: 0, sw: n._sw }; }
    else if (!ic.name) ic.name = niceName(n, ptxt.length < 30 ? ptxt : '');
    ic.count++; n._ic = key; n._icCol = color;
  }
  for (const c of n.c || []) collectIcons(c, n, parent);
}
function replaceIcons(spec, dom) {
  // walk dom & spec in parallel is hard; instead tag by svg string match
}

// ---------- page sections ----------
function topSections(body) {
  // descend until we find nav/section/footer children
  const list = [];
  (function find(n, depth) {
    const kids = n.c || [];
    const hasSem = kids.some(k => ['nav', 'section', 'footer', 'main'].includes(k.t));
    if (hasSem || depth > 6) { for (const k of kids) { if (k.t === 'main') { for (const m of k.c || []) list.push(m); } else list.push(k); } return; }
    for (const k of kids) find(k, depth + 1);
  })(body, 0);
  return list.filter(n => n.w > 0 && n.h > 0);
}
function iconize(spec, domSvgs) {
  (function w(n) { if (n.k === 'V' && domSvgs.has(n.svg)) { const { key, color } = domSvgs.get(n.svg); const ic = icons[key]; if (ic && ic.name) { n.k = 'IC'; n.ic = ic.name; if (color) { const c = parse(color); n.icol = hex(c); if (c.a < 1) n.icoa = Math.round(c.a * 100) / 100; } delete n.svg; } } (n.c || []).forEach(w); })(spec);
}
function svgMap(dom) { const m = new Map(); (function w(n) { if (n._ic) m.set(n.svg, { key: n._ic, color: n._icCol }); (n.c || []).forEach(w); })(dom); return m; }
function size(o) { return JSON.stringify(o).length; }
let KEYN = 0;
function chunkSection(spec, label, parentKey = null) {
  if (size(spec) <= LIMIT) return [{ parent: parentKey, nodes: [spec], label }];
  const key = 'k' + (++KEYN); const shell = { ...spec }; delete shell.c;
  const chunks = [{ parent: parentKey, nodes: [shell], label: label + ' (shell)', key }];
  let batch = [], bs = 0;
  const flush = () => { if (batch.length) chunks.push({ parent: key, nodes: batch, label: label + ' (children)' }); batch = []; bs = 0; };
  for (const ch of spec.c || []) { const sz = size(ch); if (sz > LIMIT) { flush(); chunks.push(...chunkSection(ch, label + ' > ' + ch.n, key)); continue; } if (bs + sz > LIMIT) flush(); batch.push(ch); bs += sz; }
  flush(); return chunks;
}
const ROUTES = [
  ['landing', 1280], ['landing', 390], ['milestone', 1280], ['iupi', 1280], ['portfolio', 1280], ['bank', 1280], ['bookie', 1280],
];
const doms = {};
for (const [name, vw] of ROUTES) { const d = JSON.parse(fs.readFileSync(path.join(ROOT, name, String(vw), 'dom.json'))); collectIcons(d, null); doms[name + '/' + vw] = d; }
// states
const stateDoms = {};
for (const [name, vw] of ROUTES) { const dir = path.join(ROOT, name, String(vw), 'states'); if (!fs.existsSync(dir)) continue; for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) { const d = JSON.parse(fs.readFileSync(path.join(dir, f))); collectIcons(d, null); stateDoms[`${name}/${vw}/${f.replace('.json', '')}`] = d; } }
// dedupe icon names
const used = {}; const byName = {}; for (const ic of Object.values(icons)) if (ic.name) (byName[ic.name] ||= []).push(ic);
for (const [nm, list] of Object.entries(byName)) { if (list.length === 1) { used[nm] = 1; continue; } for (const ic of list) { let n2 = nm + (ic.sw ? ` · ${ic.sw}px` : ''); n2 += ` · ${Math.round(ic.w)}`; let i = 2, base = n2; while (used[n2]) n2 = base + ' ' + i++; used[n2] = 1; ic.name = n2; } }
const unnamed = Object.values(icons).filter(i => !i.name);
let k = 1; for (const ic of unnamed) ic.name = 'Icon/glyph-' + k++;
const RENAME = { 'Icon/glyph-1': 'Logo/WhatsApp', 'Icon/glyph-2': 'Icon/chevron-left', 'Icon/glyph-3': 'Icon/chevron-right' };
for (const ic of Object.values(icons)) if (RENAME[ic.name]) ic.name = RENAME[ic.name];
fs.writeFileSync(path.join(OUT, 'icons.json'), JSON.stringify(Object.values(icons).map(i => ({ name: i.name, svg: i.svg, w: i.w, h: i.h, mono: i.mono, count: i.count }))));
console.log('icons', Object.keys(icons).length, 'KB', Math.round(size(Object.values(icons).map(i => i.svg)) / 1024));

// ---------- pages ----------
const summary = {};
for (const [name, vw] of ROUTES) {
  const dom = doms[name + '/' + vw]; const svgs = svgMap(dom); const secs = topSections(dom);
  const pageH = dom.h; const chunks = []; const images = new Set(); const notes = [];
  for (const sec of secs) {
    const spec = strip(convert(sec, { x: 0, y: 0 })); if (!spec) continue; iconize(spec, svgs);
    (function w(n) { if (n.img) images.add(n.img); (n.f || []).forEach(p => p.img && images.add(p.img)); if (n.ph) notes.push(n.ph); (n.c || []).forEach(w); })(spec);
    chunks.push(...chunkSection(spec, spec.n));
  }
  const page = { name, vw, h: pageH, chunks, images: [...images], notes };
  fs.writeFileSync(path.join(OUT, `${name}-${vw}.json`), JSON.stringify(page));
  summary[name + '/' + vw] = { h: pageH, sections: secs.length, chunks: chunks.length, KB: Math.round(size(chunks) / 1024), images: images.size };
}
function fixedNodes(n, acc = []) { for (const c of n.c || []) { if (c.s && c.s.position === 'fixed' && c.t !== 'nav' && c.w > 0 && c.h > 0) acc.push(c); else fixedNodes(c, acc); } return acc; }
function explorerRoot(sec) {
  // smallest descendant containing all tab buttons (aria-label with " — ") and the most content
  const tabs = []; (function w(n, path) { if (n.t === 'button' && (n.al || '').includes(' — ')) tabs.push(path.slice()); (n.c || []).forEach(c => { path.push(c); w(c, path); path.pop(); }); })(sec, [sec]);
  if (!tabs.length) return sec;
  let common = tabs[0]; for (const p of tabs) { let i = 0; while (i < common.length && i < p.length && common[i] === p[i]) i++; common = common.slice(0, i); }
  // climb one level above the tablist so the panel is included
  let node = common[common.length - 1]; const idx = common.length - 1;
  const parentOf = (target) => { let res = null; (function w(n) { for (const c of n.c || []) { if (c === target) res = n; else w(c); } })(sec); return res; };
  let cur = node; while (cur && cur !== sec) { const p = parentOf(cur); if (!p) break; if ((p.c || []).length > 1 && p.h > cur.h + 40) { cur = p; break; } cur = p; }
  return cur || sec;
}
for (const [key, dom] of Object.entries(stateDoms)) {
  const svgs = svgMap(dom); let spec, w = dom.w, h = dom.h;
  if (key.endsWith('menu-open')) {
    const vw = +key.split('/')[1]; const vh = vw === 390 ? 844 : 800;
    const fx = fixedNodes(dom); const kids = fx.map(n => { const c = strip(convert(n, { x: 0, y: 0 })); return c; }).filter(Boolean);
    spec = { n: 'Overlay / Menú abierto', k: 'F', x: 0, y: 0, w: vw, h: vh, c: kids, cl: 1 }; w = vw; h = vh;
  } else {
    const root = key.startsWith('milestone') ? explorerRoot(dom) : dom; spec = strip(convert(root, { x: root.x, y: root.y })); w = root.w; h = root.h; spec.x = 0; spec.y = 0;
  }
  if (!spec) continue; iconize(spec, svgs);
  const chunks = chunkSection(spec, key); const images = new Set(); (function w2(n) { if (n.img) images.add(n.img); (n.c || []).forEach(w2); })(spec);
  fs.writeFileSync(path.join(OUT, `state-${key.replace(/\//g, '-')}.json`), JSON.stringify({ key, chunks, images: [...images], w, h }));
  summary[key] = { chunks: chunks.length, KB: Math.round(size(chunks) / 1024), w: Math.round(w), h: Math.round(h) };
}
console.log(JSON.stringify(summary, null, 0).replace(/\},/g, '},\n'));
