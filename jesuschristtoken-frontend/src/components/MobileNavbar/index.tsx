import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import { BorderButton } from '../../theme/components';
import { Menu2, X } from 'tabler-icons-react';
import { Transition } from '@headlessui/react';

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

const NavBarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  //   height: 117px;
  //   top: -117px;
  //   marginbottom: 117px;
  z-index: 999;

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

export const MobileNavBar = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [active, setActive] = useState(true);
  const [trans, setTrans] = useState(true);
  const scrollRef = useRef(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = () => {
    if (window.scrollY <= scrollRef.current) setActive(true);
    else setActive(false);

    scrollRef.current = window.scrollY;

    if (scrollRef.current === 0) setTrans(true);
    else setTrans(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleConnectButton = async () => {
    await open();
  };

  const handleDisConnectButton = () => {
    disconnect();
  };

  return (
    <NavBarWrapper className={`${active ? 'active' : ''} ${trans ? 'back-trans' : ''}`}>
      <div className="container h-full px-4 m-auto">
        <div className="relative flex items-center justify-between">
          <Logo className="relative" href="/">
            <img
              alt="pic"
              src="/assets/imgs/logo.svg"
              style={{
                width: '135px',
                height: '64px',
              }}
            />
          </Logo>
          {!isExpanded ? (
            <Menu2
              color="#ffffff"
              width={24}
              height={24}
              className="hover:cursor-pointer"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          ) : (
            <X
              color="#ffffff"
              width={24}
              height={24}
              className="hover:cursor-pointer"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          )}
        </div>
      </div>
      <Transition
        show={isExpanded}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="flex flex-col items-center gap-6 px-6 py-6 transition-all duration-300 ease-in-out align-justify-center"
          style={{
            background: '#FFF4E5',
            width: '100vw',
            color: '#33221E',
          }}
        >
          <a className="text-base font-medium" href="javascript;">
            Buy Token
          </a>
          <a className="text-base font-medium" href="javascript;">
            About
          </a>
          <a className="text-base font-medium" href="javascript;">
            Tokenomics
          </a>
          <a className="text-base font-medium" href="javascript;">
            Our Team
          </a>
          {isConnected ? (
            <BorderButton onClick={handleDisConnectButton} className="flex items-center justify-center gap-2">
              Disconnect Wallet{' '}
              <span
                className="block"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: '#FFAF4C',
                  zIndex: 999,
                }}
              ></span>
            </BorderButton>
          ) : (
            <NormalButton onClick={handleConnectButton}>Connect Wallet</NormalButton>
          )}
        </div>
      </Transition>
    </NavBarWrapper>
  );
};
