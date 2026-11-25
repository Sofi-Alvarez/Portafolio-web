const AF = Object.getPrototypeOf(async function () { }).constructor;
const rt = new AF('figma', 'A', figma.root.getSharedPluginData('tofigma', 'rt'));
const carrier = await figma.getNodeByIdAsync(A.carrier); const P = JSON.parse(carrier.findOne(n => n.type === 'TEXT').characters); carrier.remove();
const page = await figma.getNodeByIdAsync(A.pageId); await figma.setCurrentPageAsync(page);
const hashes = Object.assign(JSON.parse(figma.root.getSharedPluginData('tofigma', 'hashes') || '{}'), A.addHashes || {}); figma.root.setSharedPluginData('tofigma', 'hashes', JSON.stringify(hashes));
const icons = JSON.parse(figma.root.getSharedPluginData('tofigma', 'icons') || '{}');
const vars = await figma.variables.getLocalVariablesAsync();
let root = A.parentId ? await figma.getNodeByIdAsync(A.parentId) : null;
if (!root) { const old = page.children.find(n => n.name === A.frameName); if (old) old.remove();
  root = figma.createFrame(); root.name = A.frameName; root.resize(A.w, A.h); root.x = A.x || 0; root.y = A.y || 0; root.clipsContent = true;
  root.fills = A.noFill ? [] : [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', vars.find(v => v.name === 'bg/default'))]; }
const keys = {}; const images = []; let count = 0; const tops = [];
for (const ch of P.chunks) { const parentId = ch.p ? keys[ch.p] : root.id; const r = await rt(figma, { parentId, nodes: ch.nodes }); if (ch.k) keys[ch.k] = r.top[0].id; images.push(...r.images); count += r.count; tops.push(...r.top); }
const nav = root.children.find(n => n.name === 'Navbar'); if (nav) root.appendChild(nav);
const pending = []; let swapped = 0, filled = 0;
for (const [id, img, fit] of images) { const node = await figma.getNodeByIdAsync(id); if (!node) continue; const base = img.replace('#inv', '');
  if (/^logo2/.test(base) && node.type === 'RECTANGLE') { const comp = await figma.getNodeByIdAsync(icons[img.includes('#inv') ? 'Brand/Logo=Blanco' : 'Brand/Logo=Original']); const inst = comp.createInstance(); const p = node.parent; p.insertChild(p.children.indexOf(node), inst); inst.rescale(node.width / comp.width); if (!p.layoutMode || p.layoutMode === 'NONE' || node.layoutPositioning === 'ABSOLUTE') { if (node.layoutPositioning === 'ABSOLUTE') inst.layoutPositioning = 'ABSOLUTE'; inst.x = node.x; inst.y = node.y; } inst.name = 'Brand/Logo'; node.remove(); swapped++; continue; }
  if (hashes[base]) { const f = { type: 'IMAGE', imageHash: hashes[base], scaleMode: fit === 'FIT' ? 'FIT' : 'FILL' }; if (node.type === 'RECTANGLE') node.fills = [f]; else node.fills = [...node.fills.filter(x => !(x.type === 'SOLID' && x.color.r > 0.89 && x.color.r < 0.9)), f]; filled++; continue; }
  pending.push([id, base, fit]); }
return { root: root.id, count, tops: tops.length, swapped, filled, pending };
