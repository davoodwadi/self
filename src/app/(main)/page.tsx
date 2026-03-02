import { landingSections } from "./sections.config";
import { portfolioData } from "./sections.data";

export default function DavoodWadiPortfolio() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-accent-500 selection:text-white relative">
      <main>
        {landingSections
          .filter((section) => section.enabled)
          .map(({ key, Component }) => (
            <Component
              key={key}
              data={portfolioData[key as keyof typeof portfolioData]}
            />
          ))}
      </main>

      <footer className="py-8 text-center px-6">
        <p className="text-gray-600 text-sm font-light">
          &copy; {new Date().getFullYear()} Davood Wadi.
        </p>
      </footer>
    </div>
  );
}
