// Contract addresses for different networks
export const PENSION_VAULT_ADDRESSES = {
  84532: '0x2c6b273a0baa508fb10a0650d104a9de32709406', // Base Sepolia
  8453: '0xb707e7b84eddf148e0783567affc12866a127cbe', // Base Mainnet
} as const

export const TOKEN_ADDRESSES = {
  84532: '0x8fb835b6a570c23f6bf1ef67413399e62394920c', // Base Sepolia
  8453: '0xd34d7e746e274f288af33c0497ffccb2ba08a7fd', // Base Mainnet USDC
} as const

export const STRATEGY_ADDRESSES = {
  84532: '0x0000000000000000000000000000000000000000', // Base Sepolia (default)
  8453: '0xaaba3aa6fa6d936e493b00a2824e79639d80e8a7', // Base Mainnet MockStrategy
} as const

export type SupportedChainId = keyof typeof PENSION_VAULT_ADDRESSES