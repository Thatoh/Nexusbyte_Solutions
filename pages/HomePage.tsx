import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServicesCarousel from '../components/ServicesCarousel';
import DomainSearch from '../components/DomainSearch';
import AIChatbotSection from '../components/AIChatbotSection';
import PartnersSlider from '../components/PartnersSlider';

interface HomePageProps {
  openChat: () => void; // This prop is for the main floating chat, AIChatbotSection is now inline
}

const HomePage: React.FC<HomePageProps> = ({ openChat }) => {
  return (
    <>
      <HeroSlider />
      <ServicesCarousel />
      <DomainSearch />
      {/* AIChatbotSection no longer needs openChat as it's inline */}
      <AIChatbotSection /> 
      <PartnersSlider />
    </>
  );
};

export default HomePage;
