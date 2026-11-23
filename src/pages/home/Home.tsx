import React from 'react';

import { Container } from '../../components/common/Container';
import { Reveal } from '../../components/common/Reveal';
import { HeroSection } from '../../components/home/HeroSection';
import { SkillsCarousel } from '../../components/home/SkillsCarousel';
import { Github } from '../../components/home/Github';
import { OpenWork } from '../../components/home/OpenWork';
import { Experience } from '../../components/home/Experience';
import { Projects } from '../../components/home/Projects';
import UsesSection from '../../components/uses/UsesSection';
import ContactMe from '../../components/contactMe/ContactMe';
import Footer from '../../components/footer/Footer';

/**
 * Home page with consistent container width.
 */
export const Home: React.FC = () => {
  return (
    <div className="main-content">
      <Container className="mt-5 px-4 md:px-6 lg:px-0">
        <HeroSection />

        <Reveal delay={0.6}>
          <SkillsCarousel />
        </Reveal>

        <Reveal delay={0.2}>
          <Github />
        </Reveal>

        <Reveal delay={0.2}>
          <OpenWork />
        </Reveal>

        <Reveal delay={0.2}>
          <Experience />
        </Reveal>

        <Projects />

        <div className="pt-8">
          <UsesSection />

          <ContactMe />
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
