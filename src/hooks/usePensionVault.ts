import {useReadContract, useWriteContract} from 'wagmi'
import { pensionVaultAbi } from '../abis/generated'
import {useChainId} from 'wagmi'
import { PENSION_VAULT_ADDRESSES, SupportedChainId } from '../configs/addresses'

export function useDistributionLengthRemaining(
  benefactor: `0x${string}`,
  beneficiary: `0x${string}`
) {
  const chainId = useChainId()

  return useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId as SupportedChainId],
    functionName: 'getDistributionLengthRemaining',
    args: [benefactor, beneficiary],
  })
}

export function useAmountPerDistribInterval(
  benefactor: `0x${string}`,
  beneficiary: `0x${string}`
) {
  const chainId = useChainId()

  return useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId as SupportedChainId],
    functionName: 'getAmountPerDistribInterval',
    args: [benefactor, beneficiary],
  })
}

export function usePayOutPlan() {
  const chainId = useChainId()
  const contract = useWriteContract()

  const writeAsync = (beneficiary: `0x${string}`) => 
    contract.writeContractAsync({
      abi: pensionVaultAbi,
      address: PENSION_VAULT_ADDRESSES[chainId as SupportedChainId],
      functionName: 'payOutPlan',
      args: [beneficiary]
    })

    return {writeAsync}
}

export function useDepositStrategy() {
  const chainId = useChainId()
  const contract = useWriteContract()

  const writeAsync = (
    assets: bigint,
    to: `0x${string}`,
    distributionPhaseLength: bigint,
    distributionPhaseInterval: bigint,
    beneficiary: `0x${string}`,
    strategyId: bigint
  ) => 
    contract.writeContractAsync({
      abi: pensionVaultAbi,
      address: PENSION_VAULT_ADDRESSES[chainId as SupportedChainId],
      functionName: 'depositStrategy',
      args: [
        assets,
        to,
        distributionPhaseLength,
        distributionPhaseInterval,
        beneficiary,
        strategyId,
      ],
    })

    return {writeAsync}
}


export function useCheckPlanExistence(
  benefactor: `0x${string}`,
  beneficiary: `0x${string}`
) {
  const chainId = useChainId()

  // If the beneficiary is zero address, skip the call and return false.
  if (beneficiary === '0x0000000000000000000000000000000000000000') {
    return { data: false, isLoading: false, isError: false }
  }

  const result = useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId as SupportedChainId],
    functionName: 'viewTermInfo',
    args: [benefactor, beneficiary],
  })

  const isValid =
    result.data &&
    typeof result.data === 'object' &&
    'beneficiary' in result.data &&
    result.data.beneficiary !== '0x0000000000000000000000000000000000000000'

  return {
    ...result,
    data: isValid,
  }
}
