// node upload.js <url1,url2,...> <payload.json>...   Each payload JSON -> SVG carrier -> POST. Prints placedOnNodeId per payload.
const fs = require('fs'); const { execFileSync } = require('child_process');
const urls = process.argv[2].split(','); const files = process.argv.slice(3);
if (urls.length < files.length) { console.error('need', files.length, 'urls'); process.exit(1); }
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const out = [];
files.forEach((f, i) => {
  const json = fs.readFileSync(f, 'utf8').replace(/ /g, '\\u0020');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><text x="0" y="3" font-size="2">${esc(json)}</text></svg>`;
  const tmp = `/tmp/claude-0/carrier-${i}.svg`; fs.writeFileSync(tmp, svg);
  const r = execFileSync('curl', ['-sS', '-F', `file=@${tmp};type=image/svg+xml;filename=SPEC.svg`, urls[i]]).toString();
  let id; try { id = JSON.parse(r).placedOnNodeId; } catch (e) { id = 'ERR ' + r.slice(0, 200); }
  out.push([f.split('/').pop(), id, Math.round(json.length / 1024) + 'KB']);
});
console.log(JSON.stringify(out));
