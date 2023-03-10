import React, { useState, createContext } from "react";
import Web3 from "web3";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  // connect wallet
  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      await provider.request({
        method: "eth_requestAccounts",
      });
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask!");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const accBalanceEth = web3.utils.fromWei(
          await web3.eth.getBalance(accounts[0]),
          "ether"
      );

    }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        onLoginHandler,
        currentAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};