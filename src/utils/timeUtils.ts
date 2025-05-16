/**
 * Time utility functions for pension calculations
 */

// Constants
export const SECONDS_IN_DAY = 24 * 60 * 60;
export const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY;

/**
 * Calculate the required deposit amount based on monthly distribution and duration
 * @param amountPerMonth Amount to be distributed each month
 * @param months Total duration in months
 * @returns Required deposit amount in wei (10^18 units)
 */
export function calculateRequiredDeposit(
  amountPerMonth: number | bigint,
  months: number
): bigint {
  // Convert to BigInt and handle decimal numbers by flooring
  const amountPerMonthBigInt = typeof amountPerMonth === 'number' 
    ? BigInt(Math.floor(amountPerMonth)) 
    : amountPerMonth;
  
  // Convert to wei (10^18 units) and multiply by months
  const amountPerMonthInWei = amountPerMonthBigInt * BigInt(10 ** 18);
  
  return amountPerMonthInWei * BigInt(months);
}

/**
 * Convert months to seconds (Unix timestamp duration)
 * @param months Number of months
 * @returns Equivalent duration in seconds
 */
export function monthsToSeconds(months: number): bigint {
  return BigInt(Math.floor(months * SECONDS_IN_MONTH));
}

/**
 * Convert seconds to months (approximate)
 * @param seconds Duration in seconds
 * @returns Equivalent duration in months (approximate)
 */
export function secondsToMonths(seconds: bigint | number): number {
  const secondsNumber = typeof seconds === 'bigint' ? Number(seconds) : seconds;
  return secondsNumber / SECONDS_IN_MONTH;
}

/**
 * Format a BigInt to a human-readable currency string
 * @param amount BigInt amount (assumed to be in smallest unit, e.g., wei)
 * @param decimals Number of decimals for the token (default 18 for most ERC20s)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(10) ** BigInt(decimals);
  const wholePart = amount / divisor;
  const fractionalPart = amount % divisor;
  
  // Convert to string with 2 decimal places
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const displayFractional = fractionalStr.substring(0, 2).padEnd(2, '0');
  
  return `${wholePart}.${displayFractional}`;
}