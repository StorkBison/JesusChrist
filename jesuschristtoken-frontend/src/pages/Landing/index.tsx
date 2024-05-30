import styled from 'styled-components';
import { NavBar } from '../../components/NavBar';
import { MobileNavBar } from '../../components/MobileNavbar';
import HeroSection from '../../components/Hero';
import AboutSection from '../../components/About';
import TimeLineSection from '../../components/TimeLine';
import TokenomicsSection from '../../components/Tokenomics';
import TeamSection from '../../components/Team';
import MobileHeroSection from '../../components/MobileHero';
import MobileTimeLineSection from '../../components/MobileTimeline';
import { useMediaQuery } from 'usehooks-ts';

const Wrapper = styled.div`
  position: relative;
`;

export const LandingPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Wrapper>
      {isMobile ? <MobileNavBar /> : <NavBar />}
      {isMobile ? <MobileHeroSection /> : <HeroSection />}
      <AboutSection />
      {isMobile ? <MobileTimeLineSection /> : <TimeLineSection />}
      <TokenomicsSection />
      <TeamSection />
    </Wrapper>
  );
};

export default LandingPage;
