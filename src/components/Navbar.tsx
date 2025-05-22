// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
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
    // { path: '/blog', label: 'Blog' }, // REMOVED Blog link
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        'bg-black', // Base background color
        'text-white' // Base text color
        // isScrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-black' // Example of using isScrolled
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center space-x-6 pl-4">
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
                src={getImagePath('dselogoiiserb.jpg')}
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
              className="font-bold text-2xl tracking-tight hover:text-blue-400 transition-colors duration-300"
            >
              BDS Lab
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 pr-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'transition-all duration-300 hover:text-blue-400 text-lg tracking-wide',
                  location.pathname === link.path
                    ? 'font-semibold border-b-2 border-blue-400'
                    : 'hover:border-b-2 hover:border-blue-400/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 mr-4 rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black shadow-lg rounded-b-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-lg transition-all duration-300",
                    location.pathname === link.path
                      ? "bg-blue-500/20 text-blue-400 font-medium"
                      : "text-gray-100 hover:bg-white/10"
                  )}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}