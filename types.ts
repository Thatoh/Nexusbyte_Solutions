import { ReactElement, SVGProps } from 'react';

// Original NavLinkMegaMenuContent (kept for reference or other nav items if not all are migrated)
// export interface NavLinkMegaMenuContent {
//   mainLinks: Array<{ title: string; href: string; description?: string }>;
//   featured?: {
//     title: string;
//     description: string;
//     imageUrl: string;
//     linkUrl: string;
//     linkText: string;
//   };
// }

// New types for the redesigned Mega Menu
export interface MegaMenuSubLink {
  title: string;
  imageUrl: string;
  href: string;
  description?: string; // Added optional description
}

export interface MegaMenuItemFeatured {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl?: string; // Optional URL for the "See More" link
  linkText?: string; // Optional text for the "See More" link
}

export interface MegaMenuItem {
  id: string; // e.g., 'cloud-solutions', 'cybersecurity'
  title: string; // Text for the left-rail link, e.g., "Cloud Solutions"
  featured: MegaMenuItemFeatured;
  subLinks: MegaMenuSubLink[];
}

export interface NewNavLinkMegaMenuContent {
  items: MegaMenuItem[];
}

export interface NavItem {
  id: string;
  title: string;
  path: string;
  // Use NewNavLinkMegaMenuContent for items that have the new mega menu design
  // Use original NavLinkMegaMenuContent for others, or update all if all mega menus change
  megaMenuContent?: NewNavLinkMegaMenuContent; // This will be used by specified nav items
}

export interface HeroSlideItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  groundingChunks?: GroundingChunk[];
  isLoading?: boolean; // Added for bot responses
}

export interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface Candidate {
  groundingMetadata?: GroundingMetadata;
}

export interface GenerateContentResponseWithGrounding {
  text: string;
  candidates?: Candidate[];
<<<<<<< HEAD
}

export interface SuggestedDomain {
  name: string;
  tld: string; // e.g. ".com", ".io"
=======
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
}