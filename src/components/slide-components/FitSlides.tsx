"use client";

/**
 * FitSlides — keeps every slide inside the screen, for every course.
 *
 * Mounted once in each course layout. It works on any element marked
 * `data-slide` (the slide sections of every deck's components), from md up;
 * below that, slides stack and scroll as reading pages. Fitting the screen
 * comes before the legibility of text inside drawings. For each slide that
 * runs taller than the screen, after hydration, on every resize and once
 * late images and fonts have loaded:
 *
 *  1. Visuals give way first. Text keeps its width (narrowing it only wraps
 *     more lines), so every drawing and image (`svg[role=img]`, `img`) is
 *     scaled down by one factor, just far enough to fit, down to MIN_SCALE.
 *  2. If the text alone is still taller than the screen (a short laptop
 *     window), the slide's content is zoomed down until it fits, but never
 *     below MIN_ZOOM, so body text stays readable. A slide that needs more
 *     than that holds too much for one screen and should be reworked; until
 *     then it scrolls.
 *
 * Styles are set inline after hydration, so server and client markup match.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Visuals shrink this far before the whole slide is zoomed to fit. */
const MIN_SCALE = 0.4;
/** The whole slide never zooms below this, so its text stays readable. */
const MIN_ZOOM = 0.6;
/** Room kept free around a fitted slide, clear of fixed chrome (a back arrow, a progress bar). */
const BREATHING = 32;
/** Smaller images (icons, glyphs) are left alone. */
const MIN_VISUAL_HEIGHT = 60;

const isInFlow = (el: Element) => {
  const position = getComputedStyle(el).position;
  return position !== "absolute" && position !== "fixed";
};

function fitSlide(slide: HTMLElement) {
  const own = (el: Element) => el.closest("[data-slide]") === slide;
  const visuals = [...slide.querySelectorAll<SVGSVGElement | HTMLImageElement>("svg[role=img], img")].filter(own);
  const blocks = [...slide.children].filter((c): c is HTMLElement => c instanceof HTMLElement && isInFlow(c));
  visuals.forEach((v) => {
    v.style.maxHeight = "";
    v.style.objectFit = "";
  });
  blocks.forEach((b) => (b.style.zoom = ""));
  if (blocks.length === 0 || !window.matchMedia("(min-width: 768px)").matches) return;

  const style = getComputedStyle(slide);
  const room =
    window.innerHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - BREATHING;
  const over = () => {
    const rects = blocks.map((b) => b.getBoundingClientRect());
    return Math.max(...rects.map((r) => r.bottom)) - Math.min(...rects.map((r) => r.top)) - room;
  };
  if (over() <= 0) return;

  const shrinkable = visuals.filter(
    (v) => isInFlow(v) && v.getBoundingClientRect().height >= MIN_VISUAL_HEIGHT,
  );
  const natural = shrinkable.map((v) => v.getBoundingClientRect().height);
  /** Total height of the visual rows: the tallest visual in each row, summed. */
  const rows = () => {
    const tallest = new Map<number, number>();
    shrinkable.forEach((v) => {
      const r = v.getBoundingClientRect();
      const key = Math.round(r.top / 8);
      tallest.set(key, Math.max(tallest.get(key) ?? 0, r.height));
    });
    return [...tallest.values()].reduce((a, b) => a + b, 0);
  };
  let k = 1;
  for (let i = 0; i < 12 && shrinkable.length > 0 && k > MIN_SCALE; i++) {
    const excess = over();
    if (excess <= 0) break;
    const total = rows();
    k = Math.max(MIN_SCALE, (k * (total - excess - 4)) / total);
    shrinkable.forEach((v, j) => {
      v.style.maxHeight = `${Math.floor(natural[j] * k)}px`;
      // An image keeps its aspect inside the shorter box; an SVG does so already.
      if (v instanceof HTMLImageElement) v.style.objectFit = "contain";
    });
  }

  let zoom = 1;
  for (let i = 0; i < 6 && zoom > MIN_ZOOM; i++) {
    const excess = over();
    if (excess <= 0) break;
    zoom = Math.max(MIN_ZOOM, (zoom * (room - 2)) / (room + excess));
    blocks.forEach((b) => (b.style.zoom = zoom.toFixed(4)));
  }
}

export function FitSlides() {
  const pathname = usePathname();
  useEffect(() => {
    const timers: number[] = [];
    const fitAll = () => document.querySelectorAll<HTMLElement>("[data-slide]").forEach(fitSlide);
    // Timeouts rather than requestAnimationFrame, which never fires in a
    // background tab. The later passes catch a layout still settling after a
    // resize, and images or fonts that arrive late.
    const fit = () => {
      timers.splice(0).forEach((t) => window.clearTimeout(t));
      timers.push(window.setTimeout(fitAll, 60), window.setTimeout(fitAll, 400));
    };
    const onLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) fit();
    };
    fit();
    timers.push(window.setTimeout(fitAll, 1500));
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    document.addEventListener("load", onLoad, true);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", fit);
      document.removeEventListener("load", onLoad, true);
    };
  }, [pathname]);
  return null;
}
