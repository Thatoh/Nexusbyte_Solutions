import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ServicesCarousel from '../components/ServicesCarousel';
import DomainSearch from '../components/DomainSearch';
import AIChatbotSection from '../components/AIChatbotSection';
import PartnersSlider from '../components/PartnersSlider';

interface HomePageProps {
  openChat: () => void; // Function to open the chat modal
}

const HomePage: React.FC<HomePageProps> = ({ openChat }) => {
  return (
    <>
      <HeroSlider />
      <ServicesCarousel />
      <DomainSearch />
      <AIChatbotSection onOpenChat={openChat} />
      <PartnersSlider />
    </>
  );
};

export default HomePage;