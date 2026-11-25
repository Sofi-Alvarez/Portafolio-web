const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/home/user/Portafolio-web/figma-spec';
const BASE = 'https://sofia-alvarez-ux-iu.vercel.app';
const jobs = JSON.parse(process.argv[2]); // [{route,name,vw}]
const INTER = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=block');
html,body{font-family:'Inter',sans-serif !important}`;

async function dump(page) {
  return page.evaluate(() => {
    const KEYS = ['color','backgroundColor','backgroundImage','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderTopColor','borderRightColor','borderBottomColor','borderLeftColor','borderTopStyle','borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius','boxShadow','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','fontStyle','textTransform','textAlign','textDecorationLine','opacity','transform','filter','backdropFilter','display','flexDirection','flexWrap','gap','rowGap','columnGap','paddingTop','paddingRight','paddingBottom','paddingLeft','justifyContent','alignItems','overflow','position','objectFit','mixBlendMode','whiteSpace','backgroundClip','WebkitTextFillColor','backgroundSize','backgroundPosition','stroke','fill','strokeWidth','zIndex','visibility'];
    const DEF = {color:null,backgroundColor:'rgba(0, 0, 0, 0)',backgroundImage:'none',borderTopWidth:'0px',borderRightWidth:'0px',borderBottomWidth:'0px',borderLeftWidth:'0px',borderTopLeftRadius:'0px',borderTopRightRadius:'0px',borderBottomRightRadius:'0px',borderBottomLeftRadius:'0px',boxShadow:'none',opacity:'1',transform:'none',filter:'none',backdropFilter:'none',letterSpacing:'normal',fontStyle:'normal',textTransform:'none',textDecorationLine:'none',gap:'normal',rowGap:'normal',columnGap:'normal',paddingTop:'0px',paddingRight:'0px',paddingBottom:'0px',paddingLeft:'0px',overflow:'visible',position:'static',objectFit:'fill',mixBlendMode:'normal',whiteSpace:'normal',backgroundClip:'border-box',flexWrap:'nowrap',backgroundSize:'auto',backgroundPosition:'0% 0%',zIndex:'auto',visibility:'visible',strokeWidth:'1px',stroke:'none',fill:'rgb(0, 0, 0)',borderTopStyle:'none'};
    const INLINE = new Set(['SPAN','STRONG','EM','B','I','A','BR','SMALL','SUP','SUB','MARK','CODE','ABBR','TIME','U','S']);
    const sy = window.scrollY;
    function st(el, parentSt) {
      const cs = getComputedStyle(el); const o = {};
      for (const k of KEYS) { const v = cs[k]; if (v === undefined) continue;
        if (DEF[k] === v) continue;
        if (['color','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','fontStyle','textTransform','textAlign','WebkitTextFillColor','visibility','whiteSpace'].includes(k) && parentSt && parentSt[k] === v) continue;
        if (k.startsWith('border') && k.endsWith('Color') && cs[k.replace('Color','Width')] === '0px') continue;
        o[k] = v; }
      return o;
    }
    function full(el){ const cs=getComputedStyle(el); const o={}; for (const k of KEYS) o[k]=cs[k]; return o; }
    function isTextBlock(el) {
      let hasText = false;
      for (const n of el.childNodes) {
        if (n.nodeType === 3) { if (n.textContent.trim()) hasText = true; continue; }
        if (n.nodeType !== 1) continue;
        if (!INLINE.has(n.tagName)) return false;
        const d = getComputedStyle(n).display; if (d !== 'inline' && n.tagName!=='BR') return false;
        if (n.querySelector('svg,img')) return false;
        if (n.textContent.trim()) hasText = true;
      }
      return hasText;
    }
    function runs(el, inh) {
      const out = [];
      (function walk(node, cs) {
        for (const n of node.childNodes) {
          if (n.nodeType === 3) { if (n.textContent) out.push({ t: n.textContent, s: cs }); }
          else if (n.nodeType === 1) {
            if (n.tagName === 'BR') { out.push({ t: '\n', s: cs }); continue; }
            const c = getComputedStyle(n);
            walk(n, { color: c.color, fontWeight: c.fontWeight, fontStyle: c.fontStyle, fontSize: c.fontSize, fontFamily: c.fontFamily, textDecorationLine: c.textDecorationLine, backgroundImage: c.backgroundImage!=='none'?c.backgroundImage:undefined, WebkitTextFillColor: c.webkitTextFillColor, letterSpacing: c.letterSpacing, textTransform: c.textTransform });
          }
        }
      })(el, inh);
      return out;
    }
    function rec(el, parentFull) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none') return null;
      const r = el.getBoundingClientRect();
      const node = { t: el.tagName.toLowerCase(), x: Math.round(r.left*10)/10, y: Math.round((r.top + sy)*10)/10, w: Math.round(r.width*10)/10, h: Math.round(r.height*10)/10 };
      if (el.id) node.id = el.id;
      const al = el.getAttribute('aria-label'); if (al) node.al = al;
      const role = el.getAttribute('role'); if (role) node.role = role;
      if (el.tagName==='A') node.href = el.getAttribute('href');
      node.s = st(el, parentFull);
      const f = full(el);
      if (el.tagName === 'IMG') { node.src = el.currentSrc || el.src; node.alt = el.alt; node.nw = el.naturalWidth; node.nh = el.naturalHeight; return node; }
      if (el.tagName === 'svg' || el.tagName === 'SVG' || el instanceof SVGSVGElement) { node.t='svg'; const h = el.outerHTML; node.svg = h.length < 20000 ? h : h.slice(0,200)+'...TRUNC'; node.cls = (el.getAttribute('class')||''); return node; }
      if (['VIDEO','CANVAS','IFRAME'].includes(el.tagName)) { node.src = el.currentSrc || el.src; return node; }
      if (isTextBlock(el)) { node.text = el.innerText; node.runs = runs(el, { color: f.color, fontWeight: f.fontWeight, fontStyle: f.fontStyle, fontSize: f.fontSize, fontFamily: f.fontFamily, letterSpacing: f.letterSpacing, textTransform: f.textTransform, WebkitTextFillColor: f.webkitTextFillColor }); node.s = Object.assign({}, node.s, { color: f.color, fontFamily: f.fontFamily, fontSize: f.fontSize, fontWeight: f.fontWeight, lineHeight: f.lineHeight, letterSpacing: f.letterSpacing, textAlign: f.textAlign, textTransform: f.textTransform, fontStyle: f.fontStyle }); return node; }
      const kids = [];
      for (const c of el.children) { const k = rec(c, f); if (k) kids.push(k); }
      // stray text nodes mixed with blocks
      for (const n of el.childNodes) if (n.nodeType===3 && n.textContent.trim()) { const rg=document.createRange(); rg.selectNodeContents(n); const rr=rg.getBoundingClientRect(); kids.push({t:'#text', text:n.textContent.trim(), x:Math.round(rr.left), y:Math.round(rr.top+sy), w:Math.round(rr.width), h:Math.round(rr.height), s:{color:f.color,fontSize:f.fontSize,fontWeight:f.fontWeight,lineHeight:f.lineHeight,fontFamily:f.fontFamily}}); }
      if (kids.length) node.c = kids;
      const pb = getComputedStyle(el, '::before'), pa = getComputedStyle(el, '::after');
      for (const [nm, p] of [['before', pb], ['after', pa]]) if (p.content && p.content !== 'none' && p.content !== 'normal') node[nm] = { content: p.content, bg: p.backgroundColor, bgi: p.backgroundImage, w: p.width, h: p.height };
      return node;
    }
    return rec(document.body, null);
  });
}

(async () => {
  const b = await chromium.launch();
  for (const j of jobs) {
    const ctx = await b.newContext({ viewport: { width: j.vw, height: j.vh || 800 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.addInitScript(css => { document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); }); }, INTER);
    await p.goto(BASE + j.route, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    // scroll through to trigger whileInView
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H + 800; y += 400) { await p.evaluate(yy => window.scrollTo(0, yy), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(1200);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(800);
    const dir = `${OUT}/${j.name}/${j.vw}`; fs.mkdirSync(dir, { recursive: true });
    const tree = await dump(p);
    fs.writeFileSync(`${dir}/dom.json`, JSON.stringify(tree));
    await p.screenshot({ path: `${dir}/full.png`, fullPage: true });
    const imgs = await p.evaluate(() => [...new Set([...document.images].map(i => i.currentSrc || i.src))]);
    fs.writeFileSync(`${dir}/images.json`, JSON.stringify(imgs, null, 1));
    console.log(j.name, j.vw, 'H=', H, 'imgs=', imgs.length, 'domKB=', Math.round(fs.statSync(`${dir}/dom.json`).size / 1024));
    await ctx.close();
  }
  await b.close();
})();
