const INTER = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;700&display=block');
html,body{font-family:'Inter',sans-serif !important}
.font-mono,code,pre,kbd{font-family:'JetBrains Mono',monospace !important}`;
async function dump(page, sel) {
  return page.evaluate((sel) => {
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
    function isAbs(e){ const p=getComputedStyle(e).position; return p==='absolute'||p==='fixed'; }
    function inlineOk(n){ // inline or inline-block element containing only text (+ absolute decorations)
      if (!INLINE.has(n.tagName) && getComputedStyle(n).display!=='inline-block') return false;
      const d = getComputedStyle(n).display; if (d !== 'inline' && d !== 'inline-block' && n.tagName!=='BR') return false;
      if (d === 'inline-block') { const cs2=getComputedStyle(n); if ((cs2.backgroundColor!=='rgba(0, 0, 0, 0)') || parseFloat(cs2.borderTopWidth)>0 || parseFloat(cs2.paddingLeft)>0) return false; }
      for (const c of n.children) { if (isAbs(c)) continue; if (!inlineOk(c)) return false; }
      for (const m of n.querySelectorAll('svg,img')) { let a=m, ok=false; while (a && a!==n) { if (isAbs(a)) { ok=true; break; } a=a.parentElement; } if (!ok) return false; }
      return true;
    }
    function isTextBlock(el) {
      let hasText = false;
      for (const n of el.childNodes) {
        if (n.nodeType === 3) { if (n.textContent.trim()) hasText = true; continue; }
        if (n.nodeType !== 1) continue;
        if (isAbs(n)) continue;
        if (!inlineOk(n)) return false;
        if (n.textContent.trim()) hasText = true;
      }
      return hasText;
    }
    function decorations(el){ const out=[]; (function w(e){ for (const c of e.children){ if (isAbs(c)) out.push(c); else w(c); } })(el); return out; }
    function runs(el, inh) {
      const out = [];
      (function walk(node, cs) {
        for (const n of node.childNodes) {
          if (n.nodeType === 3) { if (n.textContent) out.push({ t: n.textContent, s: cs }); }
          else if (n.nodeType === 1) {
            if (n.tagName === 'BR') { out.push({ t: '\n', s: cs }); continue; }
            const c = getComputedStyle(n);
            if (c.position === 'absolute' || c.position === 'fixed') continue;
            if (c.display === 'none') continue;
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
      if (cs.position === 'absolute' && r.width <= 1.5 && r.height <= 1.5) return null;
      const node = { t: el.tagName.toLowerCase(), x: Math.round(r.left*10)/10, y: Math.round((r.top + sy)*10)/10, w: Math.round(r.width*10)/10, h: Math.round(r.height*10)/10 };
      if (el.id) node.id = el.id;
      if (el.hasAttribute && el.hasAttribute('data-rot')) node.rot = +(+el.getAttribute('data-rot')).toFixed(3);
      const cl0 = el.getAttribute('class'); if (cl0) node.cls = cl0.slice(0, 160);
      if (cs.transform !== 'none' && el instanceof HTMLElement) { node.ow = el.offsetWidth; node.oh = el.offsetHeight; }
      const al = el.getAttribute('aria-label'); if (al) node.al = al;
      const role = el.getAttribute('role'); if (role) node.role = role;
      if (el.tagName==='A') node.href = el.getAttribute('href');
      node.s = st(el, parentFull);
      const f = full(el);
      if (el.tagName === 'IMG') { node.src = el.currentSrc || el.src; node.alt = el.alt; node.nw = el.naturalWidth; node.nh = el.naturalHeight; node.of = cs.objectFit; node.op = cs.objectPosition; return node; }
      if (el instanceof SVGSVGElement) { node.t='svg';
        const clone = el.cloneNode(true); const os = [el, ...el.querySelectorAll('*')], cl = [clone, ...clone.querySelectorAll('*')];
        os.forEach((o, i) => { const c = cl[i]; const cs2 = getComputedStyle(o);
          if (o.tagName === 'stop') { c.setAttribute('stop-color', cs2.stopColor); return; }
          if (['path','circle','rect','line','polyline','polygon','ellipse','text','g','svg','use'].includes(o.tagName)) {
            if (cs2.stroke && cs2.stroke !== 'none') { c.setAttribute('stroke', cs2.stroke); c.setAttribute('stroke-width', cs2.strokeWidth); } else if (o.getAttribute('stroke')) c.setAttribute('stroke', 'none');
            if (cs2.fill && cs2.fill !== 'none') c.setAttribute('fill', cs2.fill); else c.setAttribute('fill', 'none');
            if (cs2.opacity !== '1') c.setAttribute('opacity', cs2.opacity);
            if (cs2.strokeLinecap !== 'butt') c.setAttribute('stroke-linecap', cs2.strokeLinecap);
            if (cs2.strokeLinejoin !== 'miter') c.setAttribute('stroke-linejoin', cs2.strokeLinejoin);
            if (cs2.strokeDasharray && cs2.strokeDasharray !== 'none') c.setAttribute('stroke-dasharray', cs2.strokeDasharray);
          }
          c.removeAttribute('class'); c.removeAttribute('style');
        });
        clone.setAttribute('width', r.width); clone.setAttribute('height', r.height);
        if (!clone.getAttribute('viewBox')) clone.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
        const h = clone.outerHTML; node.svg = h.length < 60000 ? h : 'TRUNC'; node.col = cs.color; if (cs.transform !== 'none') { node.ow = el.clientWidth || r.width; node.oh = el.clientHeight || r.height; } return node; }
      if (['VIDEO','CANVAS','IFRAME'].includes(el.tagName)) { node.src = el.currentSrc || el.src; return node; }
      if (isTextBlock(el)) { const dec = decorations(el).map(d => rec(d, full(el))).filter(Boolean); if (dec.length) node.deco = dec; { const rg = document.createRange(); rg.selectNodeContents(el); const rs = [...rg.getClientRects()].filter(q => q.width > 0.5); const tops = []; for (const q of rs) { if (!tops.some(t => Math.abs(t - (q.top + q.height / 2)) < q.height * 0.5)) tops.push(q.top + q.height / 2); } const b = rg.getBoundingClientRect(); node.tr = [Math.round(b.left * 10) / 10, Math.round((b.top + sy) * 10) / 10, Math.round(b.width * 10) / 10, Math.round(b.height * 10) / 10, Math.max(1, tops.length)]; } node.text = el.innerText; node.runs = runs(el, { color: f.color, fontWeight: f.fontWeight, fontStyle: f.fontStyle, fontSize: f.fontSize, fontFamily: f.fontFamily, letterSpacing: f.letterSpacing, textTransform: f.textTransform, WebkitTextFillColor: f.webkitTextFillColor }); node.s = Object.assign({}, node.s, { alignItems: f.alignItems, display: f.display, color: f.color, fontFamily: f.fontFamily, fontSize: f.fontSize, fontWeight: f.fontWeight, lineHeight: f.lineHeight, letterSpacing: f.letterSpacing, textAlign: f.textAlign, textTransform: f.textTransform, fontStyle: f.fontStyle }); return node; }
      const kids = [];
      for (const c of el.children) { const k = rec(c, f); if (k) kids.push(k); }
      // stray text nodes mixed with blocks
      for (const n of el.childNodes) if (n.nodeType===3 && n.textContent.trim()) { const rg=document.createRange(); rg.selectNodeContents(n); const rr=rg.getBoundingClientRect(); const rs2=[...rg.getClientRects()].filter(q=>q.width>0.5); const tops2=[]; for (const q of rs2) { if (!tops2.some(t=>Math.abs(t-(q.top+q.height/2))<q.height*0.5)) tops2.push(q.top+q.height/2); } kids.push({t:'#text', text:n.textContent.trim(), lines:Math.max(1,tops2.length), x:Math.round(rr.left*10)/10, y:Math.round((rr.top+sy)*10)/10, w:Math.round(rr.width*10)/10, h:Math.round(rr.height*10)/10, s:{color:f.color,fontSize:f.fontSize,fontWeight:f.fontWeight,lineHeight:f.lineHeight,fontFamily:f.fontFamily,letterSpacing:f.letterSpacing,textTransform:f.textTransform,fontStyle:f.fontStyle,textAlign:f.textAlign,whiteSpace:f.whiteSpace,WebkitTextFillColor:f.webkitTextFillColor,textDecorationLine:f.textDecorationLine}}); }
      if (kids.length) node.c = kids;
      const pb = getComputedStyle(el, '::before'), pa = getComputedStyle(el, '::after');
      for (const [nm, p] of [['before', pb], ['after', pa]]) if (p.content && p.content !== 'none' && p.content !== 'normal') node[nm] = { content: p.content, bg: p.backgroundColor, bgi: p.backgroundImage, w: p.width, h: p.height };
      return node;
    }
    const rotated=[]; for (const e of document.querySelectorAll('*')) { const t=getComputedStyle(e).transform; if (t && t.startsWith('matrix(')) { const m=t.slice(7,-1).split(',').map(Number); if (Math.abs(m[1])>0.001) { rotated.push([e,e.style.getPropertyValue('transform'),e.style.getPropertyPriority('transform')]); e.setAttribute('data-rot', Math.atan2(m[1],m[0])*180/Math.PI); e.style.setProperty('transform','none','important'); } } }
    const root = sel ? document.querySelector(sel) : document.body; const RES = rec(root, root.parentElement ? (()=>{const cs=getComputedStyle(root.parentElement);const o={};for(const k of KEYS)o[k]=cs[k];return o})() : null); for (const [e,v,p] of rotated) { e.style.setProperty('transform', v, p); e.removeAttribute('data-rot'); } return RES;
  }, sel);
}


module.exports={dump,INTER};
