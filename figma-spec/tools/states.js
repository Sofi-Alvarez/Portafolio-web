const { chromium } = require('playwright');
const fs = require('fs');
const { dump, INTER } = require('./lib');
const OUT = '/home/user/Portafolio-web/figma-spec';
const BASE = 'https://sofia-alvarez-ux-iu.vercel.app';
const job = JSON.parse(process.argv[2]); // {route,name,vw,vh,actions:[{type,names|name,prefix}]}
async function settle(p){ const H = await p.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H + 800; y += 400) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(100); } await p.waitForTimeout(1000); }
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: job.vw, height: job.vh || 800 } });
  const p = await ctx.newPage();
  await p.addInitScript(css => { document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }); }, INTER);
  await p.goto(BASE + job.route, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await settle(p);
  const dir = `${OUT}/${job.name}/${job.vw}`; fs.mkdirSync(dir + '/states', { recursive: true });
  if (job.full) { await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(700); fs.writeFileSync(`${dir}/dom.json`, JSON.stringify(await dump(p))); await p.screenshot({ path: `${dir}/full.png`, fullPage: true }); console.log('full ok'); }
  for (const a of job.actions || []) {
    if (a.type === 'expand') {
      const pre = p.getByRole('button', { name: new RegExp('^'+a.pre) }).first();
      await pre.scrollIntoViewIfNeeded(); await pre.click(); await p.waitForTimeout(2200);
      const secId = await pre.evaluate(e => e.closest('section[id]')?.id);
      const n = await p.evaluate(([sid, ex]) => { const bs = [...document.querySelectorAll(`section[id="${sid}"] button`)].filter(b => !(b.getAttribute('aria-label')||'').includes('—') && !/^(Anterior|Siguiente|Ir a|Cita)/.test(b.getAttribute('aria-label')||'') && (!ex || ex.some(x => b.innerText.includes(x)))); bs.slice(1).forEach(b => b.click()); return bs.length - 1; }, [secId, a.only || null]);
      await p.waitForTimeout(2200);
      fs.writeFileSync(`${dir}/states/${a.prefix}.json`, JSON.stringify(await dump(p, `section[id="${secId}"]`)));
      await p.locator(`section[id="${secId}"]`).screenshot({ path: `${dir}/states/${a.prefix}.png` });
      console.log('expand', a.prefix, n); continue;
    }
    if (a.type === 'rows') {
      const pre = p.getByRole('button', { name: new RegExp('^'+a.pre) }).first();
      await pre.scrollIntoViewIfNeeded(); await pre.click(); await p.waitForTimeout(2200);
      const secId = await pre.evaluate(e => e.closest('section[id]')?.id);
      for (const nm of a.names) {
        await p.evaluate(([sid, nm]) => { const b = [...document.querySelectorAll(`section[id="${sid}"] button`)].find(b => b.innerText.trim().startsWith(nm)); b && b.click(); }, [secId, nm]);
        await p.waitForTimeout(2200);
        const file = `${a.prefix}-${nm.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}`;
        fs.writeFileSync(`${dir}/states/${file}.json`, JSON.stringify(await dump(p, `section[id="${secId}"]`)));
        await p.locator(`section[id="${secId}"]`).screenshot({ path: `${dir}/states/${file}.png` });
        console.log('row', file);
        if (a.toggle) { await p.evaluate(([sid, nm]) => { const b = [...document.querySelectorAll(`section[id="${sid}"] button`)].find(b => b.innerText.trim().startsWith(nm)); b && b.click(); }, [secId, nm]); await p.waitForTimeout(500); }
      }
      continue;
    }
    const names = a.names || (a.name ? [a.name] : []);
    for (const nm of names) {
      const btn = p.getByRole('button', { name: a.type==='overlay' ? nm : new RegExp('^'+nm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')) }).first();
      if (a.type === 'overlay') {
        await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
        await btn.click(); await p.waitForTimeout(900);
        const t = await dump(p); fs.writeFileSync(`${dir}/states/${a.prefix}.json`, JSON.stringify(t));
        await p.screenshot({ path: `${dir}/states/${a.prefix}.png` });
        await p.reload({ waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await settle(p);
        console.log('overlay', a.prefix); continue;
      }
      await btn.scrollIntoViewIfNeeded(); await btn.click(); await p.waitForTimeout(a.wait || 2200);
      const secId = await btn.evaluate(e => e.closest('section[id]')?.id);
      await p.evaluate(() => {}); // noop
      const file = `${a.prefix}-${nm.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}`;
      const t = await dump(p, `section[id="${secId}"]`);
      fs.writeFileSync(`${dir}/states/${file}.json`, JSON.stringify(t));
      await p.locator(`section[id="${secId}"]`).screenshot({ path: `${dir}/states/${file}.png` });
      console.log('state', file, secId);
    }
    if (a.repeat) { // carousel next button: click N times
      const btn = p.getByRole('button', { name: a.repeat, exact: true }).first();
      const seen = new Set();
      for (let i = 0; i < 12; i++) {
        const secId = await btn.evaluate(e => e.closest('section[id]')?.id);
        const txt = await p.locator(`section[id="${secId}"]`).innerText();
        if (seen.has(txt)) break; seen.add(txt);
        const file = `${a.prefix}-${i + 1}`;
        fs.writeFileSync(`${dir}/states/${file}.json`, JSON.stringify(await dump(p, `section[id="${secId}"]`)));
        await p.locator(`section[id="${secId}"]`).screenshot({ path: `${dir}/states/${file}.png` });
        console.log('carousel', file);
        await btn.click(); await p.waitForTimeout(a.wait || 2200);
      }
    }
  }
  await b.close();
})();
