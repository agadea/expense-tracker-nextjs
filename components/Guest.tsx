import Link from 'next/link';

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
      <Link href='/login'>Sign In</Link>
    </div>
  );
};

export default Guest;
