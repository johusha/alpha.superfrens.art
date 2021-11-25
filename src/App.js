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

export const FLOOR_STATES = {

}

export const DOOR_STATES = {
  no_power: 0,
  locked: 1,
  unlocked: 2,
  open: 3,
};

export const DoorContext = createContext({
  doorState: undefined,
  setDoorState: undefined
})

export const Web3Context = React.createContext({
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
  const [floor, setFloor] = useState(0)

  // Door state
  const [doorState, setDoorState] = useState(DOOR_STATES.no_power)

  // Make sure the screen is scrolled to the top at start
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0)
    return () => {
      console.log('scrolled to the top ser')
      setFloor(0)
    }
  }, ['👆'])

  const infoWallClick = () => {
    setFloor(2)
    const floor2 = document.querySelectorAll('.Floor')[1]
    // floor2.parentElement.style.setProperty('display', 'block')
    floor2.scrollIntoView({
        behavior: 'smooth'
      })
  }

  const doorClickHandler = () => {
    console.log('door clicked!')
  }

  const infoButtonClickHandler = () => {
    console.log('info button clicked!')
  }

  const mintButtonClickHandler = () => {
    console.log('mint button clicked!')
  }

  return (
    <Web3Context.Provider value={{ web3, loading, walletAddress, handleConnect, handleDisconnect, }}
    >
      <WalletConnect />
      <DoorContext.Provider value={{ doorState, setDoorState }}>


        <div className="App">
          <section>
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


          </section>
          <div className="Floor" />
          <section>

            <div className="StageContainer">

              <div className="CenterStageThing">
                
                <InfoLight />
                <InfoWall onClick={infoWallClick}/>
              </div>

            </div>

          </section>
          <div className="Floor" />
          <section>

            <div className="StageContainer">

              <div className="CenterStageThing">
                
                <MintWall onClick={mintButtonClickHandler} />
              </div>

            </div>

            <div className="FloorBottom" />

          </section>
          <div className="Content" style={{ display: 'none' }}>
            
          </div>
        </div>
      </DoorContext.Provider>
    </Web3Context.Provider>
  );
}

export default App;