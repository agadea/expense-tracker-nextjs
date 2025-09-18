import { cookies } from "next/headers";
import Link from "next/link";
import { logoutAction } from "@/app/actions/logoutAction";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <form action={logoutAction} method="post">
      <Button type="submit">Logout</Button>
    </form>
  );
};

const LoginNavButton = () => {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
};

const RegisterNavButton = () => {
  return (
    <Button asChild>
      <Link href="/register">Register</Link>
    </Button>
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
