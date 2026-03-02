import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import citationData from "./citations.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * DeepResearch Citations
 * 
 * This file handles citations imported from citations.json.
 */

export interface Citation {
  id: number;
  title: string;
  url: string;
}

const citations = citationData as Record<string, Citation>;

/**
 * Get citation URLs by ID
 * @param ids - Array of citation ID numbers
 * @returns Array of Citation objects
 */
export function getCitations(ids: number[]): Citation[] {
  return ids
    .map((id) => citations[id.toString()])
    .filter((citation): citation is Citation => citation !== undefined);
}

/**
 * Get citation URLs by ID (for backwards compatibility)
 * @param ids - Array of citation ID numbers
 * @returns Array of URLs
 */
export function getCitationUrls(ids: number[]): string[]  {
  return getCitations(ids).map((c) => c.url);
}
