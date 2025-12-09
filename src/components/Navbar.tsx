// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Github } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn.ts exists in src/utils/

// Define a function to get the correct image path
function getImagePath(name: string): string {
  // Correct path for GitHub Pages deployment
  // If your images are in public/images, this path should work.
  // If your project is hosted at a subpath like yourusername.github.io/my-repo/,
  // you might need to adjust this, e.g., by prepending the repo name if not handled by the router.
  // For a simple GitHub Pages site (not a sub-repo), `/images/` is usually correct.
  return `/images/${name}`;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false); // isScrolled is set but not used for styling in the provided code. Kept for potential future use.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/team', label: 'Team' },
    { path: '/research', label: 'Research' },
    { path: 'https://github.com/bdslab-iiserb', label: 'GitHub', external: true },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        'bg-gradient-to-r from-white via-blue-50 to-cyan-50 shadow-lg border-b border-blue-100',
        'text-gray-800'
      )}
    >
      <div className="max-w-[95%] mx-auto">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center space-x-4 pl-2">
            <a
              href="https://www.iiserb.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={getImagePath('iiserblogo.jpg')}
                alt="IISER Bhopal Logo"
                className="h-16 w-auto"
              />
            </a>
            <a
              href="https://dse.iiserb.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={getImagePath('dselogoiiserb.png')}
                alt="DSE Logo"
                className="h-16 w-auto"
              />
            </a>
            <a
              href="https://bdslab-iiserb.github.io" // Assuming this is the correct link for the lab itself
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={getImagePath('biomedlab.jpg')}
                alt="BDS Lab Logo"
                className="h-16 w-auto"
              />
            </a>
            <Link
              to="/"
              className="font-bold text-2xl tracking-tight text-gray-800 hover:text-blue-600 transition-colors duration-300"
            >
              BDS Lab
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 pr-4 items-center">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:text-blue-600 text-lg tracking-wide font-medium text-gray-700 hover:scale-110 flex items-center gap-1"
                >
                  <Github size={20} />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'transition-all duration-300 hover:text-blue-600 text-lg tracking-wide font-medium',
                    location.pathname === link.path
                      ? 'font-bold border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-700 hover:border-b-2 hover:border-blue-500'
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 mr-4 rounded-lg hover:bg-blue-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-xl border-t border-blue-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 rounded-lg text-lg transition-all duration-300 text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Github size={20} />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-lg transition-all duration-300",
                      location.pathname === link.path
                        ? "bg-blue-100 text-blue-600 font-bold"
                        : "text-gray-700 hover:bg-blue-50"
                    )}
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}