'use server';

import { deleteTransaction as deleteTransactionService } from '@/services/transactions';
import { getUser } from '@/lib/getUser';
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
  const user = await getUser();

  if (!user) {
    return { error: 'User not found' };
  }

  const { message, error } = await deleteTransactionService(
    transactionId,
    user.id
  );

  if (error) {
    return { error };
  }

  revalidatePath('/');

  return { message };
}

export default deleteTransaction;