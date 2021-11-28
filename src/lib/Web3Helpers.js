export function handleChainChanged(chainId) {
  // 📝 TODO: Make this show a 'Switch Network' button in place of connect
  if (chainIdToName(chainId) !== "Mainnet" && chainIdToName(chainId) !== "Rinkeby") {
    alert(
      "You are on " +
      chainIdToName(chainId) +
      " network. Change network to mainnet or you won't be able to do anything here"
    );
    return false;
  }
  return true;
}
export const chainIdToName = (chainId) => {
  // 0x1	1	Ethereum Main Network (Mainnet)
  // 0x3	3	Ropsten Test Network
  // 0x4	4	Rinkeby Test Network
  // 0x5	5	Goerli Test Network
  // 0x2a	42	Kovan Test Network
  switch (chainId) {
    case 1:
      return "Mainnet";
    case "0x3":
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case "0x5":
      return "Goerli";
    case "0x2a":
      return "Kovan";
    default:
      return false;
  }
};


export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
