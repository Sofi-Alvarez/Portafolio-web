const AF = Object.getPrototypeOf(async function () { }).constructor; const rt = new AF('figma', 'A', figma.root.getSharedPluginData('tofigma', 'rt'));
const carrier = await figma.getNodeByIdAsync(A.carrier); const P = JSON.parse(carrier.findOne(n => n.type === 'TEXT').characters); carrier.remove();
const page = await figma.getNodeByIdAsync(A.pageId); await figma.setCurrentPageAsync(page);
const hashes = JSON.parse(figma.root.getSharedPluginData('tofigma', 'hashes')); const icons = JSON.parse(figma.root.getSharedPluginData('tofigma', 'icons'));
const old = page.children.find(n => n.name === P.set); if (old) old.remove();
const comps = [];
for (const v of P.variants) {
  const c = figma.createComponent(); c.name = 'Vista=' + v.name; c.resize(v.w, v.h); c.fills = []; c.clipsContent = false;
  const keys = {}; const images = [];
  for (const ch of v.chunks) { const r = await rt(figma, { parentId: ch.p ? keys[ch.p] : c.id, nodes: ch.nodes }); if (ch.k) keys[ch.k] = r.top[0].id; images.push(...r.images); }
  for (const [id, img, fit] of images) { const n = await figma.getNodeByIdAsync(id); if (!n) continue; const base = img.replace('#inv', '');
    if (/\.svg$/.test(base) && icons['Img/' + base]) { const comp = await figma.getNodeByIdAsync(icons['Img/' + base]); const inst = comp.createInstance(); n.parent.insertChild(n.parent.children.indexOf(n) + 1, inst); inst.rescale(Math.min(n.width / comp.width, n.height / comp.height)); if (n.parent.layoutMode && n.parent.layoutMode !== 'NONE') inst.layoutPositioning = 'ABSOLUTE'; inst.x = n.x + (n.width - inst.width) / 2; inst.y = n.y + (n.height - inst.height) / 2; n.fills = []; continue; }
    if (hashes[base]) { const f = { type: 'IMAGE', imageHash: hashes[base], scaleMode: fit === 'FIT' ? 'FIT' : 'FILL' }; n.fills = n.type === 'RECTANGLE' ? [f] : [...n.fills, f]; } }
  comps.push({ c, name: v.name });
}
const set = figma.combineAsVariants(comps.map(x => x.c), page); set.name = P.set;
set.layoutMode = 'HORIZONTAL'; set.layoutWrap = 'WRAP'; set.itemSpacing = 80; set.counterAxisSpacing = 80; set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = 64;
set.primaryAxisSizingMode = 'FIXED'; set.resize(Math.min(3 * (P.variants[0].w + 80) + 48, 4000), 100); set.counterAxisSizingMode = 'AUTO';
set.fills = [{ type: 'SOLID', color: { r: 0.976, g: 0.98, b: 0.984 } }]; set.cornerRadius = 32; set.x = A.x; set.y = A.y;
set.description = A.desc || 'Todas las vistas del bloque interactivo. Las pestañas, filas, acordeones y flechas están conectadas con interacciones (Change to).';
// wiring
const base = n => n.split(' · ')[0];
const byName = Object.fromEntries(comps.map(x => [x.name, x.c]));
const T = (id, dest) => ({ trigger: { type: 'ON_CLICK' }, actions: [{ type: 'NODE', destinationId: dest.id, navigation: 'CHANGE_TO', transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_OUT' }, duration: 0.3 }, preserveScrollPosition: false, resetVideoPosition: false }] });
let wired = 0;
for (const { c, name } of comps) {
  const B = base(name); const details = comps.filter(x => base(x.name) === B && x.name !== B);
  for (const btn of c.findAll(n => n.name.startsWith('Button / '))) {
    const label = btn.name.slice(9); const tab = label.split(' — ')[0].trim();
    let dest = null;
    if (label.includes(' — ') && byName[tab]) dest = byName[tab];
    else if (/^(Cita|Wireframe|Anterior|Siguiente)/.test(label) && A.carousel) { const idx = comps.findIndex(x => x.c === c); const fam = comps.filter(x => base(x.name) === B); const pos = fam.findIndex(x => x.c === c); const nxt = /siguiente|Siguiente/.test(label) ? fam[(pos + 1) % fam.length] : fam[(pos - 1 + fam.length) % fam.length]; if (nxt && nxt.c !== c) dest = nxt.c; }
    else if (/^Ir a (wireframe|imagen) (\d+)/i.test(label) && A.carousel) { const k = +label.match(/(\d+)/)[1]; const fam = comps.filter(x => base(x.name) === B); if (fam[k - 1] && fam[k - 1].c !== c) dest = fam[k - 1].c; }
    else { const d = details.find(x => label.toLowerCase().includes(x.name.split(' · ')[1].toLowerCase())); if (d && d.c !== c) dest = d.c; else if (name !== B && byName[B]) dest = byName[B]; else if (details.length === 1 && !/Cita|Anterior|Siguiente|Ir a/.test(label)) dest = details[0].c; }
    if (dest && dest !== c) { await btn.setReactionsAsync([T(btn.id, dest)]); wired++; }
  }
}
// replace main-frame block with instance of default variant
let replaced = null;
if (A.mainFrame) { const main = await figma.getNodeByIdAsync(A.mainFrame); const sec = main.findOne(n => n.name === A.sectionName); const dv = comps[0];
  const cand = sec ? sec.findAll(n => n.type === 'FRAME' && Math.abs(n.width - dv.c.width) < 1.5 && Math.abs(n.height - dv.c.height) < 1.5) : [];
  if (cand.length) { const t = cand[0]; const inst = dv.c.createInstance(); const p = t.parent; p.insertChild(p.children.indexOf(t), inst); if (p.layoutMode && p.layoutMode !== 'NONE' && t.layoutPositioning !== 'ABSOLUTE') { } else { inst.x = t.x; inst.y = t.y; } if (t.layoutPositioning === 'ABSOLUTE') { inst.layoutPositioning = 'ABSOLUTE'; inst.x = t.x; inst.y = t.y; } inst.name = P.set; t.remove(); replaced = inst.id; } }
return { set: set.id, variants: comps.length, wired, replaced, h: Math.round(set.height) };
