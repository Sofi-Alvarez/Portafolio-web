// A={carrier,pageId,mainFrame,x,vw,vh}
const AF = Object.getPrototypeOf(async function () { }).constructor; const rt = new AF('figma', 'A', figma.root.getSharedPluginData('tofigma', 'rt'));
const carrier = await figma.getNodeByIdAsync(A.carrier); const P = JSON.parse(carrier.findOne(n => n.type === 'TEXT').characters); carrier.remove();
const page = await figma.getNodeByIdAsync(A.pageId); await figma.setCurrentPageAsync(page);
const icons = JSON.parse(figma.root.getSharedPluginData('tofigma', 'icons'));
const main = await figma.getNodeByIdAsync(A.mainFrame);
for (const nm of ['Overlay / Menú abierto', 'Vista / Menú abierto']) { const o = page.children.find(n => n.name === nm); if (o) o.remove(); }
const ov = figma.createFrame(); ov.name = 'Overlay / Menú abierto'; ov.resize(A.vw, A.vh); ov.fills = []; ov.clipsContent = true; ov.x = A.x; ov.y = 0;
const keys = {}; const imgs = [];
for (const ch of P.chunks) { const r = await rt(figma, { parentId: ch.p ? keys[ch.p] : ov.id, nodes: ch.p ? ch.nodes : (ch.nodes[0].c || []) }); if (ch.k) keys[ch.k] = r.top[0].id; imgs.push(...r.images); }
for (const [id, img] of imgs) { const n = await figma.getNodeByIdAsync(id); if (n && /^logo2/.test(img)) { const comp = await figma.getNodeByIdAsync(icons['Brand/Logo=Original']); const inst = comp.createInstance(); n.parent.insertChild(n.parent.children.indexOf(n) + 1, inst); inst.rescale(n.width / comp.width); inst.x = n.x; inst.y = n.y; n.fills = []; } }
ov.overlayPositionType = 'CENTER'; ov.overlayBackground = { type: 'NONE' }; ov.overlayBackgroundInteraction = 'NONE';
// visible composed copy
const vis = main.clone(); vis.name = 'Vista / Menú abierto'; vis.resize(A.vw, A.vh); vis.clipsContent = true; vis.x = A.x + A.vw + 120; vis.y = 0; page.appendChild(vis);
const ovc = ov.clone(); vis.appendChild(ovc); ovc.x = 0; ovc.y = 0; ovc.name = 'Overlay (copia visible)';
for (const n of vis.findAll(n => n.reactions && n.reactions.length)) await n.setReactionsAsync([]);
// wiring
const close = { type: 'CLOSE' };
const R = (acts) => [{ trigger: { type: 'ON_CLICK' }, actions: acts }];
let w = 0;
const opener = main.findOne(n => /^Button \/ Abrir menú/.test(n.name)); if (opener) { await opener.setReactionsAsync(R([{ type: 'NODE', destinationId: ov.id, navigation: 'OVERLAY', transition: { type: A.vw < 500 ? 'MOVE_IN' : 'MOVE_IN', direction: 'LEFT', matchLayers: false, easing: { type: 'EASE_OUT' }, duration: 0.3 }, preserveScrollPosition: true, resetVideoPosition: false }])); w++; }
const sections = main.children.filter(n => n.name.startsWith('Section / ') || n.name === 'Footer');
const secBy = (label) => { const l = label.toLowerCase(); const map = { 'inicio': 'Hero', 'proyectos': 'Proyectos', 'sobre mí': 'Sobre mí', 'contacto': 'Contacto', 'el proyecto': 'El proyecto', 'metodología': 'Metodología', 'empatizar': 'Empatizar', 'definir': 'Definir', 'idear': 'Idear', 'prototipar': 'Prototipar', 'prueba': 'Prueba', 'mas+ bank': 'Portada', 'bookie': 'Portada', 'iupi': 'Portada', 'portfolio web': 'Portada', 'milestone': 'Portada' }; const t = map[l.trim()]; return t ? sections.find(s => s.name.replace(/ \(.*\)$/, '') === 'Section / ' + t) : null; };
for (const b of ov.findAll(n => n.name.startsWith('Button / ') || n.name.startsWith('Link / '))) {
  const label = b.name.replace(/^(Button|Link) \/ /, '').trim();
  if (/Cerrar/.test(label)) { await b.setReactionsAsync(R([close])); w++; continue; }
  const txt = (b.findOne && b.findOne(n => n.type === 'TEXT')) || null; const t = (txt ? txt.characters : label).split('\n')[0];
  const s = secBy(t) || secBy(label); if (s) { await b.setReactionsAsync(R([close, { type: 'NODE', destinationId: s.id, navigation: 'SCROLL_TO', transition: { type: 'SMART_ANIMATE', easing: { type: 'EASE_IN_AND_OUT' }, duration: 0.5 }, preserveScrollPosition: false, resetVideoPosition: false }])); w++; }
}
// backdrop (first full-size child) closes
const bd = ov.children.find(n => n.width >= A.vw - 1 && n.height >= A.vh - 1); if (bd) { await bd.setReactionsAsync(R([close])); w++; }
const nav = main.children.find(n => n.name === 'Navbar'); if (nav) nav.scrollBehavior = 'FIXED';
const fs = page.flowStartingPoints.filter(f => f.nodeId !== main.id); page.flowStartingPoints = [...fs, { nodeId: main.id, name: main.name }];
return { overlay: ov.id, visible: vis.id, wired: w };
