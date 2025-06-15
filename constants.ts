import { NavItem, HeroSlideItem, ServiceItem, PartnerLogo, NewNavLinkMegaMenuContent } from './types';
import { BriefcaseIcon, CloudArrowUpIcon, CpuChipIcon, LightBulbIcon, LockClosedIcon, UsersIcon, WifiIcon } from './components/icons';
import React from 'react';

// Sample data for the new Mega Menu structure
const solutionsMegaMenu: NewNavLinkMegaMenuContent = {
  items: [
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      featured: {
        title: 'NexusCloud Platform',
        description: 'Scalable, secure, and resilient cloud infrastructure tailored to your business needs. Innovate faster with our comprehensive cloud services.',
        imageUrl: 'https://picsum.photos/seed/cloudplatform/200/200',
        linkUrl: '/solutions/cloud',
        linkText: 'Explore Cloud Platform',
      },
      subLinks: [
        { title: 'Compute Services', imageUrl: 'https://picsum.photos/seed/compute/100/100', href: '/solutions/cloud/compute', description: 'Powerful virtual servers for any workload.' },
        { title: 'Storage Solutions', imageUrl: 'https://picsum.photos/seed/storage/100/100', href: '/solutions/cloud/storage', description: 'Reliable and scalable data storage options.' },
        { title: 'Networking', imageUrl: 'https://picsum.photos/seed/networking/100/100', href: '/solutions/cloud/networking', description: 'Secure and fast virtual networks.' },
        { title: 'Serverless', imageUrl: 'https://picsum.photos/seed/serverless/100/100', href: '/solutions/cloud/serverless', description: 'Run code without managing servers.' },
      ],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      featured: {
        title: 'NexusGuard Security',
        description: 'Comprehensive protection against evolving cyber threats. Secure your assets, data, and reputation with our advanced security suite.',
        imageUrl: 'https://picsum.photos/seed/nexusguard_featured/200/200',
        linkUrl: '/solutions/cybersecurity',
        linkText: 'Discover NexusGuard',
      },
      subLinks: [
        { title: 'Threat Detection', imageUrl: 'https://picsum.photos/seed/threat/100/100', href: '/solutions/cybersecurity/threat-detection', description: 'Advanced threat identification.' },
        { title: 'Data Protection', imageUrl: 'https://picsum.photos/seed/dataprotect/100/100', href: '/solutions/cybersecurity/data-protection', description: 'Secure your critical information.' },
        { title: 'Compliance', imageUrl: 'https://picsum.photos/seed/compliance/100/100', href: '/solutions/cybersecurity/compliance', description: 'Meet industry regulations.' },
        { title: 'Endpoint Security', imageUrl: 'https://picsum.photos/seed/endpoint/100/100', href: '/solutions/cybersecurity/endpoint', description: 'Protect all user devices.' },
      ],
    },
    {
      id: 'managed-it',
      title: 'Managed IT',
      featured: {
        title: 'Proactive IT Management',
        description: 'Reliable and efficient IT support to keep your operations running smoothly. Focus on your core business while we manage your IT.',
        imageUrl: 'https://picsum.photos/seed/managedit_featured/200/200',
        linkUrl: '/solutions/managed-it',
        linkText: 'Learn About Managed Services',
      },
      subLinks: [
        { title: 'Helpdesk Support', imageUrl: 'https://picsum.photos/seed/helpdesk/100/100', href: '/solutions/managed-it/helpdesk', description: '24/7 expert assistance.' },
        { title: 'System Monitoring', imageUrl: 'https://picsum.photos/seed/monitoring/100/100', href: '/solutions/managed-it/monitoring', description: 'Continuous health checks.' },
        { title: 'IT Consulting', imageUrl: 'https://picsum.photos/seed/itconsult/100/100', href: '/solutions/managed-it/consulting', description: 'Strategic IT guidance.' },
        { title: 'Backup & Recovery', imageUrl: 'https://picsum.photos/seed/backupit/100/100', href: '/solutions/managed-it/backup', description: 'Protect your business data.' },
      ],
    },
  ],
};

const useCasesMegaMenu: NewNavLinkMegaMenuContent = {
  items: [
    {
      id: 'remote-work',
      title: 'Remote Work',
      featured: {
        title: 'Enable Your Hybrid Workforce',
        description: 'Seamless tools and strategies for productive and secure remote operations. Empower your team, anywhere.',
        imageUrl: 'https://picsum.photos/seed/remotework_featured/200/200',
        linkUrl: '/use-cases/remote-work',
        linkText: 'Explore Remote Solutions',
      },
      subLinks: [
        { title: 'Collaboration Tools', imageUrl: 'https://picsum.photos/seed/collabtools/100/100', href: '/use-cases/remote-work/collaboration', description: 'Enhance team productivity.' },
        { title: 'Secure Access', imageUrl: 'https://picsum.photos/seed/secureaccess/100/100', href: '/use-cases/remote-work/security', description: 'Safe connections from anywhere.' },
        { title: 'Device Management', imageUrl: 'https://picsum.photos/seed/devicemanage/100/100', href: '/use-cases/remote-work/devices', description: 'Manage all corporate devices.' },
        { title: 'Virtual Desktops', imageUrl: 'https://picsum.photos/seed/vdi/100/100', href: '/use-cases/remote-work/vdi', description: 'Access desktops on any device.' },
      ],
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      featured: {
        title: 'Modernize Your Business',
        description: 'Leverage technology to innovate, optimize processes, and enhance customer experiences. Drive your business forward.',
        imageUrl: 'https://picsum.photos/seed/digitaltrans_featured/200/200',
        linkUrl: '/use-cases/digital-transformation',
        linkText: 'Start Your Transformation',
      },
      subLinks: [
        { title: 'Process Automation', imageUrl: 'https://picsum.photos/seed/automation/100/100', href: '/use-cases/digital-transformation/automation', description: 'Streamline repetitive tasks.' },
        { title: 'Data Analytics', imageUrl: 'https://picsum.photos/seed/analytics_dt/100/100', href: '/use-cases/digital-transformation/analytics', description: 'Gain actionable insights.' },
        { title: 'Customer Experience', imageUrl: 'https://picsum.photos/seed/cx/100/100', href: '/use-cases/digital-transformation/cx', description: 'Improve customer interactions.' },
        { title: 'Legacy Modernization', imageUrl: 'https://picsum.photos/seed/legacymod/100/100', href: '/use-cases/digital-transformation/legacy', description: 'Update outdated systems.' },
      ],
    },
  ],
};

// Placeholder content for other mega menus
const genericMegaMenu: NewNavLinkMegaMenuContent = {
  items: [
    {
      id: 'generic-item-1',
      title: 'Core Offering',
      featured: {
        title: 'Explore Our Core Offerings',
        description: 'Discover a range of solutions designed to meet your business needs.',
        imageUrl: 'https://picsum.photos/seed/generic_featured1/200/200',
        linkUrl: '#',
        linkText: 'Learn More',
      },
      subLinks: [
        { title: 'Service A', imageUrl: 'https://picsum.photos/seed/serviceA/100/100', href: '#', description: 'Description for Service A.' },
        { title: 'Service B', imageUrl: 'https://picsum.photos/seed/serviceB/100/100', href: '#', description: 'Description for Service B.' },
        { title: 'Service C', imageUrl: 'https://picsum.photos/seed/serviceC/100/100', href: '#', description: 'Description for Service C.' },
        { title: 'Service D', imageUrl: 'https://picsum.photos/seed/serviceD/100/100', href: '#', description: 'Description for Service D.' },
      ],
    },
    {
      id: 'generic-item-2',
      title: 'Advanced Solutions',
      featured: {
        title: 'Advanced Technological Solutions',
        description: 'Cutting-edge technology to give you a competitive advantage.',
        imageUrl: 'https://picsum.photos/seed/generic_featured2/200/200',
        linkUrl: '#',
        linkText: 'Discover Advanced Tech',
      },
      subLinks: [
        { title: 'Tech X', imageUrl: 'https://picsum.photos/seed/techX/100/100', href: '#', description: 'Details about Tech X.' },
        { title: 'Tech Y', imageUrl: 'https://picsum.photos/seed/techY/100/100', href: '#', description: 'Details about Tech Y.' },
        { title: 'Tech Z', imageUrl: 'https://picsum.photos/seed/techZ/100/100', href: '#', description: 'Details about Tech Z.' },
        { title: 'Tech W', imageUrl: 'https://picsum.photos/seed/techW/100/100', href: '#', description: 'Details about Tech W.' },
      ],
    },
  ],
};


export const NAV_ITEMS: NavItem[] = [
  {
    id: 'solutions',
    title: 'Solutions',
    path: '/solutions', 
    megaMenuContent: solutionsMegaMenu,
  },
  {
    id: 'use-cases',
    title: 'Use Cases',
    path: '/use-cases',
    megaMenuContent: useCasesMegaMenu,
  },
  {
    id: 'insights',
    title: 'Insights',
    path: '/insights',
    megaMenuContent: genericMegaMenu, 
  },
  {
    id: 'ai',
    title: 'AI',
    path: '/ai',
    megaMenuContent: genericMegaMenu, 
  },
  {
    id: 'hybrid-solutions',
    title: 'Hybrid Solutions',
    path: '/hybrid-solutions',
    megaMenuContent: genericMegaMenu, 
  },
  { id: 'bytedesk', title: 'ByteDesk', path: '/bytedesk' },
];

export const HERO_SLIDES_DATA: HeroSlideItem[] = [
  { id: 1, title: "AI", description: "Artificial Intelligence Services", image: "https://picsum.photos/seed/ai_hero/1200/800" },
  { id: 2, title: "Cloud", description: "Cloud Migration & Management", image: "https://picsum.photos/seed/cloud_hero/1200/800" },
  { id: 3, title: "ICT", description: "ICT Support Solutions", image: "https://picsum.photos/seed/ict_hero/1200/800" },
  { id: 4, title: "Cyber", description: "Cybersecurity and Compliance", image: "https://picsum.photos/seed/cyber_hero/1200/800" },
  { id: 5, title: "Hybrid", description: "Hybrid Work Environments", image: "https://picsum.photos/seed/hybrid_hero/1200/800" },
];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 1, title: 'AI Development', description: 'Custom AI solutions to optimize your business processes.', icon: React.createElement(CpuChipIcon) },
  { id: 2, title: 'Cloud Services', description: 'Reliable cloud infrastructure and migration services.', icon: React.createElement(CloudArrowUpIcon) },
  { id: 3, title: 'ICT Consulting', description: 'Expert advice to align your IT strategy with business goals.', icon: React.createElement(LightBulbIcon) },
  { id: 4, title: 'Cybersecurity Solutions', description: 'Comprehensive security to protect your valuable assets.', icon: React.createElement(LockClosedIcon) },
  { id: 5, title: 'Hybrid Work Setup', description: 'Seamlessly integrate remote and in-office work environments.', icon: React.createElement(UsersIcon) },
  { id: 6, title: 'Network Solutions', description: 'Robust and scalable network design and implementation.', icon: React.createElement(WifiIcon) },
];

export const PARTNER_LOGOS_DATA: PartnerLogo[] = [
  { id: 1, src: 'https://picsum.photos/seed/logo1/150/75?grayscale', alt: 'Partner 1' },
  { id: 2, src: 'https://picsum.photos/seed/logo2/150/75?grayscale', alt: 'Partner 2' },
  { id: 3, src: 'https://picsum.photos/seed/logo3/150/75?grayscale', alt: 'Partner 3' },
  { id: 4, src: 'https://picsum.photos/seed/logo4/150/75?grayscale', alt: 'Partner 4' },
  { id: 5, src: 'https://picsum.photos/seed/logo5/150/75?grayscale', alt: 'Partner 5' },
  { id: 6, src: 'https://picsum.photos/seed/logo6/150/75?grayscale', alt: 'Partner 6' },
  { id: 7, src: 'https://picsum.photos/seed/logo7/150/75?grayscale', alt: 'Partner 7' },
  { id: 8, src: 'https://picsum.photos/seed/logo8/150/75?grayscale', alt: 'Partner 8' },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { title: 'Solutions', href: '/solutions' },
    { title: 'Use Cases', href: '/use-cases' },
    { title: 'AI', href: '/ai' },
    { title: 'ByteDesk', href: '/bytedesk' },
  ],
  support: [
    { title: 'Contact Us', href: '/contact' },
    { title: 'FAQs', href: '/faq' },
    { title: 'Documentation', href: '/docs' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Cookie Policy', href: '/cookies' },
  ],
};

export const COMPANY_MISSION = "NexusByte is dedicated to empowering businesses through innovative ICT solutions, driving efficiency, and fostering growth in the digital age.";