import { useChainId, useWriteContract } from 'wagmi'
import { erc20MintableAbi } from '../abis/generated'
import { TOKEN_ADDRESSES, SupportedChainId } from '../configs/addresses'

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
