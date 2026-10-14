/* ─── Google Analytics utility ──────────────────────────────────────────────
   Replace G-XXXXXXXXXX with your real Measurement ID before deploying.
   ─────────────────────────────────────────────────────────────────────────── */

export const GA_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function isGtagReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/** Fire a custom GA4 event */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
): void {
  if (!isGtagReady()) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/** Send a page_view hit (used on route changes) */
export function trackPageView(path: string): void {
  if (!isGtagReady()) return;
  window.gtag("config", GA_ID, {
    page_path: path,
    anonymize_ip: true,
  });
}
