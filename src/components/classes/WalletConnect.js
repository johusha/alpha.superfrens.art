import './WalletConnect.css'
import '../../animate.css'
import React, { useContext, useEffect, useState } from 'react'
import { Web3Context } from '../../App'

export function WalletConnect() {
  const web3Context = useContext(Web3Context)

  const { web3, loading, handleConnect, handleDisconnect, walletAddress, balance } = web3Context

  const [isLoading, setIsLoading] = useState(true)
  const [numOfKeys, setNumOfKeys] = useState(0)
  useEffect(() => {
    // to aid in a transition from loading to not loading,
    if (loading === false) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    // set timeout to 0 to remove
  }, [loading])

  return (
    <div className={'wallet-connect'}>
      {isLoading === true ? (
        <div className={'loading'} />
      ) : walletAddress ? (
        <div className={'fade-in-out-partial address-wrapper'} onClick={handleDisconnect}>
          Connected Address <div className={'address'}>{walletAddress}</div>
          {balance} keys
        </div>
      ) : (
        <button className={'button'} onClick={handleConnect}>
          Connect
        </button>
      )}
    </div>
  )
}
