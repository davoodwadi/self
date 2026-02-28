export default function Navigation() {
  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-dark-900/50 border-b border-white/5 py-4 px-6 md:px-12"
      id="navbar"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-xl font-serif font-bold tracking-wider text-white hover:text-accent-400 transition-colors"
        >
          DW
        </a>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          <a href="/#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="/#expertise" className="hover:text-white transition-colors">
            Expertise
          </a>
          <a
            href="/#publications"
            className="hover:text-white transition-colors"
          >
            Publications
          </a>
          <a href="/#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
        {/* Mobile Menu Button (Simplified for this version) */}
        <button className="md:hidden text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
