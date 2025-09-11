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
    return <p className='error'>{error}</p>;
  }

  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
