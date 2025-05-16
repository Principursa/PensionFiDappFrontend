import { useChainId, useWriteContract } from 'wagmi'
import { erc20MintableAbi } from '../abis/generated'

const TOKEN_ADDRESSES = {
  84532: '0x8fb835b6a570c23f6bf1ef67413399e62394920c', // Base Sepolia
} as const

type SupportedChainId = keyof typeof TOKEN_ADDRESSES

export function useMintableToken() {
  const chainId = useChainId()
  const contract = useWriteContract()

  const mint = (to: `0x${string}`, amount: bigint) =>
    contract.writeContractAsync({
      abi: erc20MintableAbi,
      address: TOKEN_ADDRESSES[chainId as SupportedChainId],
      functionName: 'mint',
      args: [to, amount],
    })

  const approve = (spender: `0x${string}`, value: bigint) =>
    contract.writeContractAsync({
      abi: erc20MintableAbi,
      address: TOKEN_ADDRESSES[chainId as SupportedChainId],
      functionName: 'approve',
      args: [spender, value],
    })

  return { mint, approve }
}
