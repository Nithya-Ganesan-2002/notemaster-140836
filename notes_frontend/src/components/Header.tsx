"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between gap-2 py-6 px-6 border-b bg-white dark:bg-black">
      <Link href="/" className="font-bold text-xl text-primary">
        Notemaster
      </Link>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.email}
            </span>
            <button
              className="rounded bg-secondary px-3 py-1 text-white text-sm hover:bg-accent focus:outline-none"
              onClick={() => logout()}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
