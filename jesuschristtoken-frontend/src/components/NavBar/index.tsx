import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect } from 'wagmi'
import { BorderButton, NormalButton } from "../../theme/components";

const NavBarWrapper = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 117px;
    top: -117px;
    z-index: 10;
    transition: all 0.3s;
    background: #33221e;

    &.active {
        top: 0;
    }

    &.back-trans {
        background: transparent;
    }
`;

const Logo = styled.a`
    img {
        height: 100%;
    }
`;

const MenuGroup = styled.div`
    gap: 4rem;

    .menuItem {
        font-weight: 400;
        font-size: 18px;
        color: #fff4e6;
        transition: all 0.3s;

        &.active,
        &:hover {
            color: #ffaf4c;
        }

        &.active {
            text-decoration: underline;
            text-underline-offset: 10px;
            text-decoration-thickness: 2px;
        }
    }
`;

export const NavBar = () => {
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()
    const [active, setActive] = useState(true);
    const [trans, setTrans] = useState(true);
    const scrollRef = useRef(0);

    const handleScroll = () => {
        if (window.scrollY <= scrollRef.current) setActive(true);
        else setActive(false);

        scrollRef.current = window.scrollY;

        if (scrollRef.current === 0) setTrans(true);
        else setTrans(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleConnectButton = async () => {
        await open()
    }

    const handleDisConnectButton = () => {
        disconnect()
    }

    return (
        <NavBarWrapper
            className={`${active ? "active" : ""} ${trans ? "back-trans" : ""}`}
        >
            <div className="container m-auto h-full">
                <div className="flex justify-between items-center relative">
                    <Logo className="relative" href="/">
                        <img alt="pic" src="/assets/imgs/logo.svg" />
                    </Logo>

                    <div className="flex items-center gap-12">
                        <MenuGroup className="flex items-center gap-12">
                            <a className="menuItem active" href="javascript;">
                                Buy Token
                            </a>
                            <a className="menuItem" href="javascript;">
                                Timeline
                            </a>
                            <a className="menuItem" href="javascript;">
                                About
                            </a>
                            <a className="menuItem" href="javascript;">
                                Tokenomics
                            </a>
                            <a className="menuItem" href="javascript;">
                                Our Team
                            </a>
                        </MenuGroup>

                        {
                            isConnected ? <BorderButton onClick={handleDisConnectButton} className="flex justify-center items-center gap-2">
                                Disconnect Wallet{" "}
                                <span
                                    className="block"
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 10,
                                        background: "#FFAF4C",
                                    }}
                                ></span>
                            </BorderButton> :
                                <NormalButton onClick={handleConnectButton}>Connect Wallet</NormalButton>
                        }
                    </div>
                </div>
            </div>
        </NavBarWrapper>
    );
};
