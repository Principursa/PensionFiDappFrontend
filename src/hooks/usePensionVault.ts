import {useReadContract, useWriteContract} from 'wagmi'
import { pensionVaultAbi } from '../abis/generated'
import {useChainId} from 'wagmi'

const PENSION_VAULT_ADDRESSES = {
  84532: '0xb707e7b84eddf148e0783567affc12866a127cbe'
} as const

export function useDistributionLengthRemaining(beneficiary: `0x${string}`) {
  const chainId = useChainId()

  return useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId],
    functionName: 'getDistributionLengthRemaining',
    args: [beneficiary]
  })
}

export function useAmountPerDistribInterval(beneficiary: `0x${string}`) {
  const chainId = useChainId()

  return useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId],
    functionName: 'getAmountPerDistribInterval',
    args: [beneficiary],
  })
}

export function usePayOutPlan() {
  const chainId = useChainId()
  const contract = useWriteContract()

  const writeAsync = (beneficiary: `0x${string}`) => 
    contract.writeContractAsync({
      abi: pensionVaultAbi,
      address: PENSION_VAULT_ADDRESSES[chainId],
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
    to: `0x$string`,
    distributionPhaseLength: bigint,
    distributionPhaseInterval: bigint,
    beneficiary: `0x${string}`,
    strategyId: bigint
  ) => 
    contract.writeContractAsync({
      abi: pensionVaultAbi,
      address: PENSION_VAULT_ADDRESSES[chainId],
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


export function useCheckPlanExistence(benefactor: `0x${string}`, beneficiary: `0x${string}`) {
  const chainId = useChainId()

  // If beneficiary is zero address, skip the call and return false immediately.
  if (beneficiary === '0x0000000000000000000000000000000000000000') {
    return { data: false, isLoading: false, isError: false }
  }

  return useReadContract({
    abi: pensionVaultAbi,
    address: PENSION_VAULT_ADDRESSES[chainId],
    functionName: 'viewTermInfo',
    args: [benefactor, beneficiary],
    select: (plan: { beneficiary: `0x${string}` }) => plan.beneficiary !== '0x0000000000000000000000000000000000000000',
  })
}
