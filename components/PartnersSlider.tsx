import React from 'react';
import { PARTNER_LOGOS_DATA } from '../constants';

const PartnersSlider: React.FC = () => {
  const duplicatedLogos = [...PARTNER_LOGOS_DATA, ...PARTNER_LOGOS_DATA]; // Duplicate for seamless scroll

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-nexusbyte-primary-dark mb-10">Trusted By Leading Companies</h2>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {duplicatedLogos.map((logo, index) => (
              <li key={`${logo.id}-${index}`} className="flex-shrink-0">
                <img src={logo.src} alt={logo.alt} className="h-10 md:h-12 object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;