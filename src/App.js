import "./App.css";
import React, { useEffect } from "react";

import StageDoor0 from "./components/stages/StageDoor0";
import StageRoom0 from "./components/stages/StageRoom0";
import { useWeb3 } from "./useWeb3";

function App() {
  const [web3, loading, walletAddress, nftPrice, how_many_nfts, saleStarted] =
    useWeb3();

  useEffect(() => {
    console.log(
      loading,
      walletAddress,
      nftPrice,
      how_many_nfts,
      saleStarted
    );
  }, [web3, loading, walletAddress, nftPrice, how_many_nfts, saleStarted]);

  return (
    <>
      <StageDoor0 />
      {/* <StageRoom0/> */}
    </>
  );
}

export default App;
