import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';

/**
 * A header component that displays the application title and user authentication buttons.
 * It uses Clerk's `SignedIn` and `SignedOut` components to conditionally render
 * the user button or the sign-in button.
 * It also calls the `checkUser` function to ensure the user is in the database.
 *
 * @returns {Promise<JSX.Element>} The header component.
 */
const Header = async () => {
  const user = await checkUser();

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <h2>Expense Tracker</h2>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
