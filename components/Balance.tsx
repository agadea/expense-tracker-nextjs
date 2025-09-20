import getUserBalance from '@/app/actions/getUserBalance';
import { addCommas } from '@/lib/utils';

/**
 * A server component that displays the user's current balance.
 * It fetches the balance using the `getUserBalance` server action.
 *
 * @returns {Promise<JSX.Element>} A component showing the user's balance.
 */
const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-muted-foreground">Your Balance</h3>
      <h1 className="text-4xl font-bold">
        ${addCommas(Number(balance?.toFixed(2) ?? 0))}
      </h1>
    </div>
  );
};

export default Balance;
