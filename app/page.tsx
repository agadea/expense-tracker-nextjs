import { getUser } from '@/lib/getUser';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransactions';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';

const HomePage = async () => {
  const user = await getUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main className="container max-w-2xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
};

export default HomePage;
