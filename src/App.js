import "./App.css";
import React from "react";

import StageDoor0 from "./components/stages/StageDoor0";
import StageRoom0 from "./components/stages/StageRoom0";
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
    <Web3Context.Provider
      value={{ web3, loading, walletAddress, handleConnect, handleDisconnect }}
    >
      <WalletConnect />
      <StageDoor0 />
      {/* <StageRoom0/> */}
    </Web3Context.Provider>
  );
}

export default App;
