import styled from 'styled-components';

const SectionWrapper = styled.div`
  width: 90%;
  background: #fff4e6;
  border-radius: 64px;
  box-shadow: 16px 16px #ffaf4c;
`;

const ContentWrapper = styled.div`
  z-index: 0;
`;

const AboutBigTitle = styled.div`
  font-family: 'Rammetto One';
  font-weight: 400;
  font-size: 42px;
  color: #33221e;
  margin-bottom: 32px;

  span {
    color: #ffaf4c;
  }

  @media (max-width: 520px) {
    font-size: 32px;
  }
`;

const AboutDesc = styled.div`
  color: #33221e;
  opacity: 0.8;
  font-weight: 500;
  font-size: 18px;
  line-height: 189.89%;

  @media (max-width: 520px) {
    font-size: 12px;
  }
`;

const PresaleBigText = styled.div`
  font-family: 'Rammetto One';
  font-weight: 400;
  font-size: 24px;
  color: #33221e;

  span {
    color: #ffaf4c;
  }
`;

const TimeWrapper = styled.div`
  position: relative;
  @media (max-width: 520px) {
    font-size: 10px;
  }
`;

const TimeNumber = styled.div`
  font-weight: 400;
  font-size: 30px;
  text-align: center;
  color: #33221e;

  &.colorful {
    display: block;
    width: 40px;
    height: 48px;
    background: rgb(255 175 76 / 20%);
    border-radius: 8px;
  }
  @media (max-width: 520px) {
    font-size: 20px;
    &.colorful {
      width: 26px;
      height: 32px;
    }
  }
`;

const AboutImage = styled.img`
  position: absolute;
  left: -3%;
  bottom: 0;
  height: 85%;
  max-width: 65%;
  object-fit: contain;
  object-position: bottom;
  border-bottom-left-radius: 64px;
  @media (max-width: 1024px) {
    max-width: 80%;
    left: -4%;
  }
`;

const AboutImageWrapper = styled.div`
  @media (max-width: 1024px) {
    height: 120px;
  }
`;

export const AboutSection = () => {
  return (
    <div className="container m-auto mt-16 mb-16">
      <SectionWrapper className="relative flex grid justify-end p-2 px-4 m-auto lg:grid-cols-12 lg:flex-row-reverse sm:p-4 sm:px-8 md:p-8 md:px-16">
        <div className="lg:col-span-4"></div>
        <ContentWrapper className="text-center lg:col-span-8 md:text-right">
          <AboutBigTitle>
            About <br className="block md:hidden" /> <span>Jesus</span> Token
          </AboutBigTitle>

          <AboutDesc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna
          </AboutDesc>

          <PresaleBigText className="mt-8 md:mt-16">
            <span>Presale</span> starts in
          </PresaleBigText>

          <div className="flex items-start justify-end gap-2 mt-4 mb-16">
            <TimeWrapper>
              <div className="flex items-center gap-2">
                <TimeNumber className="colorful">2</TimeNumber>
                <TimeNumber className="colorful">1</TimeNumber>
              </div>

              <div className="mt-1 text-color-dark-1">Days</div>
            </TimeWrapper>

            <TimeNumber>:</TimeNumber>

            <TimeWrapper>
              <div className="flex items-center gap-2">
                <TimeNumber className="colorful">1</TimeNumber>
                <TimeNumber className="colorful">2</TimeNumber>
              </div>

              <div className="mt-1 text-color-dark-1">Hours</div>
            </TimeWrapper>

            <TimeNumber>:</TimeNumber>
            <TimeWrapper>
              <div className="flex items-center gap-2">
                <TimeNumber className="colorful">3</TimeNumber>
                <TimeNumber className="colorful">6</TimeNumber>
              </div>

              <div className="mt-1 text-color-dark-1">Minutes</div>
            </TimeWrapper>

            <TimeNumber>:</TimeNumber>

            <TimeWrapper>
              <div className="flex items-center gap-2">
                <TimeNumber className="colorful">2</TimeNumber>
                <TimeNumber className="colorful">7</TimeNumber>
              </div>

              <div className="mt-1 text-color-dark-1">Seconds</div>
            </TimeWrapper>
          </div>
        </ContentWrapper>
        <AboutImageWrapper className="lg:col-span-4">
          <AboutImage alt="pic" src="/assets/imgs/Jesus_About.png" />
        </AboutImageWrapper>
      </SectionWrapper>
    </div>
  );
};

export default AboutSection;
