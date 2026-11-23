import { Container } from '../common/Container';

import { HeroAvatar } from './HeroAvatar';
import { HeroInfo } from './HeroInfo';

export const HeroSection = () => {
  return (
    <Container>
      <HeroAvatar />
      <HeroInfo />
    </Container>
  );
};

export default HeroSection;
