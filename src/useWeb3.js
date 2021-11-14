import Web3 from "web3";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import { handleChainChanged } from "./lib/Web3Helpers";

export function useWeb3() {
  const [web3, setWeb3] = useState(undefined);
  // loading can be undefined, null, true, false.
  // undefined is default
  // true for when connecting to web3
  // false for when finished connecting to web3
  // null for when an error occurred when connecting to web3
  const [loading, setLoading] = useState(undefined);
  const [signedIn, setSignedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);

  // FOR MINTING
  const [how_many_nfts, set_how_many_nfts] = useState(1);

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0);

  const [saleStarted, setSaleStarted] = useState(false);

  const [nftPrice, setNftPrice] = useState(0);

  useEffect(() => {
    async function connect() {
      if (loading === undefined) {
        try {
          setLoading(true);
          const providerOptions = {
            /* See Provider Options Section */
            // https://github.com/Web3Modal/web3modal
          };
          const web3Modal = new Web3Modal({
            network: "mainnet", // optional
            cacheProvider: true, // optional
            providerOptions, // required
          });

          const provider = await web3Modal.connect();

          const web3 = new Web3(provider);

          if (web3.eth) {
            await handleConnect(web3.eth);

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts) => {
              handleAccountsChanged(web3, accounts);
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
              window.location.reload();
            });

            // Subscribe to provider connection
            provider.on("connect", (info) => {
              console.log(info);
            });

            // Subscribe to provider disconnection
            provider.on("disconnect", (error) => {
              handleDisconnect()
            });
          } else {
            // web3 was not ready, wait for it.
            window.addEventListener(
              "ethereum#initialized",
              () => handleConnect(web3.eth),
              {
                once: true,
              }
            );

            // If the event is not dispatched by the end of the timeout, the user probably doesn't have MetaMask installed.
            setTimeout(handleConnect, 3000); // 3 seconds
          }

          console.log("setting web3", web3);
          setWeb3(web3);
          setLoading(false);
        } catch (error) {
          console.log("error", error);
          setLoading(null);
        }
      }
    }

    connect();
  }, [loading, walletAddress, contract]);

  async function handleConnect(web3) {
    const { eth: ethereum } = web3;
    if (ethereum) {
      // Access the decentralized web!
      let chainId = await ethereum.getChainId();
      if (handleChainChanged(chainId))
        ethereum
          .getAccounts()
          .then((acc) => handleAccountsChanged(ethereum, acc))
          .catch(function (error) {
            alert(error.message);
            console.error(error);
          });
    } else {
      if (loading === null)
        alert("No Ethereum interface injected into browser. Read-only access");
    }
  }

  async function handleAccountsChanged(web3, accounts) {
    if (accounts.length === 0)
      // MetaMask is locked or the user has not connected any accounts
      alert("No Addresses Available in MetaMask");

    if (signedIn === false) setSignedIn(true);

    if (accounts[0] !== walletAddress) {
      let wallet = accounts[0];
      setWalletAddress(wallet);
      await callContractData(web3);
    }
  }

  async function callContractData(web3) {
    return "no contract config available";
    //import ABI and ADDRESS from config
    let ABI,
      ADDRESS = undefined;
    const nftContract = new web3.Contract(ABI, ADDRESS);
    setContract(nftContract);

    const salebool = await nftContract.methods.saleIsActive().call();
    setSaleStarted(salebool);

    const totalSupply = await nftContract.methods.totalSupply().call();
    setTotalSupply(totalSupply);

    const nftPrice = await nftContract.methods.getPrice().call();
    setNftPrice(nftPrice);
  }

  const handleDisconnect = () => {
    setLoading(undefined);
    setSignedIn(false);
    setWalletAddress(null);
    setContract(null);
  };

  return {
    web3,
    loading,
    walletAddress,
    nftPrice,
    how_many_nfts,
    saleStarted,
    totalSupply,
    handleConnect: () => handleConnect(web3),
    handleDisconnect,
  };
}
