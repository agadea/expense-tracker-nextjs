'use server';

import { getUserBalance as getUserBalanceService } from '@/services/transactions';
import { auth } from '@clerk/nextjs/server';

/**
 * Server action to get the balance for the logged-in user.
 *
 * @returns A promise that resolves to an object with the balance or an error.
 */
async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  return await getUserBalanceService(userId);
}

export default getUserBalance;