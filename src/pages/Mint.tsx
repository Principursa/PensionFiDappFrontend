import React, { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useMintableToken } from '../hooks/useMintableToken';
import { PENSION_VAULT_ADDRESSES, SupportedChainId } from '../configs/addresses';

const Mint: React.FC = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { mint, approve } = useMintableToken();
  const [amount, setAmount] = useState<string>('1000');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mintStep, setMintStep] = useState<'mint' | 'approve'>('mint');

  const handleMint = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Convert amount to bigint (assumes 18 decimals)
      const amountInWei = BigInt(Number(amount) * 10 ** 18);

      await mint(address as `0x${string}`, amountInWei);
      
      setSuccessMessage('Successfully minted tokens!');
      setMintStep('approve');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mint tokens';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Get vault address for current chain
      const vaultAddress = PENSION_VAULT_ADDRESSES[chainId as SupportedChainId];
      
      if (!vaultAddress) {
        throw new Error('Pension vault not available on current network');
      }

      // Convert amount to bigint (assumes 18 decimals)
      const amountInWei = BigInt(Number(amount) * 10 ** 18);

      await approve(vaultAddress, amountInWei);
      
      setSuccessMessage('Successfully approved tokens for the pension vault!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve tokens';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mint Tokens</h1>
        <p className="text-xl mb-8 text-gray-700">Please connect your wallet to mint tokens for your pension.</p>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>Connect your wallet to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mint Tokens</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Mint tokens to use with the pension system. You'll need these tokens to fund your pension plan.
          </p>
          <p className="text-gray-700 mb-4">
            After minting, you'll need to approve the tokens for the pension vault contract.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-800">
            Amount to Mint
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="1"
              className="block w-full rounded-md border-0 py-3 px-4 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-lg"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg mb-8 border border-emerald-100">
          <h3 className="text-xl font-semibold mb-3 text-emerald-800">Current Step: {mintStep === 'mint' ? 'Mint Tokens' : 'Approve Tokens'}</h3>
          
          {/* Show amount in wei */}
          <div className="bg-white p-4 rounded-lg mb-5 border border-emerald-100">
            <div className="flex justify-between text-gray-700">
              <span>Amount in tokens:</span>
              <span className="font-medium">{amount}</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-1">
              <span>Amount in wei:</span>
              <span className="font-medium">{amount && `${BigInt(Number(amount) * 10 ** 18)}`}</span>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${mintStep === 'mint' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-500'}`}>
              1
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-800">Mint Tokens</h4>
              <p className="text-sm text-gray-600">Mint tokens to your wallet</p>
            </div>
          </div>
          <div className="w-0.5 h-6 bg-emerald-200 ml-5 mb-2"></div>
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${mintStep === 'approve' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-500'}`}>
              2
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-800">Approve Tokens</h4>
              <p className="text-sm text-gray-600">Allow the pension vault to use your tokens</p>
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

        {mintStep === 'mint' ? (
          <button
            onClick={handleMint}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Mint Tokens'}
          </button>
        ) : (
          <button
            onClick={handleApprove}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium text-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Approve Tokens for Pension Vault'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Mint;
