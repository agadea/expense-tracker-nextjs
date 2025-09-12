import { cookies } from "next/headers";
import Link from "next/link";

const LogoutButton = () => {
  return (
    <form action="/api/auth/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  );
};

const LoginNavButton = () => {
  return (
    <button type="button">
      <Link href="/login">Login</Link>
    </button>
  );
};

const RegisterNavButton = () => {
  return (
    <button type="button">
      <Link href="/register">Register</Link>
    </button>
  );
};

const Header = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Expense Tracker</h2>
        <div className="">
          {token ? (
            <LogoutButton />
          ) : (
            <div className="s">
              <LoginNavButton />
              <RegisterNavButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
