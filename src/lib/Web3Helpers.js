export function handleChainChanged(chainId) {
  // 📝 TODO: Make this show a 'Switch Network' button in place of connect
  if (chainIdToName(chainId) !== 'Mainnet' && chainIdToName(chainId) !== 'Rinkeby') {
    alert(
      'You are on ' +
        chainIdToName(chainId) +
        " network. Change network to mainnet or you won't be able to do anything here"
    )
    return false
  }
  return true
}
export const chainIdToName = (chainId) => {
  // 0x1	1	Ethereum Main Network (Mainnet)
  // 0x3	3	Ropsten Test Network
  // 0x4	4	Rinkeby Test Network
  // 0x5	5	Goerli Test Network
  // 0x2a	42	Kovan Test Network
  switch (chainId) {
    case 1:
      return 'Mainnet'
    case '0x3':
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case '0x5':
      return 'Goerli'
    case '0x2a':
      return 'Kovan'
    default:
      return false
  }
}

//todo:add mainnet contract addresses!
export const ContractAddressesByChainName = {
  Rinkeby: {
    SwapperContractAddress: '0xFe23303D8f8b72CE118857CB96CBAC394D28Fb59',
    FrenKeysContractAddress: '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb',
  },
  Mainnet: {
    SwapperContractAddress: '0x032Ddbab8571Bc5A007bAEF1762F1241187b1CE7',
    FrenKeysContractAddress: '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb',
  },
}


export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const COMPLETED_SWAP_RESPONSE_EXAMPLE = {
  blockHash: '0xc413be9c570153033968fa42d8449c6583395b0cf68084d3e3556298dedf8247',
  blockNumber: 9722667,
  contractAddress: null,
  cumulativeGasUsed: 703052,
  effectiveGasPrice: '0x9502f90c',
  from: '0x25f86efbfb6f13b79abb3680e2bec6874f466821',
  gasUsed: 245408,
  logsBloom:
    '0x02000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000240000000000000000000000000008000000000000000000040000000000000100000008000000020100000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000080000000000000000000000020000000400000000000000000000000000000000000000002000000010000000000002000000000000000000000000000000008000000001000000000060000010000000000008000000000000000000000000000000000000000010000000',
  status: true,
  to: '0xfe23303d8f8b72ce118857cb96cbac394d28fb59',
  transactionHash: '0x61a340926d3f8113d304a2b94b3b39d63ed200e8486b6b14d4e459882a3cea4c',
  transactionIndex: 7,
  type: '0x2',
  events: {
    0: {
      address: '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb',
      blockHash: '0xc413be9c570153033968fa42d8449c6583395b0cf68084d3e3556298dedf8247',
      blockNumber: 9722667,
      logIndex: 4,
      removed: false,
      transactionHash: '0x61a340926d3f8113d304a2b94b3b39d63ed200e8486b6b14d4e459882a3cea4c',
      transactionIndex: 7,
      id: 'log_a0d044ea',
      returnValues: {},
      signature: null,
      raw: {
        data: '0x',
        topics: [
          '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
          '0x00000000000000000000000025f86efbfb6f13b79abb3680e2bec6874f466821',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000004',
        ],
      },
    },
    1: {
      address: '0xE4fd38670733F927018eA4bDa88459BDeF0A40Cb',
      blockHash: '0xc413be9c570153033968fa42d8449c6583395b0cf68084d3e3556298dedf8247',
      blockNumber: 9722667,
      logIndex: 5,
      removed: false,
      transactionHash: '0x61a340926d3f8113d304a2b94b3b39d63ed200e8486b6b14d4e459882a3cea4c',
      transactionIndex: 7,
      id: 'log_99af0905',
      returnValues: {},
      signature: null,
      raw: {
        data: '0x',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x00000000000000000000000025f86efbfb6f13b79abb3680e2bec6874f466821',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x0000000000000000000000000000000000000000000000000000000000000004',
        ],
      },
    },
    2: {
      address: '0xDCe12819c8A2F50b5aaC0349d28B61C03B4714cc',
      blockHash: '0xc413be9c570153033968fa42d8449c6583395b0cf68084d3e3556298dedf8247',
      blockNumber: 9722667,
      logIndex: 6,
      removed: false,
      transactionHash: '0x61a340926d3f8113d304a2b94b3b39d63ed200e8486b6b14d4e459882a3cea4c',
      transactionIndex: 7,
      id: 'log_d462500f',
      returnValues: {},
      signature: null,
      raw: {
        data: '0x',
        topics: [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x00000000000000000000000025f86efbfb6f13b79abb3680e2bec6874f466821',
          '0x0000000000000000000000000000000000000000000000000000000000000001',
        ],
      },
    },
  },
}
