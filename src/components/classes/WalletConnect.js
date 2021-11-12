import "./WalletConnect.css";
import "../../animate.css";
import { useEffect, useState } from "react";

export function WalletConnect({
  loading,
  handleConnect,
  handleDisconnect,
  walletAddress,
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // to aid in a transition from loading to not loading,
    if (loading === false)
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    // set timeout to 0 to remove
  }, [loading]);

  return (
    <div className={"wallet-connect"}>
      {isLoading === true ? (
          <div className={"loading"} />
      ) : walletAddress ? (
        <div
          className={"fade-in-out-partial address-wrapper"}
          onClick={handleDisconnect}
        >
          Connected Address <div className={"address"}>{walletAddress}</div>
        </div>
      ) : (
        <button className={"button"} onClick={handleConnect}>
          Connect
        </button>
      )}
    </div>
  );
}
