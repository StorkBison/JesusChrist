import styled from "styled-components";

const SectionWrapper = styled.div`
    width: 90%;
`;

const TimeLineBigTitle = styled.div`
    font-family: "Rammetto One";
    font-weight: 400;
    font-size: 42px;
    color: #FFF4E5;
    margin-bottom: 32px;

    span {
        color: #ffaf4c;
    }
`;

const DescriptionDiv = styled.div`
  width: 100%;
  background: rgba(0,0,0,0.13);
  border-radius: 16px;
  p {
    color: #FFAF4C;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 189.89%;
    /* or 34px */

    span {
      color: #FFF4E6;
      font-weight: 400;
    }
  }
`;

const ProgressBarWrapper = styled.div`
  width: 80%;
  height: 16px;
  border-radius; 16px;
  background: rgba(0,0,0,0.13);
  border-radius: 16px;
  position: relative;
  text-align: right;

`;

const ProgressBarFirst = styled.div`
  position: absolute;
  width: 66%;
  background: #FFAF4C;
  box-shadow: 0px 0px 4px rgba(255, 175, 76, 0.6);
  border-radius: 16px;
  height: 16px;
  top: 0px;
  left: 0px;
`;

const ProgressBarSecond = styled.div`
  position: absolute;
  width: 34%;
  background: #FFF4E6;
  box-shadow: 0px 0px 4px rgba(255, 244, 230, 0.65);
  border-radius: 16px;
  height: 16px;
  top: 0px;
  left: 0px;
`;

export const TokenomicsSection = () => {
  return (
    <div className="container m-auto mt-16">
      <SectionWrapper className="m-auto relative">
        <div className="text-center">
          <TimeLineBigTitle>
            Token<span>omics</span>
          </TimeLineBigTitle>
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-7">
              <DescriptionDiv className="px-8 py-4 my-4 text-center md:text-left">
                <p>Token Supply: <span>1000,000,000</span></p>
              </DescriptionDiv>
              <DescriptionDiv className="px-8 py-4 my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do <br />
                eiusmod tempor incididunt ut labore et dolore magna{" "}
                <br />
              </DescriptionDiv>
              <div >
                <div className="md:flex mt-8 place-items-center justify-between">
                  <div className="w-full md:w-2/3 flex place-items-center">
                    <ProgressBarWrapper className="mr-4">
                      <ProgressBarFirst />
                    </ProgressBarWrapper>
                    <p>66 %</p>
                  </div>
                  <p className="text-left md:text-right" style={{ fontWeight: 600 }}> Lorem Ipsum</p>
                </div>
                <div className="md:flex mt-8 place-items-center justify-between">
                  <div className="w-full md:w-2/3 flex place-items-center">
                    <ProgressBarWrapper className="mr-4">
                      <ProgressBarSecond />
                    </ProgressBarWrapper>
                    <p>34 %</p>
                  </div>
                  <p className="text-left md:text-right" style={{ fontWeight: 600 }}> Lorem Ipsum</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 justify-self-center	">
              <img alt="pic" src="/assets/imgs/tokenomics.png" />
            </div>

          </div>

        </div>
      </SectionWrapper>
    </div>
  );
};

export default TokenomicsSection;
