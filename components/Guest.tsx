import Link from 'next/link';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';

/**
 * A component that is displayed to users who are not logged in.
 * It prompts them to sign in to use the application.
 *
 * @returns {JSX.Element} A welcome message and a sign-in button.
 */
const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Please sign in to manage your transactions
      </p>
      <Button asChild>
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Link>
      </Button>
    </div>
  );
};

export default Guest;
