import './KeyLight.css'
import React, { useContext, useEffect, useState } from 'react'
import { Web3Context, AppContext, DOOR_STATES } from '../App'


function KeyLight() {
  const { web3, walletAddress, balance } = useContext(Web3Context)

  return (
    <div className="KeyLight debug">
      <div className={`keyBackground ${walletAddress && balance > 0 ? 'keyGreen' : 'keyRed'}`}></div>
      <div className="keyContainer debug">
        <img src="image/web/KEY_screen.png" className="debug"/>
      </div>
    </div>
  )
}

export default KeyLight