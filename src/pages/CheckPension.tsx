import React from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { 
  useCheckPlanExistence, 
  useDistributionLengthRemaining, 
  useAmountPerDistribInterval 
} from '../hooks/usePensionVault';
import { secondsToMonths } from '../utils/timeUtils';

const CheckPension: React.FC = () => {
  const { address, isConnected } = useAccount();

  // Check if plan exists
  const planExistence = useCheckPlanExistence(
    address as `0x${string}` || '0x0000000000000000000000000000000000000000',
    address as `0x${string}` || '0x0000000000000000000000000000000000000000'
  );

  // Get remaining distribution length
  const distributionLengthRemaining = useDistributionLengthRemaining(
    address as `0x${string}` || '0x0000000000000000000000000000000000000000',
    address as `0x${string}` || '0x0000000000000000000000000000000000000000'
  );

  // Get amount per distribution interval
  const amountPerInterval = useAmountPerDistribInterval(
    address as `0x${string}` || '0x0000000000000000000000000000000000000000',
    address as `0x${string}` || '0x0000000000000000000000000000000000000000'
  );

  const isPlanActive = !!planExistence.data;
  const monthsRemaining = distributionLengthRemaining.data ? 
    Math.ceil(secondsToMonths(distributionLengthRemaining.data)) : 0;
  
  const monthlyAmount = amountPerInterval.data ? 
    Number(amountPerInterval.data) : 0;

  const isLoading = planExistence.isLoading || 
    distributionLengthRemaining.isLoading || 
    amountPerInterval.isLoading;

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Check Your Pension</h1>
        <p className="text-xl mb-8">Please connect your wallet to view your pension details.</p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>Connect your wallet to continue.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Check Your Pension</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!isPlanActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Check Your Pension</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-medium mb-4">You haven't made a deposit yet</h2>
          <p className="text-gray-600 mb-8">
            You don't have an active pension plan. Create one to start securing your future.
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Pension Status</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-md mb-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            You have access to ${monthlyAmount.toLocaleString()} / mo for {monthsRemaining} month{monthsRemaining !== 1 ? 's' : ''}
          </h2>
          <p className="text-emerald-600">
            Your pension plan is active and ready for withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Monthly Payment</h3>
            <p className="text-3xl font-bold text-gray-800">${monthlyAmount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Remaining Duration</h3>
            <p className="text-3xl font-bold text-gray-800">{monthsRemaining} month{monthsRemaining !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/harvest"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md"
          >
            Harvest Your Pension
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckPension;