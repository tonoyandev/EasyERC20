import { mainnet, bsc, polygon, optimism, arbitrum , polygonMumbai } from "wagmi/chains";

export const PEAK_TOKEN_ADDRESS = '0x630d98424eFe0Ea27fB1b3Ab7741907DFFEaAd78'

export const CHAINS =  [
  {
    name: "Ethereum",
    wagmi: mainnet,
    explorer: 'https://etherscan.io/'
  },
  // {
  //   name: "Optimism",
  //   wagmi: optimism,
  //   explorer: 'https://optimistic.etherscan.io/'
  // },
  // {
  //   name: "Arbitrum",
  //   wagmi: arbitrum,
  //   explorer: 'https://arbiscan.io/'
  // },
  {
    name: "BSC",
    wagmi: bsc,
    explorer: 'https://bscscan.com/'
  }
]
