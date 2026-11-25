// CSS color string -> {hex, a}
function clamp(x){return Math.min(1,Math.max(0,x))}
function lin2srgb(c){return c<=0.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-0.055}
function oklabToRgb(L,a,b){const l_=L+0.3963377774*a+0.2158037573*b,m_=L-0.1055613458*a-0.0638541728*b,s_=L-0.0894841775*a-1.2914855480*b;const l=l_**3,m=m_**3,s=s_**3;
return [lin2srgb(4.0767416621*l-3.3077115913*m+0.2309699292*s),lin2srgb(-1.2684380046*l+2.6097574011*m-0.3413193965*s),lin2srgb(-0.0041960863*l-0.7034186147*m+1.7076147010*s)].map(clamp)}
function parse(str){ if(!str) return null; str=str.trim(); let m;
 if((m=str.match(/^rgba?\(([^)]+)\)/))){const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return {r:p[0]/255,g:p[1]/255,b:p[2]/255,a:p[3]===undefined?1:p[3]}}
 if((m=str.match(/^oklch\(([^)]+)\)/))){const [main,al]=m[1].split('/');const p=main.trim().split(/\s+/);let L=parseFloat(p[0]);if(p[0].includes('%'))L/=100;const C=parseFloat(p[1]),H=parseFloat(p[2])||0;const [r,g,b]=oklabToRgb(L,C*Math.cos(H*Math.PI/180),C*Math.sin(H*Math.PI/180));let a=al===undefined?1:parseFloat(al);if(al&&al.includes('%'))a/=100;return {r,g,b,a}}
 if((m=str.match(/^oklab\(([^)]+)\)/))){const [main,al]=m[1].split('/');const p=main.trim().split(/\s+/).map(parseFloat);const [r,g,b]=oklabToRgb(p[0],p[1],p[2]);let a=al===undefined?1:parseFloat(al);return {r,g,b,a}}
 if((m=str.match(/^color\(srgb ([^)]+)\)/))){const [main,al]=m[1].split('/');const p=main.trim().split(/\s+/).map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:al===undefined?1:parseFloat(al)}}
 if(str==='transparent')return {r:0,g:0,b:0,a:0};
 if(str[0]==='#'){let h=str.slice(1);if(h.length===3)h=h.split('').map(c=>c+c).join('');return {r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255,a:h.length===8?parseInt(h.slice(6,8),16)/255:1}}
 return null}
function hex(c){return '#'+[c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('').toUpperCase()}
function key(str){const c=parse(str);if(!c)return null;return hex(c)+(c.a<1?'@'+Math.round(c.a*100):'')}
module.exports={parse,hex,key};
