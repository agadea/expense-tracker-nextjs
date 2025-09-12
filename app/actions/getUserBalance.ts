'use server';

import { getUserBalance as getUserBalanceService } from '@/services/transactions';
import { getUser } from '@/lib/getUser';

/**
 * Server action to get the balance for the logged-in user.
 *
 * @returns A promise that resolves to an object with the balance or an error.
 */
async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const user = await getUser();

  if (!user) {
    return { error: 'User not found' };
  }

  return await getUserBalanceService(user.id);
}

export default getUserBalance;