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
`;

const TimeLineDescriptionRightWrapper = styled.div`
  width: 35%;
  margin-right: 10%;
  text-align: -webkit-center;
`;

const TimeLineDescriptionDiv = styled.div`
  height: 150px;
  width: 100%;
  background: rgba(0, 0, 0, 0.13);
  border-radius: 16px;
`;

const TimeLineLine = styled.div`
  margin-top: -16px;
  width: 65%;
  border: 4px solid #ffaf4c;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.68);
`;

const TimeLineDescriptionDivLine = styled.div`
  border: 4px solid #ffaf4c;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.68);
  width: 0px;
  height: 32px;
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
`;

const TimeLineImage = styled.img`
  filter: drop-shadow(3px 4px 12px rgba(0, 0, 0, 0.13));
  bottom: 0;
  width: 65%;
  object-fit: contain;
  object-position: bottom;
  border-bottom-left-radius: 64px;
`;

const LogoRectangle = styled.div`
  position: absolute;
  bottom: 0px;
  background: #ffaf4c;
  border-radius: 16px;
  width: 100%;
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
`;

export const TimeLineSection = () => {
  return (
    <div className="container m-auto mt-16 mb-16">
      <SectionWrapper className="relative m-auto">
        <div className="text-center">
          <TimeLineBigTitle>
            Time<span>Line</span>
          </TimeLineBigTitle>

          <TimeLineWrapper className="relative">
            <div className="md:flex">
              <TimeLineDescriptionRightWrapper>
                <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                <LevelContainer className="mt-4">Level 1</LevelContainer>
                <TimeLineDescriptionDivLine />
                <TimeLineDescriptionDivCircle />
              </TimeLineDescriptionRightWrapper>
              <TimeLineDescriptionRightWrapper>
                <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
                <LevelContainer className="mt-4">Level 3</LevelContainer>
                <TimeLineDescriptionDivLine />
                <TimeLineDescriptionDivCircle />
              </TimeLineDescriptionRightWrapper>
            </div>
            <TimeLineLine />
            <SecondWrapper className="md:flex md:items-start md:flex-row-reverse">
              <TimeLineDescriptionLeftWrapper>
                <TimeLineDescriptionDivCircle />
                <TimeLineDescriptionDivLine />
                <LevelContainer className="md:mb-4">Level 4</LevelContainer>
                <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
              </TimeLineDescriptionLeftWrapper>
              <TimeLineDescriptionLeftWrapper>
                <TimeLineDescriptionDivCircle />
                <TimeLineDescriptionDivLine />
                <LevelContainer className="md:mb-4">Level 2</LevelContainer>
                <TimeLineDescriptionDiv></TimeLineDescriptionDiv>
              </TimeLineDescriptionLeftWrapper>
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

export default TimeLineSection;
