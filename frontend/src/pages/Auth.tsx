import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              {isRegister ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isRegister
                ? "Sign up to save your searches and favorites"
                : "Sign in to access your saved searches"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors duration-200"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-full hover:opacity-90 transition-opacity duration-200 mt-2"
            >
              {isRegister ? "Register" : "Continue"}
            </button>
            <button
              type="button"
              className="w-full bg-card text-foreground font-medium py-3 rounded-full border border-border hover:bg-muted transition-colors duration-200"
            >
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Link to="/signin" className="text-foreground hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="text-foreground hover:underline">
                  Register
                </Link>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
