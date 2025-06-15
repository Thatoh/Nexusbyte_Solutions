<<<<<<< HEAD

=======
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
import React, { useState, useEffect } from 'react';
import { NewNavLinkMegaMenuContent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
  content?: NewNavLinkMegaMenuContent;
<<<<<<< HEAD
  onClose: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
  onMouseEnterMenu?: () => void;
  onMouseLeaveMenu?: () => void;
=======
  onClose: () => void; 
  parentRef: React.RefObject<HTMLDivElement>;
  onMouseEnterMenu?: () => void; 
  onMouseLeaveMenu?: () => void; 
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  content,
  onClose,
  parentRef,
  onMouseEnterMenu,
  onMouseLeaveMenu
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
<<<<<<< HEAD
  const [position, setPosition] = useState<{ top: number } | null>(null);
=======
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93

  const fallbackImage = 'https://placehold.co/100x100/fee2e2/ef4444?text=ImgErr';
  const featuredFallbackImage = 'https://placehold.co/200x200/fee2e2/ef4444?text=ImgErr';

  useEffect(() => {
<<<<<<< HEAD
    if (isOpen && parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const topPosition = rect.bottom + 5; // Adjust this value for spacing from header
      setPosition({ top: topPosition });
    } else if (!isOpen) {
      setPosition(null);
    }
  }, [isOpen, parentRef]);
=======
    if (isOpen && parentRef && parentRef.current && content?.items?.length) {
      const rect = parentRef.current.getBoundingClientRect();
      const menuWidth = 720;
      let leftPosition = rect.left + rect.width / 2 - menuWidth / 2;
      const screenWidth = window.innerWidth;
      leftPosition = Math.max(10, Math.min(leftPosition, screenWidth - menuWidth - 10));
      const topPosition = rect.bottom + 5;
      setPosition({ top: topPosition, left: leftPosition });
    } else if (!isOpen) {
      setPosition(null);
    }
  }, [isOpen, parentRef, content]);
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [content, isOpen]);

  if (!isOpen || !position || !content || !content.items || content.items.length === 0) {
    return null;
  }

  const currentActiveIndex = activeIndex < content.items.length ? activeIndex : 0;
  const activeContent = content.items[currentActiveIndex];

  if (!activeContent) {
    return null;
  }

  const handleLinkClick = () => {
<<<<<<< HEAD
    onClose();
=======
    onClose(); 
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
  };

  return (
    <AnimatePresence>
      {isOpen && position && (
        <motion.div
<<<<<<< HEAD
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bg-white shadow-2xl z-50 border-t border-gray-200"
          style={{
            width: '100vw', // Full viewport width
            height: '1200px', // Requested height
            top: `${position.top}px`,
            left: '0px', // Align to the left edge of the viewport
=======
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bg-white shadow-2xl z-50 border border-gray-200 rounded-lg overflow-hidden"
          style={{
            width: '720px',
            height: '280px',
            top: `${position.top}px`,
            left: `${position.left}px`,
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
          }}
          onMouseEnter={onMouseEnterMenu}
          onMouseLeave={onMouseLeaveMenu}
        >
<<<<<<< HEAD
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8"> {/* Content wrapper */}
            <div className="flex h-full"> {/* Existing flex container for left/right panels */}
              {/* Left-Hand Navigation Rail */}
              <div className="w-1/3 bg-gray-50/70 border-r border-gray-200 p-2 flex flex-col overflow-y-auto">
                {content.items.map((item, index) => (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`block w-full text-left p-3 my-1 rounded-md text-sm font-semibold transition-all duration-150 ease-in-out focus:outline-none
                      ${currentActiveIndex === index
                        ? 'bg-white text-nexusbyte-accent-green shadow-sm transform scale-[1.02]'
                        : 'text-nexusbyte-primary-dark hover:bg-gray-200/80 hover:text-nexusbyte-accent-green'
                      }`}
                    aria-current={currentActiveIndex === index ? "true" : "false"}
                  >
                    {item.title} &raquo;
                  </button>
                ))}
              </div>

              {/* Right-Hand Content Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActiveIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="w-2/3 p-5 flex flex-col bg-white h-full overflow-y-auto" // Added h-full and overflow-y-auto
                >
                  {/* Top Featured Section */}
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={activeContent.featured.imageUrl}
                      alt={activeContent.featured.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0 border border-gray-100" // Slightly larger image
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = featuredFallbackImage; }}
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg md:text-xl font-bold text-nexusbyte-primary-dark mb-2">{activeContent.featured.title}</h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-6">{activeContent.featured.description}</p> {/* Increased line-clamp */}
                      {activeContent.featured.linkUrl && activeContent.featured.linkText && (
                          <Link
                              to={activeContent.featured.linkUrl}
                              onClick={handleLinkClick}
                              className="text-sm md:text-base font-semibold text-nexusbyte-accent-green hover:underline inline-block mt-3"
                          >
                              {activeContent.featured.linkText} &rarr;
                          </Link>
                      )}
                    </div>
                  </div>

                  {/* Bottom Sub-Links Section */}
                  <div className="mt-4 border-t border-gray-200 pt-6"> {/* Increased pt */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4"> {/* Increased gaps */}
                      {activeContent.subLinks.slice(0, 4).map(subLink => ( // Still showing max 4 for this layout
                        <Link
                          key={subLink.title}
                          to={subLink.href}
                          onClick={handleLinkClick}
                          className="group p-3 rounded-lg hover:bg-gray-100 transition-colors flex items-start gap-3" // Increased padding and gap
                          title={subLink.title}
                        >
                          <img
                              src={subLink.imageUrl}
                              alt={subLink.title}
                              className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0 border border-gray-200 group-hover:border-nexusbyte-accent-green transition-colors" // Slightly larger images
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }}
                          />
                          <div className="flex-grow">
                              <h4 className="font-semibold text-sm md:text-base text-gray-800 group-hover:text-nexusbyte-accent-green mb-1 line-clamp-1">
                                  {subLink.title}
                              </h4>
                              {subLink.description && (
                                  <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-tight">
                                      {subLink.description}
                                  </p>
                              )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* The rest of the 1200px height will be empty space below this section if content is not enough */}
                </motion.div>
              </AnimatePresence>
            </div>
=======
          <div className="flex h-full">
            {/* Left-Hand Navigation Rail */}
            <div className="w-1/3 bg-gray-50/70 border-r border-gray-200 p-2 flex flex-col overflow-y-auto">
              {content.items.map((item, index) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`block w-full text-left p-3 my-1 rounded-md text-sm font-semibold transition-all duration-150 ease-in-out focus:outline-none
                    ${currentActiveIndex === index
                      ? 'bg-white text-nexusbyte-accent-green shadow-sm transform scale-[1.02]'
                      : 'text-nexusbyte-primary-dark hover:bg-gray-200/80 hover:text-nexusbyte-accent-green'
                    }`}
                  aria-current={currentActiveIndex === index ? "true" : "false"}
                >
                  {item.title} &raquo;
                </button>
              ))}
            </div>

            {/* Right-Hand Content Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActiveIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="w-2/3 p-5 flex flex-col bg-white"
              >
                {/* Top Featured Section */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={activeContent.featured.imageUrl}
                    alt={activeContent.featured.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = featuredFallbackImage; }}
                  />
                  <div className="flex-grow">
                    <h3 className="text-md font-bold text-nexusbyte-primary-dark mb-1">{activeContent.featured.title}</h3>
                    <p className="text-sm text-gray-600 leading-snug line-clamp-2">{activeContent.featured.description}</p>
                    {activeContent.featured.linkUrl && activeContent.featured.linkText && (
                        <Link
                            to={activeContent.featured.linkUrl}
                            onClick={handleLinkClick}
                            className="text-sm font-semibold text-nexusbyte-accent-green hover:underline inline-block mt-2"
                        >
                            {activeContent.featured.linkText} &rarr;
                        </Link>
                    )}
                  </div>
                </div>

                {/* Bottom Sub-Links Section */}
                <div className="mt-auto border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3"> {/* Max 4 items in 2x2 grid */}
                    {activeContent.subLinks.slice(0, 4).map(subLink => (
                      <Link
                        key={subLink.title}
                        to={subLink.href}
                        onClick={handleLinkClick}
                        className="group p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-start gap-2.5"
                        title={subLink.title}
                      >
                        <img 
                            src={subLink.imageUrl} 
                            alt={subLink.title} 
                            className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-200 group-hover:border-nexusbyte-accent-green transition-colors"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage; }}
                        />
                        <div className="flex-grow">
                            <h4 className="font-semibold text-[13px] text-gray-800 group-hover:text-nexusbyte-accent-green mb-0.5 line-clamp-1">
                                {subLink.title}
                            </h4>
                            {subLink.description && (
                                <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                                    {subLink.description}
                                </p>
                            )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

<<<<<<< HEAD
export default MegaMenu;
=======
export default MegaMenu;
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
