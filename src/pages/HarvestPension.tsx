import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { 
  useCheckPlanExistence, 
  usePayOutPlan,
  useAmountPerDistribInterval
} from '../hooks/usePensionVault';

const HarvestPension: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if plan exists
  const planExistence = useCheckPlanExistence(
    address as `0x${string}` || '0x0000000000000000000000000000000000000000',
    address as `0x${string}` || '0x0000000000000000000000000000000000000000'
  );

  // Get amount per distribution interval
  const amountPerInterval = useAmountPerDistribInterval(
    address as `0x${string}` || '0x0000000000000000000000000000000000000000'
  );

  const payOutPlan = usePayOutPlan();

  const isPlanActive = !!planExistence.data;
  const monthlyAmount = amountPerInterval.data ? 
    Number(amountPerInterval.data) : 0;

  const checkingPlan = planExistence.isLoading || amountPerInterval.isLoading;

  const handleHarvest = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      await payOutPlan.writeAsync(address as `0x${string}`);

      setSuccessMessage('Successfully harvested your pension payment!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to harvest pension';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Harvest Your Pension</h1>
        <p className="text-xl mb-8">Please connect your wallet to access your pension.</p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>Connect your wallet to continue.</p>
        </div>
      </div>
    );
  }

  if (checkingPlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Harvest Your Pension</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!isPlanActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Harvest Your Pension</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-medium mb-4">No Active Pension Plan</h2>
          <p className="text-gray-600 mb-8">
            You don't have an active pension plan to harvest from. Create one to start securing your future.
          </p>
          <Link
            to="/retire"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Create Your Pension Plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Harvest Your Pension</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-emerald-100 rounded-full p-6 mb-4">
            <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Your Monthly Payment</h2>
          <p className="text-4xl font-bold text-emerald-600">${monthlyAmount.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-800">Pension Withdrawal</h3>
          <p className="text-gray-700 mb-4">
            By clicking the button below, you will harvest your available pension payment. 
            Note that withdrawals can only be made according to your plan's schedule.
          </p>
          <p className="text-sm text-gray-600">
            Important: This action will transfer funds to your connected wallet.
          </p>
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
          onClick={handleHarvest}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {isLoading ? 'Processing...' : 'Harvest Your Pension'}
        </button>
      </div>
    </div>
  );
};

export default HarvestPension;