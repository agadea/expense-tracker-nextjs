import getTransactions from '@/app/actions/getTransactions';
import TransactionItem from './TransactionItem';
import { Transaction } from '@/types/Transaction';

/**
 * A server component that displays the list of transactions.
 * It fetches the transactions using the `getTransactions` server action
 * and then maps over them to render `TransactionItem` components.
 *
 * @returns {Promise<JSX.Element>} A list of transactions or an error message.
 */
const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">History</h3>
      <ul className="space-y-2">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <p className="text-muted-foreground">No transactions yet.</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
