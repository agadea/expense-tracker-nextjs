'use client';
import { Transaction } from '@/types/Transaction';
import { addCommas } from '@/lib/utils';
import { toast } from 'sonner';
import deleteTransaction from '@/app/actions/deleteTransaction';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';

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
   * It calls the `deleteTransaction` server action and shows a toast message.
   *
   * @param {string} transactionId - The ID of the transaction to be deleted.
   */
  const handleDeleteTransaction = async (transactionId: string) => {
    const { message, error } = await deleteTransaction(transactionId);

    if (error) return toast.error(error);

    toast.success(message);
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-2 rounded-md ${
        transaction.amount < 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10'
      }`}
    >
      <div className="flex items-center gap-4">
        <div>
          <p className="font-medium">{transaction.text}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p
          className={`font-semibold ${
            transaction.amount < 0 ? 'text-rose-500' : 'text-emerald-500'
          }`}
        >
          {sign}${addCommas(Math.abs(transaction.amount))}
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                transaction.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteTransaction(transaction.id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.li>
  );
};

export default TransactionItem;
