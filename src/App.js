import './App.css';
import React, { createContext, useEffect, useState } from 'react';

import Door from "./components/Door";
import Light from "./components/Light";
import Wall from "./components/Wall";        
import MintWall from './components/MintWall';   

import { useWeb3 } from "./useWeb3";
import { WalletConnect } from "./components/classes/WalletConnect";
import InfoWall from './components/InfoWall'
import InfoLight from './components/InfoLight';
import MintLight from './components/MintLight';

export const DOOR_STATES = {
  no_power: 0,
  locked: 1,
  unlocked: 2,
  open: 3,
};

export const AppContext = createContext({
  doorState: undefined,
  setDoorState: undefined,
  floorState: undefined
})

export const Web3Context = createContext({
  web3: undefined,
  loading: undefined,
  walletAddress: null,
  handleConnect: undefined,
  handleDisconnect: undefined,
});
// adds debugger name
Web3Context.displayName = "Web3Context";

function App() {
  const { web3, loading, walletAddress, handleConnect, handleDisconnect } =
    useWeb3();

  // Navigation state
  const [floorState, setFloorState] = useState(-1)

  // Door state
  const [doorState, setDoorState] = useState(DOOR_STATES.no_power)

  // Make sure the screen is scrolled to the top at start
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0)
    return () => {
      
    }
  }, ['👆'])

  const mintButtonClickHandler = () => {
    console.log('mint button clicked!')
  }

  useEffect(() => {
    console.log({ floorState })
    if (floorState === 1) {
      const floor = document.querySelectorAll('.Floor')[0]
      floor.scrollIntoView({
        behavior: 'smooth'
      })
    } else
    if (floorState === 2) {
      const floor2 = document.querySelectorAll('.Floor')[1]
      floor2.scrollIntoView({
        behavior: 'smooth'
      })
    } else
    if (floorState === 3) {
      
    }
    return () => {
      
    }
  })

  return (
    <Web3Context.Provider value={{ web3, loading, walletAddress, handleConnect, handleDisconnect, }}
    >
      <WalletConnect />
      <AppContext.Provider value={{ doorState, setDoorState, floorState, setFloorState }}>

        <div className="App">
          <div className={`${floorState < 0 ? 'isHidden' : ''}`}>
            <div className="FloorTop" />

            <div className="StageContainer">
              <div className="LeftStageThing" />

              <div className="CenterStageThing">
                <Door />
                <Light />
                <Wall />

              </div>

              <div className="RightStageThing" />
            </div>


            <div className="Floor" />
          </div>
          <div className={`${floorState < 1 ? 'isHidden' : ''}`}>

            <div className="StageContainer">
              <div className="CenterStageThing">
                
                <InfoLight />
                <InfoWall />
              </div>

            </div>

            <div className="Floor" />
          </div>
          <div className={`${floorState < 2 ? 'isHidden' : ''}`}>

            <div className="StageContainer">

              <div className="CenterStageThing">
                <MintLight />
                <MintWall onClick={mintButtonClickHandler} />
              </div>

            </div>
            <div className="FloorBottom" />


          </div>
          <div className="Content" style={{display: 'none'}}>
            
          </div>
        </div>
      </AppContext.Provider>
    </Web3Context.Provider>
  );
}

export default App;