

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';
import MegaMenu from './MegaMenu';
import { MenuIcon, XMarkIcon, ChevronDownIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [closeMenuTimer, setCloseMenuTimer] = useState<number | null>(null);

  const closeMegaMenuCompletely = () => {
    if (closeMenuTimer) window.clearTimeout(closeMenuTimer);
    setCloseMenuTimer(null);
    setActiveMegaMenu(null);
  };

  const handleMenuCloseIntent = () => {
    if (closeMenuTimer) window.clearTimeout(closeMenuTimer);
    const timerId = window.setTimeout(() => {
      setActiveMegaMenu(null); 
    }, 250); 
    setCloseMenuTimer(timerId);
  };

  const cancelMenuCloseIntent = () => {
    if (closeMenuTimer) {
      window.clearTimeout(closeMenuTimer);
      setCloseMenuTimer(null);
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    closeMegaMenuCompletely();
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavItemClick = (itemId: string, hasMegaMenu?: boolean) => {
    cancelMenuCloseIntent(); 
    if (hasMegaMenu) {
      setActiveMegaMenu(prev => (prev === itemId ? null : itemId));
    } else {
      setActiveMegaMenu(null); 
      setIsMobileMenuOpen(false); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        if (!event.target || !(event.target as HTMLElement).closest('[role="dialog"], [aria-modal="true"]')) {
          closeMegaMenuCompletely();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeMenuTimer) window.clearTimeout(closeMenuTimer); 
    };
  }, [closeMenuTimer]);


  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-nexusbyte-primary-dark text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-nexusbyte-accent-green hover:opacity-80 transition-opacity">
              NexusByte
            </Link>
          </div>

          <nav className="hidden md:flex ml-8 space-x-1 items-center">
            {NAV_ITEMS.map((item: NavItem) => (
              <div
                key={item.id}
                className="relative group"
                ref={(el) => { navItemRefs.current[item.id] = el; }}
                onMouseEnter={() => {
                  if (item.megaMenuContent) {
                    cancelMenuCloseIntent();
                    setActiveMegaMenu(item.id);
                  }
                }}
                onMouseLeave={() => {
                  if (item.megaMenuContent) {
                    handleMenuCloseIntent();
                  }
                }}
              >
                <button
                  onClick={() => handleNavItemClick(item.id, !!item.megaMenuContent)}
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-nexusbyte-accent-green focus:outline-none focus:bg-gray-700 transition-colors duration-150 flex items-center
                    ${location.pathname.startsWith(item.path) || activeMegaMenu === item.id ? 'text-nexusbyte-accent-green' : 'text-gray-300'}`}
                  aria-haspopup={!!item.megaMenuContent}
                  aria-expanded={activeMegaMenu === item.id}
                >
                  <Link
                    to={!item.megaMenuContent ? item.path : '#'}
                    onClick={(e) => {
                      if (item.megaMenuContent) {
                        e.preventDefault();
                      } else {
                        closeMegaMenuCompletely();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="focus:outline-none"
                  >
                    {item.title}
                  </Link>
                  {item.megaMenuContent && <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${activeMegaMenu === item.id ? 'transform rotate-180' : ''}`} />}
                </button>
                {item.megaMenuContent && navItemRefs.current[item.id] && (
                  <MegaMenu
                    isOpen={activeMegaMenu === item.id}
                    content={item.megaMenuContent}
                    onClose={closeMegaMenuCompletely} 
                    parentRef={{ current: navItemRefs.current[item.id] }}
                    onMouseEnterMenu={cancelMenuCloseIntent}
                    onMouseLeaveMenu={handleMenuCloseIntent}
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-nexusbyte-primary-dark border-t border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item: NavItem) => (
                <div key={`${item.id}-mobile`}>
                  <button
                     onClick={() => handleNavItemClick(item.id, !!item.megaMenuContent)}
                    className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-nexusbyte-accent-green focus:outline-none focus:bg-gray-700 transition-colors duration-150 flex justify-between items-center
                      ${location.pathname.startsWith(item.path) || activeMegaMenu === item.id ? 'text-nexusbyte-accent-green' : 'text-gray-300'}`}
                    aria-haspopup={!!item.megaMenuContent}
                    aria-expanded={item.megaMenuContent && activeMegaMenu === item.id}
                  >
                    {!item.megaMenuContent ? (
                        <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                            {item.title}
                        </Link>
                    ) : (
                        <span className="block w-full">{item.title}</span>
                    )}
                    {item.megaMenuContent && <ChevronDownIcon className={`w-5 h-5 transition-transform ${activeMegaMenu === item.id ? 'transform rotate-180' : ''}`} />}
                  </button>
                  {item.megaMenuContent && activeMegaMenu === item.id && (
                    <div className="pl-4 mt-1 space-y-1 py-2 bg-gray-800 rounded-md">
                      {item.megaMenuContent.items.map(menuItem => (
                        <div key={`${menuItem.id}-mobile-group`} className="pt-2 pb-1">
                          <p className="px-3 pt-1 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {menuItem.title}
                          </p>
                          
                          {menuItem.featured.linkUrl && menuItem.featured.linkText && (
                            <Link
                              to={menuItem.featured.linkUrl}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveMegaMenu(null);
                              }}
                              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-nexusbyte-accent-green"
                            >
                              {menuItem.featured.linkText}
                            </Link>
                          )}

                          {menuItem.subLinks.map(subLink => (
                            <Link
                              key={`${menuItem.id}-${subLink.href}-mobile`}
                              to={subLink.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveMegaMenu(null);
                              }}
                              className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-nexusbyte-accent-green"
                            >
                              {subLink.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;