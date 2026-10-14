/* ─── useAnalytics hook ──────────────────────────────────────────────────────
   Call once at the App root. Handles:
     • Page views on every route change
     • Scroll depth milestones (25 / 50 / 75 / 90 %)
     • Engagement time reported on page unload
     • Click event delegation via [data-ga-action] attributes
   ─────────────────────────────────────────────────────────────────────────── */

import { useEffect } from "react";
import { useLocation } from "react-router";
import { trackEvent, trackPageView } from "../utils/analytics";

export function useAnalytics(): void {
  const { pathname } = useLocation();

  /* ── Page views ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  /* ── Scroll depth (fires once per threshold per page load) ──────────────── */
  useEffect(() => {
    const reached = new Set<number>();
    const THRESHOLDS = [25, 50, 75, 90];

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const t of THRESHOLDS) {
        if (pct >= t && !reached.has(t)) {
          reached.add(t);
          trackEvent("scroll_depth", "Engagement", `${t}%`);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* ── Engagement time ────────────────────────────────────────────────────── */
  useEffect(() => {
    const start = Date.now();

    function onUnload() {
      const seconds = Math.round((Date.now() - start) / 1000);
      trackEvent("engagement_time", "Engagement", pathname, seconds);
    }

    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [pathname]);

  /* ── Click event delegation — reads data-ga-* attributes ───────────────── */
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-ga-action]");
      if (!target) return;

      const action   = target.dataset.gaAction   ?? "click";
      const category = target.dataset.gaCategory ?? "UI";
      const label    = target.dataset.gaLabel;

      trackEvent(action, category, label);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
