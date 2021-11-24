import './App.css';
import React, { useEffect, useState } from 'react';

import Door from "./components/Door";
import Light from "./components/Light";
import Wall from "./components/Wall";
import InfoWall from "./components/InfoWall"
import MintWall from './components/MintWall';

import { useWeb3 } from "./useWeb3";
import { WalletConnect } from "./components/classes/WalletConnect";
import InfoLight from './components/InfoLight';

// set up another state manager for navigation

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

  // let testHasUserClickedInfoButtonState = false

  const [floor, setFloor] = useState(0)

  // Make sure the screen is scrolled to the top at start
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0)
    return () => {
      console.log('scrolled to the top ser')
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

  return (
    <Web3Context.Provider value={{ web3, loading, walletAddress, handleConnect, handleDisconnect, }}
    >
      <WalletConnect />

      <div className="App">
        <section>
          <div className="FloorTop" />

          <div className="StageContainer">
            <div className="LeftStageThing" />

            <div className="CenterStageThing">

              {/* 📝 TODO: clickable svg shape overlay */}
              <Door />
              {/* <Light /> */}
              <Wall />

            </div>

            <div className="RightStageThing" />
          </div>


        </section>
        <div className="Floor" />
        <section>

          <div className="StageContainer" onClick={infoWallClick}>

            <div className="CenterStageThing">
              <InfoLight />
              <InfoWall />
            </div>

          </div>

        </section>
        <div className="Floor" />
        <section>

          <div className="StageContainer">

            <div className="CenterStageThing">
              <MintWall />
            </div>

          </div>

          <div className="FloorBottom" />

        </section>
        <div className="Content" style={{ display: 'none' }}>
          
        </div>
      </div>
    </Web3Context.Provider>
  );
}

export default App;