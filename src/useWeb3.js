import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { useEffect, useState } from 'react'
import {handleChainChanged, sleep} from './lib/Web3Helpers'

import FrenKeysABI from './components/ABI/FrenKeys.json'
import SwapperABI from './components/ABI/Swapper.json'
export function useWeb3() {
  const [web3, setWeb3] = useState(undefined)
  // loading can be undefined, null, true, false.
  // undefined is default - will trigger a reconnect to web3
  // true for when connecting to web3
  // false for when finished connecting to web3
  // null for when an error occurred when connecting to web3
  const [loading, setLoading] = useState(undefined)
  const [signedIn, setSignedIn] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [frensKeysInstance, setFrensKeysInstance] = useState(null)
  const [swapperInstance, setSwapperInstance] = useState(null)

  // FOR MINTING
  const [how_many_nfts, set_how_many_nfts] = useState(1)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    console.log(frensKeysInstance?.methods)
    console.log(swapperInstance?.methods)
  }, [frensKeysInstance, swapperInstance])

  useEffect(() => {
    async function connect() {
      if (loading === undefined) {
        try {
          setLoading(true)
          const providerOptions = {
            /* See Provider Options Section */
            // https://github.com/Web3Modal/web3modal
          }
          const web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true, // optional
            providerOptions, // required
          })

          const provider = await web3Modal.connect()

          const web3 = new Web3(provider)

          if (web3.eth) {
            await handleConnect(web3.eth)

            // Subscribe to accounts change
            provider.on('accountsChanged', (accounts) => {
              handleAccountsChanged(web3, accounts)
            })

            // Subscribe to chainId change
            provider.on('chainChanged', (chainId) => {
              window.location.reload()
            })

            // Subscribe to provider connection
            provider.on('connect', (info) => {
              console.log(info)
            })

            // Subscribe to provider disconnection
            provider.on('disconnect', (error) => {
              handleDisconnect()
            })
          } else {
            // web3 was not ready, wait for it.
            window.addEventListener('ethereum#initialized', () => handleConnect(web3.eth), {
              once: true,
            })

            // If the event is not dispatched by the end of the timeout, the user probably doesn't have MetaMask installed.
            setTimeout(handleConnect, 3000) // 3 seconds
          }

          console.log('setting web3', web3)
          setWeb3(web3)
          setLoading(false)
        } catch (error) {
          console.log('error', error)
          setLoading(null)
        }
      }
    }

    connect()
  }, [loading, walletAddress, swapperInstance, frensKeysInstance])

  async function swap() {
    const expectedBlockTime = 1000;

    if (!frensKeysInstance || !swapperInstance || !walletAddress || loading === true) return false
    console.log(frensKeysInstance.methods)
    console.log(swapperInstance)

    let swapOwner = swapperInstance.options.address + ""
    console.log('swapOwner', swapOwner)
    // console.log("Submitted transaction with hash: ", transactonHash)
    frensKeysInstance.methods.approve(swapOwner, 4).send({ from: walletAddress }, async function(error, transactonHash) {
      console.log("Submitted transaction with hash: ", transactonHash)
      let transactionReceipt = null
      while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
        transactionReceipt = await web3.eth.getTransactionReceipt(transactonHash);
        await sleep(expectedBlockTime)
      }
      console.log("Got the transaction receipt: ", transactionReceipt)
      let final_balance = await swapperInstance.methods.swap(4).send({from:swapOwner})

      console.log('Ending balance is:', final_balance);
    });

  }

  async function getBalance() {
    console.log('starting fetch balance')
    if (!frensKeysInstance || !swapperInstance || !walletAddress || loading === true) return false
    const balanceResp = await frensKeysInstance.methods.balanceOf(walletAddress).call()

    return balanceResp
  }

  async function handleConnect(web3) {
    const { eth: ethereum } = web3
    if (ethereum) {
      // Access the decentralized web!
      let chainId = await ethereum.getChainId()
      if (handleChainChanged(chainId))
        ethereum
          .getAccounts()
          .then((acc) => handleAccountsChanged(ethereum, acc))
          .catch(function (error) {
            alert(error.message)
            console.error(error)
          })
    } else {
      if (loading === null) alert('No Ethereum interface injected into browser. Read-only access')
    }
  }

  async function handleAccountsChanged(web3, accounts) {
    if (accounts.length === 0)
      // MetaMask is locked or the user has not connected any accounts
      alert('No Addresses Available in MetaMask')

    if (signedIn === false) setSignedIn(true)

    if (accounts[0] !== walletAddress) {
      let wallet = accounts[0]
      setWalletAddress(wallet)
      await callContractData(web3, wallet)
    }
  }

  async function callContractData(web3, wallet) {
    // Load Key Contract ABI
    const FrenKeysContract = new web3.Contract(FrenKeysABI, '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb')

    // Load Swapper Contract ABI
    const SwapperContract = new web3.Contract(SwapperABI, '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb')

    setFrensKeysInstance(FrenKeysContract)
    setSwapperInstance(SwapperContract)

    const totalSupply = await FrenKeysContract.methods.totalSupply().call()
    setTotalSupply(totalSupply)

    const totalMinted = await FrenKeysContract.methods.totalMinted().call()

    setTotalMinted(totalMinted)

    const balanceResp = await FrenKeysContract.methods.balanceOf(wallet).call()

    setBalance(balanceResp)

    const maxSupply = await FrenKeysContract.methods.maxSupply().call()

    const owner = await FrenKeysContract.methods.owner().call()
  }

  const handleDisconnect = () => {
    setLoading(false)
    setSignedIn(false)
    setWalletAddress(null)
    setSwapperInstance(null)
  }

  return {
    web3,
    loading,
    walletAddress,
    how_many_nfts,
    totalSupply,
    totalMinted,
    swap,
    getBalance,
    balance,
    handleConnect: () => handleConnect(web3),
    handleDisconnect,
  }
}
