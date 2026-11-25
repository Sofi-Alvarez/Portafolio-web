# python3 compare.py <web.png> <figma_url> <outprefix> [step]
import sys, subprocess
from PIL import Image, ImageChops
web, url, pre = sys.argv[1], sys.argv[2], sys.argv[3]; step = int(sys.argv[4]) if len(sys.argv) > 4 else 1300
fig = pre + '-fig.png'; subprocess.run(['curl', '-sf', '-L', '-o', fig, url], check=True)
a = Image.open(web).convert('RGB'); b = Image.open(fig).convert('RGB')
if b.size != a.size: b = b.resize(a.size)
H = a.height; W = a.width
for i, y in enumerate(range(0, H, step)):
    y2 = min(H, y + step); ca = a.crop((0, y, W, y2)); cb = b.crop((0, y, W, y2))
    d = ImageChops.difference(ca, cb).convert('L').point(lambda p: 255 if p > 40 else 0)
    pct = 100 * sum(d.histogram()[255:]) / (W * (y2 - y))
    sbs = Image.new('RGB', (W * 2 + 20, y2 - y), 'red'); sbs.paste(ca, (0, 0)); sbs.paste(cb, (W + 20, 0))
    sc = 1040 / sbs.width; sbs.resize((int(sbs.width * sc), int(sbs.height * sc))).save(f'{pre}-{i}.png')
    print(i, f'y={y}', f'diff={pct:.1f}%')
