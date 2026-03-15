import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAuth = location.pathname === "/signin" || location.pathname === "/register";

  return (
    <nav className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
      <Link to="/" className="text-xl font-semibold tracking-wide text-foreground">
        Podalshe
      </Link>
      {!isAuth && (
        <div className="flex items-center gap-4">
          <Link
            to="/signin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
