/* Elige texto blanco o casi negro según el color de fondo, para cumplir contraste AA (4.5:1). */
function luminance(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function readableTextOn(bgHex: string): "#ffffff" | "#111827" {
  const L = luminance(bgHex);
  const onWhite = 1.05 / (L + 0.05);
  const onDark = (L + 0.05) / (luminance("#111827") + 0.05);
  return onWhite >= onDark ? "#ffffff" : "#111827";
}
