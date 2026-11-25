const { chromium } = require('playwright');
const fs = require('fs');
const { INTER } = require('./lib');
const [route, name, vw] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +vw, height: 900 } });
  await p.addInitScript(css => { document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }); }, INTER);
  await p.goto('https://sofia-alvarez-ux-iu.vercel.app' + route, { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H + 800; y += 400) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(80); }
  await p.waitForTimeout(800);
  // tag candidates
  const n = await p.evaluate(() => {
    const els = [...document.querySelectorAll('a,button,[role=button],[tabindex="0"],.group,[class*="hover:"],[class*="cursor-pointer"]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; });
    const seen = new Map(); let i = 0;
    for (const e of els) { const sig = e.tagName + '|' + (e.getAttribute('class') || '').replace(/\s+/g, ' ').slice(0, 300) + '|' + e.childElementCount; if (seen.has(sig)) continue; seen.set(sig, 1); e.setAttribute('data-hv', i++); }
    return i;
  });
  const KEYS = ['color','backgroundColor','backgroundImage','borderTopColor','borderLeftColor','boxShadow','opacity','transform','filter','textDecorationLine','gap','columnGap','width','translate','scale'];
  const out = [];
  for (let i = 0; i < n; i++) {
    const sel = `[data-hv="${i}"]`;
    const snap = () => p.evaluate(([sel, KEYS]) => { const root = document.querySelector(sel); if (!root) return null; const all = [root, ...root.querySelectorAll('*')].slice(0, 60); return all.map((e, j) => { const cs = getComputedStyle(e); const o = {}; for (const k of KEYS) o[k] = cs[k]; o._t = e.tagName; o._txt = (e.childNodes[0]?.nodeType === 3 ? e.childNodes[0].textContent.trim().slice(0, 20) : ''); return o; }); }, [sel, KEYS]);
    try {
      await p.locator(sel).scrollIntoViewIfNeeded({ timeout: 2000 });
      await p.mouse.move(2, 2); await p.waitForTimeout(350);
      const before = await snap();
      await p.locator(sel).hover({ timeout: 2000, force: true }); await p.waitForTimeout(650);
      const after = await snap();
      if (!before || !after) continue;
      const diffs = [];
      before.forEach((bo, j) => { const ao = after[j]; if (!ao) return; for (const k of KEYS) if (bo[k] !== ao[k]) diffs.push({ j, t: bo._t, txt: bo._txt, k, from: bo[k], to: ao[k] }); });
      if (diffs.length) {
        const meta = await p.evaluate(sel => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: (e.getAttribute('class') || '').slice(0, 200), txt: e.innerText.trim().replace(/\s+/g, ' ').slice(0, 60), al: e.getAttribute('aria-label'), y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }; }, sel);
        out.push({ ...meta, diffs });
      }
    } catch (e) { }
  }
  const dir = `/home/user/Portafolio-web/figma-spec/${name}/${vw}`;
  fs.writeFileSync(`${dir}/hover.json`, JSON.stringify(out, null, 1));
  console.log(name, 'candidates', n, 'with hover', out.length);
  await b.close();
})();
