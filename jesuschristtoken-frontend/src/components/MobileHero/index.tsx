import styled from 'styled-components';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, usePublicClient } from 'wagmi';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import OMNIABI from '../../constants/OMNIABI';
import { presaleAddress, tokenAddress } from '../../constants';
import { BuyTokenModal } from '../BuyTokenModal';
import { useMediaQuery } from 'usehooks-ts';
import PRESALEABI from '../../constants/PRESALEABI';

export const NormalButton = styled.button`
  background: #ffaf4c;
  border-radius: 62px;
  color: #33221e;
  font-size: 18px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s;
  width: 100%;

  &:hover {
    color: #ffaf4c;
    background: #52412b;
  }
`;

const HeroWrapper = styled.div`
  // position: relative;

  .backImg {
    // filter: opacity(0.1);
  }

  // .container {
  //   position: absoulte;
  //   top: 0;
  //   left: 0;
  // }
`;

const HeroHeader = styled.div`
  //   position: absolute;
  //   transform: translate(-50%, -100%);
  //   left: 50%;
  //   top: 18vw;
  width: 100%;
`;

const HeroBigText = styled.div`
  color: #fff4e6;
  font-family: 'Rammetto One';
  font-style: normal;
  font-weight: 400;
  // font-size: 63px;
  font-size: 11px;
  text-align: center;

  span {
    color: #ffaf4c;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const HeroBigMText = styled.div`
  color: #fff4e6;
  font-family: 'Rammetto One';
  font-style: normal;
  font-weight: 400;
  // font-size: 63px;
  font-size: 30px;
  text-align: center;
  margin-top: 16px;
  span {
    color: #ffaf4c;
  }

  @media (max-width: 768px) {
    font-size: 46px;
  }
`;

const HeroSubText = styled.div`
  font-weight: 300;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff4e6;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Logo = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 25vw;

  img {
    width: 9vw;
  }
`;

const HeroDescription = styled.div`
  //   position: absolute;
  //   transform: translate(-50%, 0%);
  //   left: 50%;
  //   bottom: 17vw;

  maxwidth: 550px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const BuySection = styled.div`
  //   position: absolute;
  //   transform: translate(-50%, 0);
  //   left: 50%;
  //   bottom: 7vw;
  font-size: 16px;

  .typo {
    button {
      text-decoration-line: underline;
      color: #ffaf4c;
    }
  }
  @media (max-width: 768px) {
    font-size: 12px;
    bottom: 0;
  }
`;

export const MobileHeroSection = () => {
  const [balanceToken, setBalanceToken] = useState(0.0);
  const [claimedToken, setClaimedToken] = useState('0.00');

  const publicClient = usePublicClient();
  const isMin = useMediaQuery('(max-width: 765px)');
  const isMax = useMediaQuery('(min-width: 543px)');

  const [isModalShow, setIsModalShow] = useState(false);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const handleConnectButton = async () => {
    await open();
  };

  useEffect(() => {
    if (isConnected && address !== undefined)
      (async () => {
        try {
          const web3 = new Web3(window.ethereum)
          const contractInstance = new web3.eth.Contract(OMNIABI, tokenAddress[publicClient.chain.id as keyof typeof tokenAddress]);
          //@ts-ignore
          const balance = await contractInstance.methods.balanceOf(address).call()
          console.log(balance)
          setBalanceToken(parseInt(web3.utils.fromWei(balance as any, "ether")))

          const presaleContractInstance = new web3.eth.Contract(PRESALEABI as any, presaleAddress);
          //@ts-ignore
          const res = await presaleContractInstance.methods.balanceOfBuyer(address).call();
          //@ts-ignore
          setClaimedToken(web3.utils.fromWei(res, 'ether'));
        } catch (e) {
          console.log(e);
        }
      })();
  }, [address]);

  return (
    <HeroWrapper className="w-full mt-16">
      <div
        className="flex"
        style={{
          height: isMin && isMax ? '540px' : '490px',
        }}
      >
        <img
          alt="pic"
          src="/assets/imgs/hero-mobile.png"
          className="w-full backImg"
          style={{
            objectFit: 'cover',
            // center crop
            objectPosition: 'center',
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <HeroHeader className={`flex flex-col items-center justify-center mb-2 ${isMin && isMax ? 'my-70' : 'my-4'}`}>
          {isMin && isMax ? (
            <HeroBigMText>
              Welcome to <span>Jesus</span> Token
            </HeroBigMText>
          ) : (
            <HeroBigText>
              Welcome to <span>Jesus</span> Token
            </HeroBigText>
          )}
          <HeroSubText>The saviour of crypto</HeroSubText>
          <img
            alt="pic"
            src="/assets/imgs/Logo overlay - Hero.svg"
            className="mt-8"
            style={{
              // width: '112px',
              // height: '112px',
              width: isMin && isMax ? '200px' : '112px',
              height: isMin && isMax ? '200px' : '112px',
            }}
          />
        </HeroHeader>

        <div className="flex justify-center fle-row align-center">
          <HeroDescription className="my-4 w-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</HeroDescription>
        </div>

        <BuySection className="flex flex-col items-center justify-center gap-4 px-4">
          <NormalButton onClick={() => setIsModalShow(true)}>Buy Token</NormalButton>

          {isConnected ? (
            <>
              <div className="typo"> Current holding : {balanceToken} tk</div>
              <div className="typo"> You already bought : {claimedToken} tk</div>
            </>
          ) : (
            <div className="typo">
              <button onClick={handleConnectButton}>Connect wallet</button> to see your current holding
            </div>
          )}
        </BuySection>
        {isModalShow && <BuyTokenModal setIsShowModal={setIsModalShow} />}
      </div>
    </HeroWrapper>
  );
};

export default MobileHeroSection;
