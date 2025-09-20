import { cookies } from "next/headers";
import Link from "next/link";
import { logoutAction } from "@/app/actions/logoutAction";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { LogIn, UserPlus, LogOut, LayoutGrid } from "lucide-react";

const LogoutButton = () => {
  return (
    <form action={logoutAction} method="post">
      <Button type="submit" variant="ghost">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </form>
  );
};

const LoginNavButton = () => {
  return (
    <Button asChild variant="ghost">
      <Link href="/login">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Link>
    </Button>
  );
};

const RegisterNavButton = () => {
  return (
    <Button asChild>
      <Link href="/register">
        <UserPlus className="mr-2 h-4 w-4" />
        Register
      </Link>
    </Button>
  );
};

const Header = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LayoutGrid className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Expense Tracker
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex items-center">
            {token ? (
              <LogoutButton />
            ) : (
              <div className="flex items-center gap-2">
                <LoginNavButton />
                <RegisterNavButton />
              </div>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
