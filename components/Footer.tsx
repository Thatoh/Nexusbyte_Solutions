import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, COMPANY_MISSION } from '../constants';
<<<<<<< HEAD
import { XIcon, LinkedInIcon, FacebookIcon, GmailIcon, InstagramIcon, MicrosoftIcon, GithubIcon, DiscordIcon } from './icons'; // Updated to GmailIcon
=======
import { XIcon, LinkedInIcon, FacebookIcon } from './icons'; // Updated to XIcon
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93

const Footer: React.FC = () => {
  return (
    <footer className="bg-nexusbyte-primary-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Mission */}
          <div className="md:col-span-2 lg:col-span-1">
            <h5 className="text-xl font-semibold text-white mb-4">NexusByte</h5>
            <p className="text-sm leading-relaxed">{COMPANY_MISSION}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm hover:text-nexusbyte-accent-green transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Support</h5>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm hover:text-nexusbyte-accent-green transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.title}>
                  <Link to={link.href} className="text-sm hover:text-nexusbyte-accent-green transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NexusByte. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit our X profile">
              <XIcon className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit our LinkedIn profile">
              <LinkedInIcon className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit our Facebook page">
              <FacebookIcon className="h-6 w-6" />
            </a>
<<<<<<< HEAD
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit Gmail">
              <GmailIcon className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit our Instagram profile">
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit Microsoft">
              <MicrosoftIcon className="h-6 w-6" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit our Github profile">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-nexusbyte-accent-green transition-colors" aria-label="Visit Discord">
              <DiscordIcon className="h-6 w-6" />
            </a>
=======
>>>>>>> eefc3d953f59a23fd287bb7d411fee6ef5656a93
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;