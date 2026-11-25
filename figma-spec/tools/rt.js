// Figma-side runtime. Stored in figma.root sharedPluginData('tofigma','rt'); executed as AsyncFunction('figma','A', code).
// A = { parentId, nodes, iconIds? }  -> returns { top:[{n,id}], images:[[id,file,fit]], count }
const VM = new Map((await figma.variables.getLocalVariablesAsync()).map(v => [v.name, v]));
const TSM = new Map((await figma.getLocalTextStylesAsync()).map(s => [s.name, s]));
const ESM = new Map((await figma.getLocalEffectStylesAsync()).map(s => [s.name, s]));
const ICONS = JSON.parse(figma.root.getSharedPluginData('tofigma', 'icons') || '{}');
const loaded = new Set();
async function font(f) { const k = f.family + '|' + f.style; if (loaded.has(k)) return f; try { await figma.loadFontAsync(f); } catch (e) { f = { family: 'Inter', style: 'Regular' }; await figma.loadFontAsync(f); } loaded.add(k); return f; }
const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
function paint(p) {
  if (p.img) return { type: 'SOLID', color: rgb('#E5E7EB') };
  if (p.g) return { type: p.g === 'L' ? 'GRADIENT_LINEAR' : 'GRADIENT_RADIAL', gradientTransform: p.t, gradientStops: p.s.map(([h, a, pos]) => ({ color: { ...rgb(h), a }, position: pos })) };
  let s = { type: 'SOLID', color: rgb(p.c), opacity: p.o == null ? 1 : p.o };
  if (p.v && VM.has(p.v)) { s.opacity = 1; s = figma.variables.setBoundVariableForPaint(s, 'color', VM.get(p.v)); }
  return s;
}
function effects(list) { return list.map(e => e.t === 'LB' ? { type: 'LAYER_BLUR', radius: e.b * 2, visible: true } : e.t === 'BB' ? { type: 'BACKGROUND_BLUR', radius: e.b * 2, visible: true } : e.t === 'D' ? { type: 'DROP_SHADOW', color: { ...rgb(e.c), a: e.o }, offset: { x: e.x, y: e.y }, radius: e.b, spread: e.s, visible: true, blendMode: 'NORMAL', showShadowBehindNode: false } : { type: 'INNER_SHADOW', color: { ...rgb(e.c), a: e.o }, offset: { x: e.x, y: e.y }, radius: e.b, spread: e.s, visible: true, blendMode: 'NORMAL' }); }
const images = []; let count = 0;
async function common(node, s) {
  if (s.o != null) node.opacity = s.o;
  if (s.hid) node.visible = false;
  if (s.es && ESM.has(s.es)) await node.setEffectStyleIdAsync(ESM.get(s.es).id); else if (s.e) node.effects = effects(s.e);
  if ('cornerRadius' in node && s.r != null) {
    if (Array.isArray(s.r)) { node.topLeftRadius = s.r[0]; node.topRightRadius = s.r[1]; node.bottomRightRadius = s.r[2]; node.bottomLeftRadius = s.r[3]; }
    else { node.cornerRadius = s.r; if (s.rv && VM.has(s.rv)) for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) node.setBoundVariable(k, VM.get(s.rv)); }
  }
  if (s.st && 'strokes' in node) { node.strokes = [paint(s.st)]; node.strokeAlign = 'INSIDE'; if (Array.isArray(s.st.w)) { node.strokeTopWeight = s.st.w[0]; node.strokeRightWeight = s.st.w[1]; node.strokeBottomWeight = s.st.w[2]; node.strokeLeftWeight = s.st.w[3]; } else node.strokeWeight = s.st.w; if (s.st.d) node.dashPattern = s.st.d; }
}
async function text(s) {
  const t = figma.createText(); const tx = s.text;
  let base;
  if (tx.st && TSM.has(tx.st)) { const st = TSM.get(tx.st); await font(st.fontName); await t.setTextStyleIdAsync(st.id); base = st.fontName; }
  else { base = await font({ family: tx.ff || 'Inter', style: tx.fs || 'Regular' }); t.fontName = base; if (tx.sz) t.fontSize = tx.sz; if (tx.lh) t.lineHeight = { unit: 'PIXELS', value: tx.lh }; if (tx.ls) t.letterSpacing = { unit: 'PIXELS', value: tx.ls }; if (tx.up) t.textCase = 'UPPER'; }
  if (tx.cap) t.textCase = 'TITLE';
  t.characters = tx.t;
  if (tx.col) t.fills = [paint(tx.col)];
  if (tx.ta) t.textAlignHorizontal = tx.ta === 'center' ? 'CENTER' : tx.ta === 'right' ? 'RIGHT' : 'JUSTIFIED';
  if (tx.dec) t.textDecoration = 'UNDERLINE';
  for (const [a, b, o] of tx.runs || []) { if (b > tx.t.length || a >= b) continue;
    if (o.ff) { const f = await font({ family: o.ff, style: o.fs }); t.setRangeFontName(a, b, f); }
    if (o.sz) t.setRangeFontSize(a, b, o.sz);
    if (o.col) t.setRangeFills(a, b, [paint(o.col)]);
    if (o.g) t.setRangeFills(a, b, [paint(o.g)]);
    if (o.dec) t.setRangeTextDecoration(a, b, o.dec === 'U' ? 'UNDERLINE' : 'STRIKETHROUGH'); }
  const centered = tx.ta === 'center' || tx.ta === 'right';
  if (s.auto === 'W' && !centered) { t.textAutoResize = 'WIDTH_AND_HEIGHT'; }
  else { t.resize(Math.max(1, s.w + (centered ? 2 : 1)), Math.max(1, s.h)); t.textAutoResize = 'HEIGHT'; if (centered) s._dx = -1; }
  return t;
}
async function build(s, parent, parentAL) {
  let node;
  if (s.k === 'T') node = await text(s);
  else if (s.k === 'V') { try { node = figma.createNodeFromSvg(s.svg); } catch (e) { node = figma.createFrame(); node.fills = []; } node.resize(Math.max(s.w, 0.01), Math.max(s.h, 0.01)); }
  else if (s.k === 'IC' && ICONS[s.ic]) { const comp = await figma.getNodeByIdAsync(ICONS[s.ic]); node = comp.createInstance(); const sc = s.w / comp.width; if (Math.abs(sc - 1) > 0.01) node.rescale(sc); if (s.icol) { const c = { type: 'SOLID', color: rgb(s.icol), opacity: s.icoa == null ? 1 : s.icoa }; for (const v of node.findAll(n => 'strokes' in n && n.type !== 'INSTANCE')) { if (v.strokes && v.strokes.length) v.strokes = [c]; if (v.type !== 'FRAME' && v.fills && v.fills.length && v.fills[0].type === 'SOLID') v.fills = [c]; } } }
  else if (s.k === 'I') { node = figma.createRectangle(); node.resize(Math.max(s.w, 0.01), Math.max(s.h, 0.01)); node.fills = [{ type: 'SOLID', color: rgb('#E5E7EB') }]; images.push([node.id, s.img, s.fit]); }
  else { node = figma.createFrame(); node.resize(Math.max(s.w, 0.01), Math.max(s.h, 0.01)); node.fills = (s.f || []).map(paint); node.clipsContent = !!s.cl; for (const p of s.f || []) if (p.img) images.push([node.id, p.img, p.fit, 'bg']); }
  node.name = s.n || node.name; count++;
  parent.appendChild(node);
  if (s.k !== 'T' && s.k !== 'IC' && s.k !== 'V') await common(node, s); else if (s.k === 'V' || s.k === 'IC') { if (s.o != null) node.opacity = s.o; if (s.e || s.es) await common(node, { e: s.e, es: s.es }); }
  if (s.k === 'I') await common(node, s);
  const inAL = parentAL && !s.ab && !s.rt;
  if (parentAL && (s.ab || s.rt)) node.layoutPositioning = 'ABSOLUTE';
  if (s.rt) node.relativeTransform = s.rt;
  else if (!inAL) { node.x = s.x + (s._dx || 0); node.y = s.y; }
  if (s.al && node.type === 'FRAME') {
    const a = s.al; node.layoutMode = a.d === 'V' ? 'VERTICAL' : 'HORIZONTAL'; node.primaryAxisSizingMode = 'FIXED'; node.counterAxisSizingMode = 'FIXED';
    node.itemSpacing = a.g; node.paddingTop = a.p[0]; node.paddingRight = a.p[1]; node.paddingBottom = a.p[2]; node.paddingLeft = a.p[3];
    node.primaryAxisAlignItems = 'MIN'; node.counterAxisAlignItems = a.ca; node.resize(Math.max(s.w, 0.01), Math.max(s.h, 0.01));
    if (a.gv && VM.has(a.gv)) node.setBoundVariable('itemSpacing', VM.get(a.gv));
    if (a.pv) ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach((k, i) => { if (a.pv[i] && VM.has(a.pv[i])) node.setBoundVariable(k, VM.get(a.pv[i])); });
  }
  if (s.ph) { const t = figma.createText(); await font({ family: 'Inter', style: 'Medium' }); t.fontName = { family: 'Inter', style: 'Medium' }; t.fontSize = 14; t.characters = '▶ ' + s.ph.label + (s.ph.url ? '\n' + s.ph.url.slice(0, 120) + '…' : ''); t.fills = [{ type: 'SOLID', color: rgb('#4A5565') }]; node.appendChild(t); t.x = 24; t.y = 24; t.resize(Math.max(40, s.w - 48), t.height); t.textAutoResize = 'HEIGHT'; if (s.ph.url) t.setRangeHyperlink(0, t.characters.length, { type: 'URL', value: s.ph.url }); }
  for (const c of s.c || []) await build(c, node, !!s.al);
  return node;
}
const parent = await figma.getNodeByIdAsync(A.parentId);
const top = [];
for (const s of A.nodes) { const n = await build(s, parent, parent.layoutMode && parent.layoutMode !== 'NONE'); top.push({ n: n.name, id: n.id }); }
return { top, images, count };
