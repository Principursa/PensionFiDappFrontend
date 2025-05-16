import { http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: "Capital Frens",
  projectId: 'b17dfb75dcaf111070742d4a6cbf0c5b',
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})