// Written out with "at" and no mailto link, so address scrapers
// don't pick it up from the HTML.
export function Email({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      davood.wadi at hec.ca
    </span>
  );
}
