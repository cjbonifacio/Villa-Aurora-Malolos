import { useEffect } from "react";

export const SITE_URL = "https://villaauroramalolos.com";

// Sets the browser tab title, description and canonical link for the current page.
export function usePageMeta(title: string, description: string, path = "/") {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE_URL}${path}`);
  }, [title, description, path]);
}
