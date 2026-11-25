# python3 hot.py <web.png> <fig_url_or_png> <prefix>  -> lists bands with high diff and saves crops
import sys, subprocess, os
from PIL import Image, ImageChops
web, src, pre = sys.argv[1:4]
fig = src if os.path.exists(src) else pre + '-fig.png'
if not os.path.exists(src): subprocess.run(['curl', '-sf', '-L', '-o', fig, src], check=True)
a = Image.open(web).convert('RGB'); b = Image.open(fig).convert('RGB')
if b.size != a.size: b = b.resize(a.size)
W, H = a.size; B = 100; hot = []
d = ImageChops.difference(a, b).convert('L').point(lambda p: 255 if p > 50 else 0)
for y in range(0, H, B):
    band = d.crop((0, y, W, min(H, y + B))); pct = 100 * band.histogram()[255] / (W * band.height)
    if pct > 12: hot.append((y, round(pct, 1)))
# merge consecutive
groups = []
for y, p in hot:
    if groups and y - groups[-1][1] <= B: groups[-1][1] = y + B; groups[-1][2] = max(groups[-1][2], p)
    else: groups.append([y, y + B, p])
print(pre, 'bands>12%:', [(g[0], g[1], g[2]) for g in groups])
for i, (y0, y1, p) in enumerate(groups[:8]):
    y0 = max(0, y0 - 40); y1 = min(H, y1 + 40)
    sbs = Image.new('RGB', (W * 2 + 16, y1 - y0), 'red'); sbs.paste(a.crop((0, y0, W, y1)), (0, 0)); sbs.paste(b.crop((0, y0, W, y1)), (W + 16, 0))
    sc = min(1, 1100 / sbs.width); sbs.resize((int(sbs.width * sc), int(sbs.height * sc))).save(f'{pre}-hot{i}.png')
