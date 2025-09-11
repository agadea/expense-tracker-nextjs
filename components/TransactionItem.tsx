'use client';
import { Transaction } from '@/types/Transaction';
import { addCommas } from '@/lib/utils';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransaction';

/**
 * A client component that displays a single transaction item.
 * It shows the transaction text, amount, and a delete button.
 * The delete button calls the `deleteTransaction` server action.
 *
 * @param {{ transaction: Transaction }} props - The props object containing the transaction.
 * @returns {JSX.Element} A list item representing a single transaction.
 */
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  /**
   * Handles the deletion of a transaction.
   * It prompts the user for confirmation before proceeding.
   * Calls the `deleteTransaction` server action and shows a toast message.
   *
   * @param {string} transactionId - The ID of the transaction to be deleted.
   */
  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) return toast.error(error);

    toast.success(message);
  };
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
      >
        X
      </button>
    </li>
  );
};

export default TransactionItem;
