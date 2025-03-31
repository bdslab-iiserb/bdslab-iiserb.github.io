import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '../utils/cn';

// Define a function to get the correct image path
function getImagePath(name: string): string {
  // Correct path for GitHub Pages deployment
  return `/bdsl-website/images/${name}`;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        'bg-black',
        'text-white'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-4 pl-2">
            <img 
              src={getImagePath('iiserblogo.jpg')} 
              alt="IISER Bhopal Logo" 
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
            <img 
              src={getImagePath('biomedlab.jpg')} 
              alt="BDS Lab Logo" 
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
            <span className="font-bold text-2xl tracking-tight hover:text-blue-400 transition-colors duration-300">BDS Lab</span>
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
                  onClick={() => setIsMenuOpen(false)}
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