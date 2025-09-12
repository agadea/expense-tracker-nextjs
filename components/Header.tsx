import { cookies } from 'next/headers';
import Link from 'next/link';

const LogoutButton = () => {
  return (
    <form action="/api/auth/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  );
};

const Header = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <h2>Expense Tracker</h2>
        <div>
          {token ? (
            <LogoutButton />
          ) : (
            <>
              <Link href='/login'>Login</Link>
              <Link href='/register'>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
