'use server';

import { getTransactions as getTransactionsService } from '@/services/transactions';
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '@/types/Transaction';

/**
 * Server action to get transactions for the logged-in user.
 * This is a thin wrapper around the getTransactions service function.
 * Its primary responsibility is to handle authentication and then call the service.
 * This pattern separates the Next.js-specific code from the core business logic.
 *
 * @returns A promise that resolves to an object containing the transactions or an error message.
 */
async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  return await getTransactionsService(userId);
}

export default getTransactions;
