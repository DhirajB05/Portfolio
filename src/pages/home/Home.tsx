import React from 'react';
import HeroSection from '../../components/heroSection/HeroSection';
import SkillSection from '../../components/skillSection/SkillSection';
import Experience from '../../components/experience/Experience';
import Projects from '../../components/projects/Projects';
import UsesSection from '../../components/uses/UsesSection';
import ContactMe from '../../components/contactMe/ContactMe';
import Footer from '../../components/footer/Footer';

export const Home: React.FC = () => {
  return (
    <div className="main-content">
      <HeroSection />
      <SkillSection />
      <Experience />
      <Projects />
      <UsesSection />
      <ContactMe />
      <Footer />
    </div>
  );
};

export default Home;
