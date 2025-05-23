import { useState, useMemo, useCallback } from 'react';
import ScrollLink from './ScrollLink';

// Move static items outside component to prevent recreation on each render
const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Memoize the menu button SVGs
  const menuIcons = useMemo(
    () => ({
      close: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
      open: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    }),
    []
  );

  // Memoize the desktop menu items
  const desktopMenuItems = useMemo(
    () =>
      navItems.map(item => (
        <ScrollLink
          key={item.href}
          href={item.href}
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          {item.label}
        </ScrollLink>
      )),
    []
  );

  // Memoize the mobile menu items
  const mobileMenuItems = useMemo(
    () =>
      navItems.map(item => (
        <ScrollLink
          key={item.href}
          href={item.href}
          className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </ScrollLink>
      )),
    []
  );

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm will-change-transform">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ScrollLink href="#home" className="text-xl font-bold text-gray-800">
              Portfolio
            </ScrollLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded={isOpen}
              data-test-id="mobile-menu-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? menuIcons.close : menuIcons.open}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">{desktopMenuItems}</div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">{mobileMenuItems}</div>
        </div>
      )}
    </nav>
  );
}
