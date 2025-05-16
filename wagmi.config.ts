import { defineConfig } from '@wagmi/cli'
import {foundry} from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis/generated.ts', // Output location
  plugins: [
    foundry({
      project: '../PensionFiContracts', // Relative path to the Foundry repo
      deployments: {
        // Optional: chainId → deployed addresses
        PensionVault: {
          84532: '0xb707e7b84eddf148e0783567affc12866a127cbe',
        },
        MockStrategy: {
          84532: '0xaaba3aa6fa6d936e493b00a2824e79639d80e8a7',
        },
        ERC20Mintable: {
          84532: '0xd34D7E746E274F288AF33c0497FFCcb2Ba08a7fD'
        }
      },
      exclude: [
        '**/*.t.sol/*.json',
        '**/*.s.sol/*.json',
        '**/IERC20.json',            // <- 👈 Add this
        '**/ERC20.json',            // <- 👈 Add this
        '**/interfaces/*.json',      // <- Optionally exclude entire interfaces folder
        '**/lib/**/*.json',          // <- Optionally exclude external libraries
      ],
    }),
  ],
})
