'use server';

import { getIncomeExpense as getIncomeExpenseService } from '@/services/transactions';
import { getUser } from '@/lib/getUser';

/**
 * Server action to get the total income and expense for the logged-in user.
 *
 * @returns A promise that resolves to an object with the income, expense, or an error.
 */
async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const user = await getUser();

  if (!user) {
    return { error: 'User not found' };
  }

  return await getIncomeExpenseService(user.id);
}

export default getIncomeExpense;