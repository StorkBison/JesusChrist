import styled from "styled-components";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, usePublicClient } from 'wagmi'
import Web3 from 'web3'
import { NormalButton } from "../../theme/components";
import { useEffect, useState } from "react";
import OMNIABI from "../../constants/OMNIABI";
import { presaleAddress, tokenAddress } from "../../constants";
import { BuyTokenModal } from "../BuyTokenModal";
import PRESALEABI from "../../constants/PRESALEABI";

const HeroWrapper = styled.div`
    position: relative;

    .backImg {
        // filter: opacity(0.1);
    }

    .container {
        position: absoulte;
        top: 0;
        left: 0;
    }
`;

const HeroHeader = styled.div`
    position: absolute;
    transform: translate(-50%, -100%);
    left: 50%;
    top: 18vw;
    width: 100%;
`;

const HeroBigText = styled.div`
    color: #fff4e6;
    font-family: "Rammetto One";
    font-style: normal;
    font-weight: 400;
    font-size: 63px;

    span {
        color: #ffaf4c;
    }

    @media (max-width: 1024px) {
        font-size: 36px;
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
    position: absolute;
    transform: translate(-50%, 0%);
    left: 50%;
    bottom: 17vw;

    width: 550px;
    font-weight: 500;
    font-size: 18px;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const BuySection = styled.div`
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 7vw;
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

export const HeroSection = () => {
    const [balanceToken, setBalanceToken] = useState(0.00)
    const publicClient = usePublicClient();
    const [claimedToken, setClaimedToken] = useState('0.00');

    const [isModalShow, setIsModalShow] = useState(false)
    const { isConnected, address } = useAccount()
    const { open } = useWeb3Modal()
    const handleConnectButton = async () => {
        await open()
    }

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
                    console.log(e)
                }
            })()
    }, [address])

    return (
        <HeroWrapper className="relative w-full">
            <img
                alt="pic"
                src="/assets/imgs/hero_back.png"
                className="w-full backImg"
            />

            <div className="absolute top-0 left-0 w-full h-full">
                <HeroHeader className="flex flex-col justify-center items-center">
                    <HeroBigText>
                        Welcome to <span>Jesus</span> Token
                    </HeroBigText>
                    <HeroSubText>The saviour of crypto</HeroSubText>
                </HeroHeader>

                <Logo>
                    <img alt="pic" src="/assets/imgs/Logo overlay - Hero.svg" />
                </Logo>

                <HeroDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                </HeroDescription>

                <BuySection className="flex flex-col justify-center items-center gap-4">
                    <NormalButton onClick={() => {
                        if (isConnected) {
                            setIsModalShow(true)
                        } else handleConnectButton()
                    }}>{isConnected ? "Buy Token" : "Connect Wallet"}</NormalButton>

                    {
                        isConnected ?
                            <>
                                <div className="typo"> Current holding : {balanceToken} tk</div>
                                <div className="typo"> You already bought : {claimedToken} tk</div>
                            </>
                            :
                            <div className="typo">
                                <button onClick={handleConnectButton}>Connect wallet</button> to see your current holding
                            </div>
                    }
                </BuySection>
                {
                    isModalShow && <BuyTokenModal setIsShowModal={setIsModalShow} />
                }
            </div>
        </HeroWrapper>
    );
};

export default HeroSection;
