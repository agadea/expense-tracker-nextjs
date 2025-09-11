import { SignInButton } from '@clerk/nextjs';

/**
 * A component that is displayed to users who are not logged in.
 * It prompts them to sign in to use the application.
 *
 * @returns {JSX.Element} A welcome message and a sign-in button.
 */
const Guest = () => {
  return (
    <div className='guest'>
      <h1>Welcome</h1>
      <p>Please sign in to manage your transactions</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
