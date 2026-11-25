// DOM dump (dom.json) -> compact Figma build spec.  Usage: node compile.js <dom.json> [rootSelectorIndexPath]
const { parse, hex } = require('./color');
const T = require('./tokens');

// ---------- token lookup ----------
const ck = (c) => c ? hex(c) + '@' + Math.round(c.a * 100) : null;
const primByKey = {};
for (const [n, [h, a]] of Object.entries(T.P)) { const k = h.toUpperCase() + '@' + Math.round(a * 100); if (!primByKey[k]) primByKey[k] = n; }
const semByUse = { T: {}, F: {}, S: {} };
for (const [n, p, sc] of T.S) { const [h, a] = T.P[p]; const k = h.toUpperCase() + '@' + Math.round(a * 100); if (!semByUse[sc][k]) semByUse[sc][k] = n; }
function colorVar(c, use) { const k = ck(c); return semByUse[use][k] || primByKey[k] || null; }
const spaceByVal = {}; for (const [k, v] of Object.entries(T.SPACE)) spaceByVal[v] = 'space/' + k.replace('.', '-');
const radByVal = {}; for (const [k, v] of Object.entries(T.RADIUS)) radByVal[v] = 'radius/' + k;
const tsKey = (fam, size, w, it, lh, ls, up) => [fam, size, w, it ? 1 : 0, Math.round(lh * 100), Math.round(ls * 100), up ? 1 : 0].join('|');
const tsByKey = {}; for (const [n, f, s, w, it, lh, ls, up] of T.TS) tsByKey[tsKey(f, s, w, it, lh, ls, up)] = n;
const fxKey = (list) => list.map(e => [e.t, e.c, Math.round(e.o * 1000), e.x, e.y, e.b, e.s].join(',')).join(';');
const fxByKey = {}; for (const [n, list] of T.FX) fxByKey[fxKey(list.map(([t, h, a, x, y, b, s]) => ({ t, c: h, o: a, x, y, b, s })))] = n;

// ---------- helpers ----------
const px = (v) => v == null ? 0 : parseFloat(v) || 0;
const r1 = (v) => Math.round(v * 100) / 100;
function solid(str, use) { const c = parse(str); if (!c || c.a === 0) return null; const p = { c: hex(c) }; if (c.a < 1) p.o = r1(c.a); const v = colorVar(c, use); if (v) p.v = v; return p; }
function family(ff) { ff = ff || ''; if (/Instrument Serif/i.test(ff)) return 'Instrument Serif'; if (/Manrope/i.test(ff)) return 'Manrope'; if (/Poppins/i.test(ff)) return 'Poppins'; if (/Recursive/i.test(ff)) return 'Recursive'; if (/JetBrains|monospace|ui-monospace/i.test(ff)) return 'JetBrains Mono'; if (/^"?Roboto/i.test(ff)) return 'Roboto'; return 'Inter'; }
function splitTop(s) { const out = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; }
function parseStops(parts) {
  const stops = []; for (const p of parts) { const m = p.match(/^(.*?\))\s*([\d.]+%)?\s*([\d.]+%)?$/) || p.match(/^(\S+)\s*([\d.]+%)?$/); if (!m) continue; const c = parse(m[1]); if (!c) continue; stops.push({ c, p: m[2] != null ? parseFloat(m[2]) / 100 : null }); if (m[3]) stops.push({ c, p: parseFloat(m[3]) / 100 }); }
  if (!stops.length) return null; if (stops[0].p == null) stops[0].p = 0; if (stops[stops.length - 1].p == null) stops[stops.length - 1].p = 1;
  for (let i = 1; i < stops.length - 1; i++) if (stops[i].p == null) { let j = i; while (stops[j].p == null) j++; const a = stops[i - 1].p, b = stops[j].p; for (let k = i; k < j; k++) stops[k].p = a + (b - a) * (k - i + 1) / (j - i + 1); }
  for (let i = 0; i < stops.length; i++) if (stops[i].c.a === 0) { const nb = stops.slice(i + 1).find(x => x.c.a > 0) || stops.slice(0, i).reverse().find(x => x.c.a > 0); if (nb) stops[i].c = { ...nb.c, a: 0 }; }
  return stops.map(s => [hex(s.c), r1(s.c.a), r1(Math.min(1, Math.max(0, s.p)))]);
}
function gradient(str, w, h) {
  const m = str.match(/^(repeating-)?(linear|radial)-gradient\((.*)\)$/s); if (!m) return null;
  const parts = splitTop(m[3]); const kind = m[2];
  if (kind === 'linear') {
    let dx = 0, dy = 1; let first = parts[0];
    if (/^to /.test(first) || /deg$/.test(first) || /turn$/.test(first)) { parts.shift(); first = first.replace(/ in \w+$/, '');
      if (/deg$/.test(first)) { const t = parseFloat(first) * Math.PI / 180; dx = Math.sin(t); dy = -Math.cos(t); }
      else { const r = /right/.test(first), l = /left/.test(first), b = /bottom/.test(first), tp = /top/.test(first);
        if ((r || l) && (b || tp)) { dx = (r ? 1 : -1) * h; dy = (b ? 1 : -1) * w; const n = Math.hypot(dx, dy); dx /= n; dy /= n; } else { dx = r ? 1 : l ? -1 : 0; dy = b ? 1 : tp ? -1 : 0; } } }
    else if (/^in \w+/.test(first)) parts.shift();
    const L = Math.abs(w * dx) + Math.abs(h * dy) || 1; const cx = w / 2, cy = h / 2; const P0x = cx - dx * L / 2, P0y = cy - dy * L / 2; const pxv = -dy, pyv = dx;
    const t = [[w * dx / L, h * dy / L, -(P0x * dx + P0y * dy) / L], [w * pxv / L, h * pyv / L, 0.5 - (cx * pxv + cy * pyv) / L]];
    const s = parseStops(parts); if (!s) return null; return { g: 'L', t: t.map(r => r.map(r1x)), s };
  }
  // radial
  let rx = w * Math.SQRT1_2 * 1.0, ry = h * Math.SQRT1_2, cx = w / 2, cy = h / 2; const first = parts[0];
  if (!/^(rgb|oklab|oklch|#|transparent|hsl|color)/.test(first)) { parts.shift(); const [sz, pos] = first.split(/\s+at\s+/);
    if (pos) { const pp = pos.trim().split(/\s+/); const kw = { left: 0, center: 50, right: 100, top: 0, bottom: 100 }; const toPx = (v, d) => v.endsWith('%') ? parseFloat(v) / 100 * d : v.endsWith('px') ? parseFloat(v) : (kw[v] ?? 50) / 100 * d; cx = toPx(pp[0] || 'center', w); cy = toPx(pp[1] || pp[0] === 'center' ? (pp[1] || 'center') : 'center', h); if (pp[1]) cy = toPx(pp[1], h); }
    const sz2 = (sz || '').trim().split(/\s+/).filter(x => /%|px/.test(x)); const circle = /circle/.test(sz || '');
    if (sz2.length) { const toL = (v, d) => v.endsWith('%') ? parseFloat(v) / 100 * d : parseFloat(v); rx = toL(sz2[0], w); ry = sz2[1] ? toL(sz2[1], h) : (circle ? rx : toL(sz2[0], h)); }
    else { const dxm = Math.max(cx, w - cx), dym = Math.max(cy, h - cy); if (/closest-side/.test(sz)) { const a = Math.min(cx, w - cx), b = Math.min(cy, h - cy); rx = circle ? Math.min(a, b) : a; ry = circle ? rx : b; } else if (circle) { rx = ry = Math.hypot(dxm, dym); } else { rx = dxm * Math.SQRT2; ry = dym * Math.SQRT2; } } }
  const t = [[w * 0.5 / rx, 0, 0.5 - cx * 0.5 / rx], [0, h * 0.5 / ry, 0.5 - cy * 0.5 / ry]];
  const s = parseStops(parts); if (!s) return null; return { g: 'R', t: t.map(r => r.map(r1x)), s };
}
function r1x(v) { return Math.round(v * 10000) / 10000; }
function bgPaints(st, w, h) {
  const out = []; const base = st.backgroundColor ? solid(st.backgroundColor, 'F') : null; if (base) out.push(base);
  const bi = st.backgroundImage; if (bi && bi !== 'none') { const layers = splitTop(bi).reverse(); for (const L of layers) { if (L.startsWith('url(')) { const u = L.match(/url\("?([^")]+)"?\)/)[1]; out.push({ img: imgName(u), fit: st.backgroundSize === 'contain' ? 'FIT' : 'FILL' }); } else { const g = gradient(L, w, h); if (g) out.push(g); } } }
  return out;
}
function imgName(u) { if (u.startsWith('data:')) return 'data:' + u.length; return decodeURIComponent(u.split('/').pop().split('?')[0]); }
function shadows(str) {
  if (!str || str === 'none') return [];
  return splitTop(str).map(s => { const inset = /inset/.test(s); const cm = s.match(/(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\)|#[0-9a-f]+)/i); const c = cm ? parse(cm[1]) : null; const nums = s.replace(cm ? cm[1] : '', '').replace('inset', '').trim().split(/\s+/).map(px); if (!c || c.a === 0) return null; return { t: inset ? 'I' : 'D', c: hex(c), o: r1(c.a), x: nums[0] || 0, y: nums[1] || 0, b: nums[2] || 0, s: nums[3] || 0 }; }).filter(Boolean);
}
const SEM = new Set(['section', 'nav', 'header', 'footer', 'article', 'button', 'a', 'main', 'aside', 'figure', 'li', 'ul', 'ol', 'form', 'blockquote', 'dialog']);
function visual(n) { const s = n.s || {}; return !!((s.backgroundColor && parse(s.backgroundColor)?.a > 0) || (s.backgroundImage && s.backgroundImage !== 'none') || px(s.borderTopWidth) || px(s.borderLeftWidth) || px(s.borderRightWidth) || px(s.borderBottomWidth) || (s.boxShadow && shadows(s.boxShadow).length) || (s.opacity && +s.opacity < 1) || (s.filter && s.filter !== 'none') || (s.backdropFilter && s.backdropFilter !== 'none') || n.rot || (s.overflow && /hidden|clip|auto|scroll/.test(s.overflow))); }

// ---------- naming ----------
const SECTION_NAMES = { home: 'Hero', projects: 'Proyectos', about: 'Sobre mí', skills: 'Habilidades', contact: 'Contacto', inicio: 'Portada', proyecto: 'El proyecto', metodologia: 'Metodología', empatizar: 'Empatizar', definir: 'Definir', idear: 'Idear', prototipar: 'Prototipar', prueba: 'Prueba' };
function nameOf(n, textHint) {
  const cl = n.cls || '';
  if (n.t === 'svg') { const m = cl.match(/lucide-([a-z0-9-]+)/); return 'Icon / ' + (m ? m[1] : 'svg'); }
  if (n.t === 'img') return 'Image / ' + (n.alt ? n.alt.slice(0, 40) : imgName(n.src || ''));
  if (n.t === 'section') return 'Section / ' + (SECTION_NAMES[n.id] || n.id || (textHint || '').slice(0, 30) || 'section');
  if (n.t === 'nav') return 'Navbar'; if (n.t === 'footer') return 'Footer';
  if (n.t === 'button') return 'Button / ' + (n.al || textHint || '').slice(0, 40);
  if (n.t === 'a') return 'Link / ' + (n.al || textHint || '').slice(0, 40);
  if (n.t === 'article') return 'Card / ' + (textHint || '').slice(0, 40);
  if (n.t === 'iframe') return 'Embed / Figma prototype';
  if (n.text != null) return (n.text || '').replace(/\s+/g, ' ').trim().slice(0, 40) || 'Text';
  return n.t === 'div' || n.t === 'span' ? 'Frame' : n.t;
}
function firstText(n) { if (n.text) return n.text.replace(/\s+/g, ' ').trim(); for (const c of n.c || []) { const t = firstText(c); if (t) return t; } return ''; }

// ---------- text ----------
const WN = { 100: 'Thin', 200: 'Extra Light', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'Semi Bold', 700: 'Bold', 800: 'Extra Bold', 900: 'Black' };
function fontStyle(fam, w, it) {
  w = Math.round(w / 100) * 100;
  if (fam === 'Instrument Serif') return it ? 'Italic' : 'Regular';
  if (fam === 'JetBrains Mono') return w >= 700 ? (it ? 'Bold Italic' : 'Bold') : (it ? 'Italic' : 'Regular');
  if (fam === 'Manrope') return { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'ExtraBold' }[w] || 'Regular';
  if (fam === 'Recursive') return 'Sans Linear';
  if (fam === 'Poppins' || fam === 'Roboto') { const m = { 100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' }[w]; return it ? (m === 'Regular' ? 'Italic' : m + ' Italic') : m; }
  const s = WN[w] || 'Regular'; return it ? (s === 'Regular' ? 'Italic' : s + ' Italic') : s;
}
function textSpec(n, box) {
  const s = n.s; const fam = family(s.fontFamily); const size = px(s.fontSize); const w = +s.fontWeight || 400; const it = s.fontStyle === 'italic';
  const lh = s.lineHeight === 'normal' ? null : px(s.lineHeight); const ls = s.letterSpacing === 'normal' ? 0 : px(s.letterSpacing); const up = s.textTransform === 'uppercase';
  // build chars from runs, collapsing whitespace
  let chars = ''; const runs = []; const pre = /pre/.test(s.whiteSpace || '');
  for (const r of n.runs || []) { let t = r.t; if (t === '\n') { chars += '\n'; continue; } if (!pre) t = t.replace(/\s+/g, ' '); if (!pre && (chars.endsWith(' ') || chars.endsWith('\n') || chars === '') && t.startsWith(' ')) t = t.slice(1); if (!t) continue; const st = chars.length; chars += t; runs.push([st, chars.length, r.s]); }
  if (!pre) { const lead = chars.length - chars.trimStart().length; chars = chars.trim(); for (const r of runs) { r[0] = Math.max(0, r[0] - lead); r[1] = Math.min(chars.length, r[1] - lead); } }
  chars = chars.replace(/ \n/g, '\n');
  const spec = { t: chars };
  const style = lh != null ? tsByKey[tsKey(fam, size, w, it, lh, ls, up)] : null;
  if (style) spec.st = style; else { spec.ff = fam; spec.fs = fontStyle(fam, w, it); spec.sz = size; if (lh != null) spec.lh = lh; if (ls) spec.ls = ls; if (up) spec.up = 1; }
  if (s.textTransform === 'capitalize') spec.cap = 1;
  const baseCol = solid(s.WebkitTextFillColor && s.WebkitTextFillColor !== s.color && parse(s.WebkitTextFillColor)?.a > 0 ? s.WebkitTextFillColor : s.color, 'T'); if (baseCol) spec.col = baseCol;
  if (s.textAlign && /center|right|end|justify/.test(s.textAlign)) spec.ta = s.textAlign === 'end' ? 'right' : s.textAlign;
  // runs with differing style
  const rr = [];
  for (const [a, b, rs] of runs) { if (a >= b) continue; const o = {}; const c2 = rs.WebkitTextFillColor && parse(rs.WebkitTextFillColor)?.a === 0 && rs.backgroundImage ? null : solid(rs.color, 'T');
    if (rs.backgroundImage && parse(rs.WebkitTextFillColor || '')?.a === 0) { const g = gradient(splitTop(rs.backgroundImage)[0], box.w, box.h); if (g) o.g = g; }
    else if (c2 && (c2.c !== spec.col?.c || c2.o !== spec.col?.o)) o.col = c2;
    const rw = +rs.fontWeight || w; const rit = rs.fontStyle === 'italic'; const rfam = family(rs.fontFamily);
    if (rw !== w || rit !== it || rfam !== fam) { o.ff = rfam; o.fs = fontStyle(rfam, rw, rit); }
    if (rs.fontSize && px(rs.fontSize) !== size) o.sz = px(rs.fontSize);
    if (rs.textDecorationLine && rs.textDecorationLine !== 'none' && /underline|line-through/.test(rs.textDecorationLine)) o.dec = /underline/.test(rs.textDecorationLine) ? 'U' : 'S';
    if (Object.keys(o).length) rr.push([a, b, o]); }
  if (rr.length) spec.runs = rr;
  if (s.textDecorationLine && /underline/.test(s.textDecorationLine)) spec.dec = 'U';
  return spec;
}

// ---------- tree transform ----------
let IMAGES = new Set(), NOTES = [];
function convert(n, parentAbs, opts = {}) {
  const s = n.s || {}; const out = { n: nameOf(n, firstText(n)) };
  const X = n.x, Y = n.y, W = n.w, H = n.h;
  out.x = r1(X - parentAbs.x); out.y = r1(Y - parentAbs.y); out.w = r1(Math.max(W, 0.01)); out.h = r1(Math.max(H, 0.01));
  if (n.rot) { const t = n.rot * Math.PI / 180, cs = Math.cos(t), sn = Math.sin(t); const cx = X + W / 2 - parentAbs.x, cy = Y + H / 2 - parentAbs.y; out.rt = [[r1x(cs), r1x(-sn), r1(cx + cs * (-W / 2) - sn * (-H / 2))], [r1x(sn), r1x(cs), r1(cy + sn * (-W / 2) + cs * (-H / 2))]]; }
  if (s.opacity && +s.opacity < 1) out.o = r1(+s.opacity);
  if (s.position === 'absolute' || s.position === 'fixed') out.ab = 1;
  if (s.visibility === 'hidden') out.hid = 1;
  // radius
  const rad = [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius].map(v => { if (!v) return 0; if (/%/.test(v)) return Math.min(W, H) * parseFloat(v) / 100; return Math.min(px(v), Math.min(W, H) / 2); }).map(r1);
  if (rad.some(Boolean)) { if (rad.every(r => r === rad[0])) { out.r = rad[0]; const full = rad[0] >= Math.min(W, H) / 2 - 0.5 && px(s.borderTopLeftRadius) > 1000; if (full) out.rv = 'radius/full'; else if (radByVal[rad[0]]) out.rv = radByVal[rad[0]]; } else out.r = rad; }
  // effects
  const fx = shadows(s.boxShadow); const eff = [...fx];
  const blur = n.t === 'img' ? null : (s.filter || '').match(/blur\(([\d.]+)px\)/); if (blur) eff.push({ t: 'LB', b: +blur[1] });
  const bblur = (s.backdropFilter || '').match(/blur\(([\d.]+)px\)/); if (bblur) eff.push({ t: 'BB', b: +bblur[1] });
  if (eff.length) { const k = fxKey(fx); if (fx.length && fxByKey[k] && fx.length === eff.length) out.es = fxByKey[k]; else out.e = eff; }

  if (n.t === '#text') { const ts = textSpec({ ...n, runs: [{ t: n.text, s: { color: s.color, fontWeight: s.fontWeight, fontStyle: s.fontStyle, fontSize: s.fontSize, fontFamily: s.fontFamily, letterSpacing: s.letterSpacing, textTransform: s.textTransform, WebkitTextFillColor: s.WebkitTextFillColor } }] }, { w: W, h: H }); if (!ts.t) return null; out.k = 'T'; out.n = ts.t.slice(0, 40); out.text = ts; n._lines = n.lines; out.auto = guessAuto(n, ts); if (n.lines === 1 && ts.t.length <= 3) { out.auto = 'H'; ts.ta = 'center'; out.w = r1(out.w - 2); } if (out.auto === 'H') { const lh2 = ts.lh || (ts.st ? (T.TS.find(x => x[0] === ts.st) || [])[5] : null); if (lh2 && n.lines) { const tH2 = n.lines * lh2; out.y = r1(out.y + (H - tH2) / 2); out.h = r1(tH2); } } return out; }
  if (n.t === 'svg') { out.k = 'V'; out.svg = n.svg; return out; }
  if (n.t === 'img') { const ipl = px(s.paddingLeft), ipt = px(s.paddingTop), ipr = px(s.paddingRight), ipb = px(s.paddingBottom); if (ipl || ipt || ipr || ipb) { out.x = r1(out.x + ipl); out.y = r1(out.y + ipt); out.w = r1(W - ipl - ipr); out.h = r1(H - ipt - ipb); }
    out.k = 'I'; out.img = imgName(n.src || '') + (/invert/.test(s.filter || '') ? '#inv' : ''); IMAGES.add(out.img); out.fit = n.of === 'contain' ? 'FIT' : n.of === 'cover' ? 'FILL' : 'FILL'; const bg = bgPaints(s, W, H); if (bg.length) out.f = bg; return out; }
  if (n.t === 'iframe' || n.t === 'video' || n.t === 'canvas') { out.k = 'F'; out.f = [{ c: '#F3F4F6', v: 'bg/muted' }]; out.ph = { label: n.t === 'iframe' ? 'Prototipo de Figma embebido (iframe)' : n.t, url: n.src }; NOTES.push({ type: 'embed', name: out.n, url: n.src }); return out; }
  const fills = bgPaints(s, W, H); if (fills.length) out.f = fills;
  const bw = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth].map(px);
  if (bw.some(Boolean)) { const colStr = s.borderTopColor || s.borderLeftColor || s.borderBottomColor || s.borderRightColor; const sc = colStr ? solid(colStr, 'S') : null; if (sc) { out.st = { ...sc, w: bw.every(b => b === bw[0]) ? bw[0] : bw }; if (s.borderTopStyle === 'dashed') out.st.d = [4, 4]; if (s.borderTopStyle === 'dotted') out.st.d = [1, 2]; } }
  if (s.overflow && /hidden|clip|auto|scroll/.test(s.overflow)) out.cl = 1;
  // text block
  if (n.text != null && n.runs) {
    const pl = px(s.paddingLeft) + px(s.borderLeftWidth), pt = px(s.paddingTop) + px(s.borderTopWidth), pr = px(s.paddingRight) + px(s.borderRightWidth), pb = px(s.paddingBottom) + px(s.borderBottomWidth);
    const hasBox = out.f || out.st || out.e || out.es || pl || pt;
    const ts = textSpec(n, { w: W - pl - pr, h: H - pt - pb });
    if (!ts.t) { if (!hasBox) return null; out.k = 'F'; return out; }
    const lhPx = ts.lh || (ts.st ? (T.TS.find(x => x[0] === ts.st) || [])[5] : null) || px(s.fontSize) * 1.21;
    let cH = H - pt - pb, tH = cH, oy = 0; const lines = n.tr ? n.tr[4] : Math.max(1, Math.round(cH / lhPx));
    if (n.tr) { tH = Math.round(lines * lhPx * 100) / 100; const cy = n.tr[1] + n.tr[3] / 2; oy = Math.round((cy - (Y + pt) - tH / 2) * 100) / 100; if (Math.abs(oy) <= 1 && Math.abs(tH - cH) <= 1.5) { oy = 0; tH = cH; } }
    n._lines = lines;
    const deco = (n.deco || []).map(d => { const cv = convert(d, { x: X, y: Y }); if (cv) { cv.ab = 1; cv._abs = { x: d.x, y: d.y, w: d.w, h: d.h }; } return cv; }).filter(Boolean);
    if (!hasBox && !out.r && !deco.length && !oy && tH === cH) { out.k = 'T'; out.text = ts; out.auto = guessAuto(n, ts); if (out.auto === 'H') out.w = r1(out.w - (ts.ta ? 2 : 1)); return out; }
    out.k = 'F'; const tn = { n: out.n, k: 'T', x: r1(pl), y: r1(pt + oy), w: r1(W - pl - pr), h: r1(tH), text: ts }; tn.auto = guessAuto({ ...n, w: tn.w, h: tn.h }, ts); if (tn.auto === 'H') tn.w = r1(tn.w - (ts.ta ? 2 : 1));
    out.c = [tn, ...deco]; if (!deco.length) applyAutoLayout(out, n, [{ ...tn, _abs: { x: X + pl, y: Y + pt + oy, w: tn.w, h: tn.h } }], { x: X, y: Y, w: W, h: H }); else tn.ab = 0; return out;
  }
  // container
  out.k = 'F';
  const kids = [];
  for (const c of flattenKids(n)) { const cv = convert(c, { x: X, y: Y }); if (cv) { cv._abs = { x: c.x, y: c.y, w: c.w, h: c.h }; kids.push(cv); } }
  if (kids.length) { out.c = kids; applyAutoLayout(out, n, kids, { x: X, y: Y, w: W, h: H }); }
  else if (!visual(n) && !SEM.has(n.t) && !(n.before || n.after)) return null;
  return out;
}
function guessAuto(n, ts) { if (n._lines || n.lines) { const L = n._lines || n.lines; if (/nowrap|pre/.test(n.s.whiteSpace || '')) return 'W'; return L <= 1 && !ts.t.includes('\n') ? 'W' : 'H'; } const lh = ts.lh || (ts.st ? (T.TS.find(x => x[0] === ts.st) || [])[5] : null) || px(n.s.fontSize) * 1.3; const lines = Math.round(n.h / lh); if (/nowrap|pre/.test(n.s.whiteSpace || '')) return 'W'; return lines <= 1 && !ts.t.includes('\n') ? 'W' : 'H'; }
// collapse pure single-child wrappers & drop zero-size invisible nodes
function flattenKids(n) {
  const out = [];
  for (const c of n.c || []) {
    if ((c.w <= 0.5 || c.h <= 0.5) && !(c.c && c.c.length) && c.t !== 'svg') continue;
    if (c.w <= 1.5 && c.h <= 1.5 && c.s && c.s.position === 'absolute') continue;
    if (c.s && c.s.visibility === 'hidden' && !c.c) continue;
    let cur = c;
    while (cur.c && cur.c.length === 1 && cur.text == null && !visual(cur) && !SEM.has(cur.t) && !cur.id && !cur.al && cur.t !== 'svg' && cur.t !== 'img' && !cur.before && !cur.after && !(cur.s && (cur.s.position === 'absolute' || cur.s.position === 'fixed'))) {
      const only = cur.c[0];
      // keep wrapper box if it is larger than its child (acts as spacer/padding)
      if (Math.abs(only.w - cur.w) > 0.6 || Math.abs(only.h - cur.h) > 0.6) break;
      cur = only;
    }
    out.push(cur);
  }
  return out;
}
const near = (a, b, tol = 0.75) => Math.abs(a - b) <= tol;
function applyAutoLayout(out, n, kids, box) {
  const flow = kids.filter(k => !k.ab && !k.rt && !k.hid);
  if (!flow.length) return;
  const s = n.s || {};
  const bl = px(s.borderLeftWidth), bt = px(s.borderTopWidth), br = px(s.borderRightWidth), bb = px(s.borderBottomWidth);
  const tryDir = (dir) => {
    const A = dir === 'V' ? ['y', 'h', 'x', 'w'] : ['x', 'w', 'y', 'h'];
    const sorted = [...flow].sort((a, b) => a._abs[A[0]] - b._abs[A[0]]);
    const gaps = []; for (let i = 1; i < sorted.length; i++) { const g = sorted[i]._abs[A[0]] - (sorted[i - 1]._abs[A[0]] + sorted[i - 1]._abs[A[1]]); if (g < -0.6) return null; gaps.push(g); }
    const gap = gaps.length ? gaps[0] : 0; if (gaps.some(g => !near(g, gap))) return null;
    const start = sorted[0]._abs[A[0]] - box[A[0]];
    // cross alignment
    const cs = box[A[2]], ce = box[A[2]] + box[A[3]];
    const lefts = sorted.map(k => k._abs[A[2]] - cs), rights = sorted.map(k => ce - (k._abs[A[2]] + k._abs[A[3]])), centers = sorted.map(k => (k._abs[A[2]] + k._abs[A[3]] / 2) - (cs + ce) / 2);
    let ca = null, p1 = 0, p2 = 0;
    if (lefts.every(v => near(v, lefts[0]))) { ca = 'MIN'; p1 = lefts[0]; p2 = Math.max(0, Math.min(...rights)); }
    else if (centers.every(v => near(v, centers[0], 1))) { ca = 'CENTER'; p1 = Math.max(0, centers[0] * 2); p2 = Math.max(0, -centers[0] * 2); if (centers[0] < 0) { p1 = 0; p2 = -centers[0] * 2; } }
    else if (rights.every(v => near(v, rights[0]))) { ca = 'MAX'; p2 = rights[0]; p1 = Math.max(0, Math.min(...lefts)); }
    else return null;
    if (p1 < -0.6 || p2 < -0.6 || start < -0.6) return null;
    const last = sorted[sorted.length - 1]; const end = box[A[0]] + box[A[1]] - (last._abs[A[0]] + last._abs[A[1]]);
    return { dir, sorted, gap: Math.max(0, gap), start: Math.max(0, start), end: Math.max(0, end), ca, p1: Math.max(0, p1), p2: Math.max(0, p2) };
  };
  let res = null;
  const fd = /column/.test(s.flexDirection || '') ? 'V' : 'H';
  if (/flex/.test(s.display || '')) res = tryDir(fd) || tryDir(fd === 'V' ? 'H' : 'V'); else res = tryDir('V') || tryDir('H');
  if (!res) return;
  const al = { d: res.dir, g: r1(res.gap), ca: res.ca };
  const pad = res.dir === 'V' ? [res.start, res.p2, res.end, res.p1] : [res.p1, res.end, res.p2, res.start]; // t r b l
  // prefer exact CSS padding when it is consistent
  al.p = pad.map(r1);
  if (spaceByVal[al.g] && al.g > 0) al.gv = spaceByVal[al.g];
  al.pv = al.p.map(v => spaceByVal[v] || null); if (!al.pv.some(Boolean)) delete al.pv;
  if (/wrap/.test(s.flexWrap || '')) {} // single-line verified only
  out.al = al;
  // reorder children: flow children in sorted order first, absolute after
  const absK = kids.filter(k => !flow.includes(k));
  out.c = [...res.sorted, ...absK.map(k => { k.ab = 1; return k; })];
}
function strip(o) { if (Array.isArray(o)) return o.map(strip); if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) if (k !== '_abs') r[k] = strip(v); return r; } return o; }

function compileNode(domNode, parentAbs) { IMAGES = new Set(); NOTES = []; const res = convert(domNode, parentAbs || { x: domNode.x, y: domNode.y }); return { spec: strip(res), images: [...IMAGES], notes: NOTES }; }
module.exports = { compileNode, convert, strip };

if (require.main === module) {
  const dom = require(require('path').resolve(process.argv[2]));
  const r = compileNode(dom, { x: 0, y: 0 });
  const str = JSON.stringify(r.spec);
  let count = 0, al = 0; (function w(n) { count++; if (n.al) al++; (n.c || []).forEach(w); })(r.spec);
  console.log('nodes', count, 'autolayout', al, 'KB', Math.round(str.length / 1024), 'images', r.images.length);
}
