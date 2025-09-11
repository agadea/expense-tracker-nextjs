import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";

/**
 * Fetches all transactions for a given user.
 * This is a service function that contains the core business logic.
 * It is called by server actions, which are responsible for handling the request/response cycle and authentication.
 *
 * @param userId - The ID of the user whose transactions are to be fetched.
 * @returns A promise that resolves to an object containing the transactions or an error message.
 */
export async function getTransactions(userId: string): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { transactions };
  } catch (error) {
    return { error: "Database error" };
  }
}

/**
 * Calculates the total balance for a given user.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an object with the user's balance or an error.
 */
export async function getUserBalance(userId: string): Promise<{
  balance?: number;
  error?: string;
}> {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return { balance };
  } catch (error) {
    return { error: "Database error" };
  }
}

/**
 * Calculates the total income and expense for a given user.
 *
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an object with the total income, expense, or an error.
 */
export async function getIncomeExpense(userId: string): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    const amounts = transactions.map((transaction) => transaction.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Database error" };
  }
}

/**
 * Adds a new transaction for a given user.
 *
 * @param text - The description of the transaction.
 * @param amount - The amount of the transaction.
 * @param userId - The ID of the user who is adding the transaction.
 * @returns A promise that resolves to an object containing the new transaction data or an error message.
 */
export async function addTransaction(
  text: string,
  amount: number,
  userId: string
): Promise<{
  data?: Transaction;
  error?: string;
}> {
  try {
    const transactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added" };
  }
}

/**
 * Deletes a transaction for a given user.
 *
 * @param transactionId - The ID of the transaction to be deleted.
 * @param userId - The ID of the user who owns the transaction.
 * @returns A promise that resolves to an object with a success message or an error message.
 */
export async function deleteTransaction(
  transactionId: string,
  userId: string
): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    // The `where` clause ensures that a user can only delete their own transactions.
    await db.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    return { message: "Transaction deleted" };
  } catch (error) {
    return { error: "Database error" };
  }
}
