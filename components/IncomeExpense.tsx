import getIncomeExpense from '@/app/actions/getIncomeExpense';
import { addCommas } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * A server component that displays the user's total income and expense.
 * It fetches the data using the `getIncomeExpense` server action.
 *
 * @returns {Promise<JSX.Element>} A component showing the user's income and expense.
 */
const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">
            +${addCommas(Number(income?.toFixed(2)))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expense</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">
            -${addCommas(Number(expense?.toFixed(2)))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeExpense;
