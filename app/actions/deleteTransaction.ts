'use server';

import { deleteTransaction as deleteTransactionService } from '@/services/transactions';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

/**
 * Server action to delete a transaction.
 *
 * @param transactionId - The ID of the transaction to delete.
 * @returns A promise that resolves to an object with a success message or an error.
 */
async function deleteTransaction(transactionId: string): Promise<{
  message?: string;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  const { message, error } = await deleteTransactionService(
    transactionId,
    userId
  );

  if (error) {
    return { error };
  }

  revalidatePath('/');

  return { message };
}

export default deleteTransaction;