/* Respeta prefers-reduced-motion en los scrolls programáticos (scrollIntoView / scrollTo).
   El CSS no puede pisar un behavior: "smooth" pasado por JS, por eso se resuelve acá. */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined" || !window.matchMedia) return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
