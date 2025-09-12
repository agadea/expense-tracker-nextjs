'use server';

import { addTransaction as addTransactionService } from '@/services/transactions';
import { getUser } from '@/lib/getUser';
import { revalidatePath } from 'next/cache';

/**
 * Server action to add a new transaction.
 * This action handles form data, validation, and authentication.
 * It then calls the addTransaction service to persist the data.
 *
 * @param formData - The form data from the client.
 * @returns A promise that resolves to an object with the new transaction data or an error.
 */
async function addTransaction(formData: FormData): Promise<{
  data?: any;
  error?: string;
}> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  if (!textValue || textValue === '' || !amountValue || amountValue === '') {
    return { error: 'Text or amount is missing' };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const user = await getUser();

  if (!user) {
    return { error: 'User not found' };
  }

  const { data, error } = await addTransactionService(text, amount, user.id);

  if (error) {
    return { error };
  }

  revalidatePath('/');

  return { data };
}

export default addTransaction;