import styled from 'styled-components';

const SectionWrapper = styled.div`
  width: 90%;
`;

const TimeLineWrapper = styled.div`
  text-align: -webkit-center;
`;

const TimeLineDescriptionLeftWrapper = styled.div`
  width: 35%;
  margin-left: 8%;
  text-align: -webkit-center;
  @media (max-width: 1024px) {
    width: 100%;
    padding-top: 24px;
    position: relative;
    border: 4px solid #ffaf4c;
    border-right: none;
    border-top: none;
    border-bottom: none;
    margin-left: 0%;
  }
`;

const TimeLineDescriptionLeft4Wrapper = styled.div`
  width: 35%;
  margin-left: 8%;
  text-align: -webkit-center;
  @media (max-width: 1024px) {
    width: 100%;
    padding-top: 24px;
    border: 4px solid #33221e;
    position: relative;
    border-right: none;
    border-top: none;
    border-bottom: none;
    margin-left: 0%;
  }
`;

const TimeLineDescriptionRightWrapper = styled.div`
  width: 35%;
  margin-right: 10%;
  text-align: -webkit-center;

  @media (max-width: 1024px) {
    width: 100%;
    padding-top: 24px;
    position: relative;
    border: 4px solid #ffaf4c;
    border-right: none;
    border-top: none;
    border-bottom: none;
  }
`;

const TimeLineDescriptionDiv = styled.div`
  height: 150px;
  width: 100%;
  background: rgba(0, 0, 0, 0.13);
  border-radius: 16px;

  @media (max-width: 1024px) {
    width: 100%;
    position: relative;
  }
`;

const TimeLineLine = styled.div`
  margin-top: -16px;
  width: 65%;
  border: 4px solid #ffaf4c;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.68);
  @media (max-width: 1024px) {
    display: none;
  }
`;

const TimeLineDescriptionDivLine = styled.div`
  border: 4px solid #ffaf4c;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.68);
  width: 0px;
  height: 32px;

  @media (max-width: 1024px) {
    position: absolute;
    width: 32px;
    height: 0px;
    top: 0px;
  }
`;

const TimeLineDescriptionDivCircle = styled.div`
  box-sizing: border-box;
  background: #fff4e6;
  border: 4px solid #ffaf4c;
  border-radius: 9999px;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.68);
  width: 24px;
  height: 24px;
  z-index: 99;

  @media (max-width: 1024px) {
    position: absolute;
    top: -9px;
    left: -16px;
  }
`;

const LevelContainer = styled.div`
  background: #ffaf4c;
  border-radius: 9999px;
  box-shadow: 0px 0px 8px rgba(255, 175, 76, 0.56);
  padding: 5px 32px;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  color: #33221e;
  width: fit-content;
  z-index: 99;
  top: -80px;

  @media (max-width: 1024px) {
    position: absolute;
    top: -32px;
    left: 24px;
  }
`;

const TimeLineImage = styled.img`
  filter: drop-shadow(3px 4px 12px rgba(0, 0, 0, 0.13));
  bottom: 0;
  width: 65%;
  object-fit: contain;
  object-position: bottom;
  border-bottom-left-radius: 64px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const LogoRectangle = styled.div`
  position: absolute;
  bottom: 0px;
  background: #ffaf4c;
  border-radius: 16px;
  width: 100%;
  @media (max-width: 1024px) {
    height: 30%;
  }
`;

const TimeLineBigTitle = styled.div`
  font-family: 'Rammetto One';
  font-weight: 400;
  font-size: 42px;
  color: #fff4e5;
  margin-bottom: 32px;

  span {
    color: #ffaf4c;
  }
`;

const SecondWrapper = styled.div`
  margin-top: -16px;
  @media (max-width: 1024px) {
    margin-top: none;
  }
`;

export const MobileTimeLineSection = () => {
  return (
    <div className="container m-auto mt-16 mb-16">
      <SectionWrapper className="relative m-auto">
        <div className="text-center">
          <TimeLineBigTitle>
            Time<span>Line</span>
          </TimeLineBigTitle>

          <TimeLineWrapper className="relative">
            <div className="lg:flex">
              <TimeLineDescriptionRightWrapper>
                <div className="flex flex-col px-4 pt-6 pb-8">
                  <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                </div>{' '}
                <LevelContainer className="mt-4">Level 1</LevelContainer>
                <TimeLineDescriptionDivLine />
                <TimeLineDescriptionDivCircle />
              </TimeLineDescriptionRightWrapper>
              <TimeLineDescriptionRightWrapper>
                <div className="flex flex-col px-4 pt-6 pb-12">
                  <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                </div>{' '}
                <LevelContainer className="mt-4">Level 2</LevelContainer>
                <TimeLineDescriptionDivLine />
                <TimeLineDescriptionDivCircle />
              </TimeLineDescriptionRightWrapper>
            </div>
            <TimeLineLine />
            <SecondWrapper className="lg:flex lg:items-start lg:flex-row-reverse">
              <TimeLineDescriptionLeftWrapper>
                <TimeLineDescriptionDivCircle />
                <TimeLineDescriptionDivLine />
                <LevelContainer className="mt-4">Level 3</LevelContainer>
                <div className="flex flex-col px-4 pt-6 pb-8">
                  <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                </div>{' '}
              </TimeLineDescriptionLeftWrapper>
              <TimeLineDescriptionLeft4Wrapper>
                <TimeLineDescriptionDivCircle />
                <TimeLineDescriptionDivLine />
                <LevelContainer className="mt-4">Level 4</LevelContainer>
                <div className="flex flex-col px-4 pt-6 ">
                  <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                </div>
              </TimeLineDescriptionLeft4Wrapper>
            </SecondWrapper>
          </TimeLineWrapper>
        </div>

        <div className="relative w-full">
          <LogoRectangle>
            <div className="flex flex-row-reverse px-4 py-2">
              <img alt="pic" className="hidden lg:block" src="/assets/imgs/Logo.png" />
            </div>
          </LogoRectangle>
          <TimeLineImage alt="pic" src="/assets/imgs/Timeline.png" />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MobileTimeLineSection;
