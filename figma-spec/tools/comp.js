// Capture component subtrees in default + hover state.  node comp.js
const { chromium } = require('playwright');
const fs = require('fs');
const { dump, INTER } = require('./lib');
const OUT = '/home/user/Portafolio-web/figma-spec/components'; fs.mkdirSync(OUT, { recursive: true });
const T = [
  // [name, route, vw, locator(js string evaluated with page), hover?]
  ['NavLink', '/', 1280, p => p.locator('nav button', { hasText: 'Inicio' }).first(), true],
  ['IconButton-Theme', '/', 1280, p => p.locator('button[aria-label="Activar modo oscuro"]').first(), true],
  ['Navbar-Desktop', '/', 1280, p => p.locator('nav').first(), false],
  ['Button-Primary', '/', 1280, p => p.locator('button', { hasText: 'Ver proyectos' }).first(), true],
  ['Badge-Status', '/', 1280, p => p.locator('#home span', { hasText: 'Disponible para nuevos proyectos' }).first(), false],
  ['IconButton-Pause', '/', 1280, p => p.locator('button[aria-label="Pausar animaciones de fondo"]').first(), true],
  ['Card-Project-Milestone', '/', 1280, p => p.locator('article').nth(0), true],
  ['Card-Project-IUPI', '/', 1280, p => p.locator('article').nth(1), true],
  ['Card-Project-Portfolio', '/', 1280, p => p.locator('article').nth(2), true],
  ['Card-Project-MasBank', '/', 1280, p => p.locator('article').nth(3), true],
  ['Card-Project-Bookie', '/', 1280, p => p.locator('article').nth(4), true],
  ['Button-Contact-LinkedIn', '/', 1280, p => p.locator('#contact a', { hasText: 'Conectar en LinkedIn' }).first(), true],
  ['Button-Contact-CV', '/', 1280, p => p.locator('#contact a', { hasText: 'Obtener currículum' }).first(), true],
  ['IconButton-Social-Mail', '/', 1280, p => p.locator('#contact a[aria-label^="Enviar un email"]').first(), true],
  ['IconButton-Social-WhatsApp', '/', 1280, p => p.locator('#contact a[aria-label^="WhatsApp"]').first(), true],
  ['IconButton-Social-GitHub', '/', 1280, p => p.locator('#contact a[aria-label^="GitHub"]').first(), true],
  ['FooterLink', '/', 1280, p => p.locator('footer button', { hasText: 'Inicio' }).first(), true],
  ['FooterLink-Email', '/', 1280, p => p.locator('footer a', { hasText: 'alvarez.sofib@gmail.com' }).first(), true],
  ['Footer', '/', 1280, p => p.locator('footer').first(), false],
  ['Navbar-Mobile', '/', 390, p => p.locator('nav').first(), false],
  ['IconButton-Menu', '/', 390, p => p.locator('button[aria-label="Abrir menú"]').first(), true],
  ['Case-Navbar', '/case-study/+bank', 1280, p => p.locator('nav').first(), false],
  ['Case-LogoButton', '/case-study/+bank', 1280, p => p.locator('button[aria-label="Ir al inicio"]').first(), true],
  ['Case-MenuButton', '/case-study/+bank', 1280, p => p.locator('button[aria-label="Abrir menú"]').first(), true],
  ['Case-MenuButton-Milestone', '/case-study/milestone', 1280, p => p.locator('button[aria-label="Abrir menú"]').first(), true],
  ['Case-MethodStep', '/case-study/+bank', 1280, p => p.locator('#metodologia button', { hasText: 'Empatizar' }).first(), true],
  ['Case-MethodStep-Milestone', '/case-study/milestone', 1280, p => p.locator('#metodologia button', { hasText: 'Discover' }).first(), true],
  ['Case-ContactCTA', '/case-study/+bank', 1280, p => p.locator('button', { hasText: 'Ir a contacto' }).first(), true],
  ['Case-ContactCTA-Milestone', '/case-study/milestone', 1280, p => p.locator('button', { hasText: 'Ir a contacto' }).first(), true],
  ['Case-BackLink', '/case-study/+bank', 1280, p => p.locator('button', { hasText: 'Volver al portfolio' }).first(), true],
  ['Case-NextCase', '/case-study/+bank', 1280, p => p.locator('button', { hasText: 'Ver Bookie' }).first(), true],
  ['Case-NextCase-Milestone', '/case-study/milestone', 1280, p => p.locator('button', { hasText: 'Ver IUPI' }).first(), true],
  ['Milestone-HeroCTA', '/case-study/milestone', 1280, p => p.locator('button', { hasText: 'Conocer proceso' }).first(), true],
  ['Milestone-ProductLink', '/case-study/milestone', 1280, p => p.locator('a[aria-label^="Ir a Milestone"]').first(), true],
  ['Milestone-Tab-Active', '/case-study/milestone', 1280, p => p.locator('button[aria-label^="Entrevistas"]').first(), true],
  ['Milestone-Tab', '/case-study/milestone', 1280, p => p.locator('button[aria-label^="Benchmark"]').first(), true],
  ['Milestone-CarouselNext', '/case-study/milestone', 1280, p => p.locator('button[aria-label="Cita siguiente"]').first(), true],
];
(async () => {
  const b = await chromium.launch();
  const groups = {}; for (const t of T) { const k = t[1] + '@' + t[2]; (groups[k] ||= []).push(t); }
  for (const [k, list] of Object.entries(groups)) {
    const [route, vw] = k.split('@');
    const ctx = await b.newContext({ viewport: { width: +vw, height: +vw === 390 ? 844 : 900 } }); const p = await ctx.newPage();
    await p.addInitScript(css => { document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }); }, INTER);
    await p.goto('https://sofia-alvarez-ux-iu.vercel.app' + route, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    const H = await p.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H + 800; y += 400) { await p.evaluate(yy => scrollTo(0, yy), y); await p.waitForTimeout(80); } await p.waitForTimeout(800);
    for (const [name, , , loc, hover] of list) {
      try {
        const el = loc(p); await el.scrollIntoViewIfNeeded({ timeout: 4000 }); await p.mouse.move(1, 1); await p.waitForTimeout(500);
        await p.evaluate(() => document.querySelectorAll('[data-cap]').forEach(e => e.removeAttribute('data-cap')));
        await el.evaluate(e => e.setAttribute('data-cap', '1'));
        fs.writeFileSync(`${OUT}/${name}--default.json`, JSON.stringify(await dump(p, '[data-cap="1"]')));
        if (hover) { await el.hover({ force: true }); await p.waitForTimeout(800); fs.writeFileSync(`${OUT}/${name}--hover.json`, JSON.stringify(await dump(p, '[data-cap="1"]'))); }
        console.log('ok', name);
      } catch (e) { console.log('FAIL', name, e.message.split('\n')[0]); }
    }
    await ctx.close();
  }
  await b.close();
})();
