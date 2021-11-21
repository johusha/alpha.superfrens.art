import './App.css';
import React from 'react';

import Door from './components/Door';
import Light from './components/Light'
import Wall from './components/Wall'

import { useWeb3 } from "./useWeb3";
import { WalletConnect } from "./components/classes/WalletConnect";

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
              <Light />
              <Wall />

            </div>

            <div className="RightStageThing" />
          </div>

          <div className="FloorBottom" />

        </section>
        <div className="Content">
          The quick brown fox jumps over the lazy dog.
        </div>
      </div>
    </Web3Context.Provider>
  );
}

export default App;