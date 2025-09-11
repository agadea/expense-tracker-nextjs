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
    <>
      <h4>Your Balance</h4>
      <h1>${addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
};

export default Balance;
