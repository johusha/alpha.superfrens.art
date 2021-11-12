import "./App.css";
import React, { useEffect } from "react";

import StageDoor0 from "./components/stages/StageDoor0";
import StageRoom0 from "./components/stages/StageRoom0";
import { useWeb3 } from "./useWeb3";
import { WalletConnect } from "./components/classes/WalletConnect";

function App() {
  const { web3, loading, walletAddress, handleConnect, handleDisconnect } =
    useWeb3();

  return (
    <>
      <WalletConnect
        loading={loading}
        handleConnect={() => handleConnect(web3)}
        handleDisconnect={() => handleDisconnect()}
        walletAddress={walletAddress}
      />
      <StageDoor0 />
      {/* <StageRoom0/> */}
    </>
  );
}

export default App;
