const {key}=require('./color');const fs=require('fs');
const routes=['landing/1280','landing/390','bank/1280','bookie/1280','iupi/1280','milestone/1280','portfolio/1280'];
const C={},F={},R={},S={},P={},G={},BG={};const inc=(o,k)=>{if(k)o[k]=(o[k]||0)+1};
for(const r of routes){const t=require('../'+r+'/dom.json');(function w(n){const s=n.s||{};
 if(n.runs)for(const x of n.runs){inc(C,'text '+key(x.s.color));inc(F,(x.s.fontFamily||'').split(',')[0]+' '+x.s.fontSize+'/'+x.s.fontWeight+(x.s.fontStyle==='italic'?' i':''))}
 if(s.backgroundColor)inc(C,'bg '+key(s.backgroundColor));
 if(s.borderTopWidth&&s.borderTopColor)inc(C,'bd '+key(s.borderTopColor));
 if(s.borderTopLeftRadius)inc(R,s.borderTopLeftRadius);
 if(s.boxShadow)inc(S,s.boxShadow);
 if(s.backgroundImage&&s.backgroundImage.includes('gradient'))inc(BG,s.backgroundImage.slice(0,160));
 for(const k of ['paddingTop','paddingLeft'])if(s[k])inc(P,s[k]);
 if(s.gap)inc(G,s.gap);
 (n.c||[]).forEach(w)})(t)}
const top=(o,n=60)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([k,v])=>v+'  '+k).join('\n');
console.log('== COLORS\n'+top(C,90));console.log('== FONTS\n'+top(F,70));console.log('== RADII\n'+top(R,20));console.log('== SHADOWS\n'+top(S,25));console.log('== GRADIENTS\n'+top(BG,25));console.log('== PAD\n'+top(P,25));console.log('== GAP\n'+top(G,20));
