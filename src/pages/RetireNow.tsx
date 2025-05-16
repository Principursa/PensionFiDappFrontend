import React, { useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { monthsToSeconds, calculateRequiredDeposit } from '../utils/timeUtils';
import { useDepositStrategy } from '../hooks/usePensionVault';

const RetireNow: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [amountPerMonth, setAmountPerMonth] = useState<number>(1000);
  const [months, setMonths] = useState<number>(12);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const depositStrategy = useDepositStrategy();

  const requiredDeposit = useMemo(() => {
    return calculateRequiredDeposit(amountPerMonth, months);
  }, [amountPerMonth, months]);

  const distributionPhaseLength = useMemo(() => {
    return monthsToSeconds(months);
  }, [months]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAmountPerMonth(value);
    }
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMonths(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Distribution phase interval is set to one month in seconds
      const distributionPhaseInterval = BigInt(30 * 24 * 60 * 60);

      // Strategy ID hardcoded to 0 as specified
      const strategyId = BigInt(0);

      await depositStrategy.writeAsync(
        requiredDeposit,
        address as `0x$string`,
        distributionPhaseLength,
        distributionPhaseInterval,
        address as `0x${string}`,
        strategyId
      );

      setSuccessMessage('Successfully deposited funds for your pension plan!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deposit funds';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Retire Now</h1>
        <p className="text-xl mb-8">Please connect your wallet to set up your pension plan.</p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>Connect your wallet to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Retire Now</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-800">
              How much per month do you want to get paid?
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={amountPerMonth}
                onChange={handleAmountChange}
                min="1"
                className="block w-full rounded-md border-0 py-3 pl-9 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-lg"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-medium mb-2 text-gray-800">
              For how long do you want to get paid?
              <span className="ml-2 text-gray-500">{months} month{months !== 1 ? 's' : ''}</span>
            </label>
            <input
              type="range"
              min="1"
              max="120"
              value={months}
              onChange={handleMonthsChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Deposit Summary</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-gray-700">
                <span>Monthly payment:</span>
                <span className="font-medium">${amountPerMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Duration:</span>
                <span className="font-medium">{months} month{months !== 1 ? 's' : ''}</span>
              </div>
              <div className="border-t border-gray-300 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Required deposit:</span>
                <span>${amountPerMonth * months} (${(Number(requiredDeposit) / (10 ** 18)).toLocaleString()} tokens)</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
              <p>{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Deposit and Set Up Pension'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RetireNow;
