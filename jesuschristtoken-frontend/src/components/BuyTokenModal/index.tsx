import { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { NormalButton } from '../../theme/components';
import Web3 from 'web3';
import PRESALEABI from '../../constants/PRESALEABI';
import { USDTContractAddress, oracleAddress, presaleAddress } from '../../constants';
import { BigNumber } from '@ethersproject/bignumber';
import USDTABI from '../../constants/USDT';
import OracleFeedAbi from '../../constants/OracleFeed';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const BackDrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 901;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 3.5rem;
  top: 2.5rem;
  width: 15px;
  cursor: pointer;
`;

const ModalContentWrapper = styled.div`
  position: relative;
  z-index: 902;
  left: 50%;
  top: 50%;
  width: 100%;
  max-width: 40rem;
  min-height: 20rem;
  padding-inline: 2rem;
  padding-block: 3rem;
  background-color: #fffef5;
  border-radius: 2rem;
  box-shadow: #00000059 0 5px 15px;
  transform: translateY(-50%) translate(-50%);
  border-radius: 5rem;
  max-height: calc(100vh - 2rem);
  text-align: center;
`;

const ModalBigTitle = styled.div`
  font-family: 'Rammetto One';
  font-weight: 400;
  font-size: 42px;
  color: #ffaf4c;
  margin-bottom: 32px;

  span {
    color: #33221e;
  }
`;

const AddressWrapper = styled.div`
  color: black;
  font-weight: 600;
  font-size: 18px;
  line-height: 189.89%;

  span {
    font-weight: 500;
  }
`;

const TermCheck = styled.input`
  background: #ffaf4c;
  color: white;
`;

const TermCheckWrapper = styled.div`
  color: black;
  font-weight: 500;
  font-size: 18px;

  a {
    color: #ffaf4c;
    text-decoration-line: underline;
  }
`;

const DisconnectButton = styled.button`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 99.89%;
  text-decoration-line: underline;
  color: #ffaf4c;

  &:hover {
    color: #52412b;
  }
`;

const TokenInput = styled.div`
  width: 100%;
  position: relative;
  margin: auto;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }
  input {
    background: rgba(255, 255, 255, 0.75);
    border-radius: 60px;
    padding: 12px 10px 12px 45px;
    gap: 6px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
  }
  img {
    width: 28px;
    height: 28px;
  }
`;

const TokenSelect = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  margin: auto;
  select::-ms-expand {
    display: none;
  }

  select {
    background: rgba(255, 255, 255, 0.75);
    border-radius: 60px;
    padding: 10px 32px 10px 16px;
    gap: 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

export const BuyTokenModal = ({ setIsShowModal = (_: boolean) => { } }) => {
  const audio = new Audio("/assets/hallelujah.mp3")
  const { isConnected, address } = useAccount();
  const [etherValue, setEtherValue] = useState(0.0);
  const [tokenValue, setTokenValue] = useState(0.0);
  const [claimedToken, setClaimedToken] = useState('0.00');
  const [refferalEarning, setRefferalEarning] = useState('0.00');
  const [selectedCoin, setSelectedCoin] = useState('ETH');
  const [preSaleEnded, setPresaleEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refferal, setRefferal] = useState('');
  const [refferalStatus, setRefferalStatus] = useState('Useful');
  const [etherPrice, setEtherPrice] = useState(0.00);
  const ref = useRef() as RefObject<HTMLDivElement>;
  const handleClose = () => {
    setIsShowModal(false);
  };

  const onChangeInput = async (e: any) => {
    setEtherValue(e.target.value);
    if (selectedCoin === 'ETH') {
      if (parseFloat(e.target.value) > 0) {
        try {
          //@ts-ignore
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(OracleFeedAbi as any, oracleAddress);
          const res = await contractInstance.methods.latestRoundData().call();
          //@ts-ignore
          const ethPrice = parseInt(res.answer) / 10 ** 8;
          setEtherPrice(ethPrice)
          setTokenValue(e.target.value * 2000 * ethPrice);
        } catch (e) {
          console.log(e);
        }
      }
    } else if (selectedCoin === 'USDT') {
      if (parseFloat(e.target.value) > 0) {
        try {
          //@ts-ignore
          setTokenValue(e.target.value * 2000);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const onChangeOutput = async (e: any) => {
    setTokenValue(e.target.value);
    if (selectedCoin === 'ETH') {
      if (parseFloat(e.target.value) > 0) {
        try {
          //@ts-ignore
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(OracleFeedAbi as any, oracleAddress);
          const res = await contractInstance.methods.latestRoundData().call();
          //@ts-ignore
          const ethPrice = parseInt(res.answer) / 10 ** 8;
          setEtherPrice(ethPrice)
          setEtherValue(e.target.value / (2000 * ethPrice));
        } catch (e) {
          console.log(e);
        }
      }
    } else if (selectedCoin === 'USDT') {
      if (parseFloat(e.target.value) > 0) {
        try {
          //@ts-ignore
          setEtherValue(e.target.value / 2000);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const onBuy = async () => {
    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(PRESALEABI as any, presaleAddress);
      //@ts-ignore
      const amountBigNumber = BigNumber.from(parseFloat(tokenValue).toFixed(3) * 1000)
        .mul(BigNumber.from(10).pow(15))
        .toString();
      if (selectedCoin === 'ETH') {
        //@ts-ignore
        if (refferal === '') {
          //@ts-ignore
          await contractInstance.methods.buyTokens().send({
            from: address,
            //@ts-ignore
            value: BigNumber.from(parseFloat(etherValue).toFixed(3) * 1000)
              .mul(BigNumber.from(10).pow(15))
              .toString(),
          });
        } else if (refferalStatus === 'Useful') {
          //@ts-ignore
          await contractInstance.methods.buyTokensWithRefferal(refferal).send({
            from: address,
            //@ts-ignore
            value: BigNumber.from(parseFloat(etherValue).toFixed(3) * 1000)
              .mul(BigNumber.from(10).pow(15))
              .toString(),
          });
        }
      } else if (selectedCoin === 'USDT') {
        //@ts-ignore
        const amount = BigNumber.from(parseFloat(etherValue).toFixed(3) * 1000)
          .mul(BigNumber.from(10).pow(15))
          .toString();
        const USDTContract = new web3.eth.Contract(USDTABI as any, USDTContractAddress);
        //@ts-ignore
        await USDTContract.methods.approve(presaleAddress, amount).send({ from: address });
        if (refferal === '') {
          //@ts-ignore
          await contractInstance.methods.buyTokensWithUSDT(amountBigNumber).send({
            from: address,
          });
        } else if (refferalStatus === 'Useful') {
          //@ts-ignore
          await contractInstance.methods.buyTokensWithUSDTWithRefferal(amountBigNumber, refferal).send({
            from: address,
          });
        }
      }
      audio.play()
      getDepositBalances();
    } catch (e) {
      console.log(e);
      console.log(etherValue);
    }
    setIsLoading(false);
  };

  const onClaim = async () => {
    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(PRESALEABI as any, presaleAddress);
      const refferalCode = address?.slice(address.length - 7, address.length);
      console.log(refferalCode);
      //@ts-ignore
      await contractInstance.methods.claim(refferalCode).send({
        from: address,
      });
      getDepositBalances();
    } catch (e) {
      console.log(e);
      console.log(etherValue);
    }
    setIsLoading(false);
  };

  const handleSelectedCoin = async (e: any) => {
    setSelectedCoin(e.target.value);
    if (e.target.value === 'ETH') {
      if (tokenValue > 0) {
        try {
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(OracleFeedAbi as any, oracleAddress);
          const res = await contractInstance.methods.latestRoundData().call();
          //@ts-ignore
          const ethPrice = parseInt(res.answer) / 10 ** 8;
          setEtherPrice(ethPrice)
          setEtherValue(tokenValue / (2000 * ethPrice));
        } catch (e) {
          console.log(e);
        }
      }
    } else if (e.target.value === 'USDT') {
      if (tokenValue > 0) {
        try {
          //@ts-ignore
          setEtherValue(tokenValue / 2000);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const handleRefferal = (e: any) => {
    setRefferal(e.target.value);
  };

  const getDepositBalances = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(PRESALEABI as any, presaleAddress);

      const resPresaleEnded = await contractInstance.methods.paused().call();
      //@ts-ignore
      setPresaleEnded(resPresaleEnded);
      //@ts-ignore
      const res = await contractInstance.methods.balanceOfBuyer(address).call();
      //@ts-ignore
      setClaimedToken(parseFloat(web3.utils.fromWei(res, 'ether')).toFixed(2));
      //@ts-ignore
      const referals = await contractInstance.methods.refferalUser(address?.slice(address.length - 7, address.length)).call();
      //@ts-ignore
      if (referals.refferer === address) {
        //@ts-ignore
        setRefferalEarning((parseInt(referals.amount) / 10 ** 19).toFixed(2))
        //@ts-ignore
        if (referals.useful === 0) {
          setRefferalStatus('Already Used')
        } else {
          //@ts-ignore
          setRefferalStatus(`${referals.useful} times Remained`)
        }
      }
    } catch (e) {
      console.log(e);
      console.log(etherValue);
    }
  };

  const getRefferalStatus = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(PRESALEABI as any, presaleAddress);
      //@ts-ignore
      const res = await contractInstance.methods.refferalUser(refferal).call();
      //@ts-ignore
      if (res.refferer === '0x0000000000000000000000000000000000000000') setRefferalStatus('Not Valid');
      else {
        //@ts-ignore
        if (res.useful !== 0) {
          //@ts-ignore
          setRefferalStatus(`${res.useful} times Remained`)
        } else setRefferalStatus('Already Used');
      }
    } catch (e) {
      console.log(e);
      console.log(etherValue);
    }
  };

  useEffect(() => {
    getDepositBalances();
  }, [address]);

  useEffect(() => {
    getRefferalStatus();
  }, [refferal]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!ref.current || !ref.current.contains(e.target)) {
        // setIsShowModal(false)
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  });
  return (
    <ModalWrapper>
      <BackDrop />
      <ModalContentWrapper className="flex flex-col items-center justify-center gap-4" ref={ref}>
        <CloseButtonWrapper onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
          </svg>
        </CloseButtonWrapper>
        <ModalBigTitle className="flex flex-row">
          <img alt="pic" className="self-center w-full h-full mr-4" src="/assets/imgs/Logo.png" />
          <p>
            Jesus <br />
            <span> Token</span>
          </p>
        </ModalBigTitle>
        <AddressWrapper>
          Address: <span>{address?.slice(0, address.length - 7)}</span><span className='text-red-500 font-bold'>{address?.slice(address.length - 7, address.length)}</span>
        </AddressWrapper>
        <AddressWrapper>
          You already bought <span>{claimedToken} TK</span>, Referral Earning: {refferalEarning} TK
        </AddressWrapper>
        {!preSaleEnded ? (
          <>
            <TokenInput>
              <div className="flex flex-row items-center justify-evenly ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <img alt="pic" src="/assets/imgs/Logo.png" />
                </div>
                <input
                  type="number"
                  className="block w-full text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Amount of Tokens to Buy"
                  step={1}
                  value={tokenValue}
                  onChange={(e: any) => onChangeOutput(e)}
                />
                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center gap-2 pr-4">
                  <ChevronUp className="cursor-pointer" color="#33221E" height={15} width={15} strokeWidth={3} onClick={() => setTokenValue(tokenValue + 1)} />
                  <ChevronDown strokeWidth={3} className="cursor-pointer" color="#33221E" height={15} width={15} onClick={() => setTokenValue(tokenValue - 1)} />
                </div>
              </div>
            </TokenInput>
            <TokenInput>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img alt="pic" src={selectedCoin === 'ETH' ? '/assets/imgs/Group-45.png' : '/assets/imgs/usdc.png'} />
              </div>
              <input
                type="number"
                className="block w-full text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Amount of Tokens to Buy"
                step={1}
                value={etherValue}
                onChange={(e: any) => onChangeInput(e)}
              />
              <div className="flex-row items-center justify-center gap-1">
                <TokenSelect>
                  <select className="cursor-pointer block w-full text-center text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500" onChange={handleSelectedCoin}>
                    <option selected={selectedCoin === 'ETH'} value="ETH">
                      ETH
                    </option>
                    <option selected={selectedCoin === 'USDT'} value="USDT">
                      USDC
                    </option>
                  </select>
                </TokenSelect>
                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center gap-2 pr-3">
                  <ChevronDown strokeWidth={3} className="cursor-pointer" color="#33221E" height={15} width={15} onClick={() => { }} />
                </div>
              </div>
            </TokenInput>
            <div className="flex justify-center">
              <div className="flex items-center m-2">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  checked={tokenValue === 100000.00}
                  type="radio"
                  name="buyOptions"
                  id="heathen"
                  onClick={() => onChangeOutput({ target: { value: 100000.00 } })}
                  value="heathen" />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                  htmlFor="heathen"
                >Heathen(100K)</label>
              </div>
              <div className="flex items-center m-2">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  checked={tokenValue === 1000000.00}
                  type="radio"
                  name="buyOptions"
                  id="follower"
                  onClick={() => onChangeOutput({ target: { value: 1000000.00 } })}
                  value="follower" />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                  htmlFor="follower"
                >Follower(1M)</label>
              </div>
              <div className="flex items-center m-2">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  checked={tokenValue === 100000000.00}
                  type="radio"
                  name="buyOptions"
                  id="disciple"
                  value="disciple"
                  onClick={() => onChangeOutput({ target: { value: 100000000.00 } })}
                />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                  htmlFor="disciple"
                >Disciple(100M)</label>
              </div>
              <div className="flex items-center m-2">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  checked={tokenValue === 1000000000.00}
                  type="radio"
                  name="buyOptions"
                  id="saint"
                  value="saint"
                  onClick={() => onChangeOutput({ target: { value: 1000000000.00 } })}
                />
                <label
                  className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-black"
                  htmlFor="saint"
                >Saint(1000M)</label>
              </div>
            </div>
            {
              selectedCoin === "USDT" ?
                <AddressWrapper>
                  1 USD = <span>2000 Jesus Tk</span>
                </AddressWrapper>
                :
                <AddressWrapper>
                  1 ETH = <span>{2000 * etherPrice} Jesus Tk</span>
                </AddressWrapper>

            }

            <TokenInput>
              <input
                type="text"
                className="block w-full text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Referral"
                value={refferal}
                onChange={handleRefferal}
              />
            </TokenInput>
            {refferal !== '' && (
              <AddressWrapper>
                Referral Status: <span>{refferalStatus}</span>
              </AddressWrapper>
            )}
            <TermCheckWrapper>
              <TermCheck type="checkbox" /> I acknowledge that I have read, understood, <br /> and agree to the <a>terms and conditions</a>
            </TermCheckWrapper>
            <NormalButton className="px-6 py-2" onClick={onBuy}>
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    ></path>
                  </svg>
                  Buy Token{' '}
                </>
              ) : (
                'Buy Token'
              )}
            </NormalButton>
          </>
        ) : (
          <NormalButton disabled={isLoading} className="px-6 py-2" onClick={onClaim}>
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
                Claim Token{' '}
              </>
            ) : (
              'Claim Token'
            )}
          </NormalButton>
        )}

        <DisconnectButton>Disconnect Wallet</DisconnectButton>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};
