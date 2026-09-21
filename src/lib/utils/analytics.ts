declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// Single choke point for every dataLayer.push in the site — GTM events
// (page views, clicks, anything added later) all go through here so
// there's one place that knows the payload shape and guards against
// running during SSR.
export function pushDataLayerEvent(
  event: string,
  data: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackPageView() {
  pushDataLayerEvent("page_view", {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Delegated click tracking: any element with data-gtm-id gets its click
// reported, with optional data-gtm-location for context. One listener
// covers new elements too (re-attached per page via astro:page-load).
export function trackTaggedClicks() {
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      "[data-gtm-id]"
    );
    if (!target) return;
    pushDataLayerEvent("cta_click", {
      cta_id: target.dataset.gtmId,
      cta_location: target.dataset.gtmLocation ?? "unknown",
      cta_url: target.getAttribute("href") ?? undefined,
    });
  });
}
