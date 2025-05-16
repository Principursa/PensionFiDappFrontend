import { useChainId, useWriteContract } from 'wagmi'
import { erc20MintableAbi } from '../abis/generated'

const TOKEN_ADDRESSES = {
  84532: '0x8fb835b6a570c23f6bf1ef67413399e62394920c', // Base
  84531: '0xd34D7E746E274F288AF33c0497FFCcb2Ba08a7fD'  // Base Sepolia (using same address as placeholder)
} as const

export function useMintableToken() {
  const chainId = useChainId()
  const contract = useWriteContract()

  const mint = (to: `0x${string}`, amount: bigint) =>
    contract.writeContractAsync({
      abi: erc20MintableAbi,
      address: TOKEN_ADDRESSES[chainId],
      functionName: 'mint',
      args: [to, amount],
    })

  const approve = (spender: `0x${string}`, value: bigint) =>
    contract.writeContractAsync({
      abi: erc20MintableAbi,
      address: TOKEN_ADDRESSES[chainId],
      functionName: 'approve',
      args: [spender, value],
    })

  return { mint, approve }
}
