import styled from "styled-components";

const SectionWrapper = styled.div`
    width: 90%;
    background: #fff4e6;
    border-radius: 64px;
    box-shadow: 16px 16px #ffaf4c;
`;

const ContentWrapper = styled.div`
`;

const AboutBigTitle = styled.div`
    font-family: "Rammetto One";
    font-weight: 400;
    font-size: 42px;
    color: #33221e;
    margin-bottom: 32px;

    span {
        color: #ffaf4c;
    }
`;

const AboutImage = styled.img`
`;

const Footer = styled.p`
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 189.89%;
  color: #FFF4E6;
`;

export const TeamSection = () => {
  return (
    <div className="container m-auto mb-16 text-center">
      <SectionWrapper className="pt-8 px-16 m-auto mb-16 justify-center">

        <ContentWrapper className="text-center">
          <AboutBigTitle>
            Our <span>Team</span>
          </AboutBigTitle>

          <div className="grid grid-cols-12 gap-2 mt-4 mb-16">
            <div className="col-span-6 lg:col-span-3 justify-center text-black">
              <img className="m-2 inline-block" alt="pic" src="/assets/imgs/Team1.png" />
              <p className="font-bold mt-4">Matthew</p>
            </div>
            <div className="col-span-6 lg:col-span-3 justify-center text-black ">
              <img className="m-2 inline-block" alt="pic" src="/assets/imgs/Team2.png" />
              <p className="font-bold mt-4">Mark</p>
            </div>
            <div className="col-span-6 lg:col-span-3 justify-center text-black ">
              <img className="m-2 inline-block" alt="pic" src="/assets/imgs/Team3.png" />
              <p className="font-bold mt-4">Luke</p>
            </div>
            <div className="col-span-6 lg:col-span-3 justify-center text-black ">
              <img className="m-2 inline-block" alt="pic" src="/assets/imgs/Team4.png" />
              <p className="font-bold mt-4">John</p>
            </div>
          </div>
        </ContentWrapper>
        <div className="mt-4 w-full text-center">
          <AboutImage className="mx-auto inline-block" alt="pic" src="/assets/imgs/Ascension.png" />
        </div>
      </SectionWrapper>

      <Footer >
        © All righs reserved
      </Footer>
    </div>
  );
};

export default TeamSection;
