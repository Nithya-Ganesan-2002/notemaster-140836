"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push("/");
    } catch {
      setError("Invalid credentials or server error.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto flex flex-col gap-4 p-7 border rounded bg-white dark:bg-black mt-10"
      autoComplete="on"
    >
      <h1 className="text-2xl font-bold mb-2 text-center">
        {mode === "login" ? "Sign In" : "Register"}
      </h1>
      <input
        autoFocus
        type="email"
        className="border rounded px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
      />
      <input
        type="password"
        className="border rounded px-3 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        minLength={6}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button
        className="bg-primary text-white py-2 rounded font-semibold hover:bg-accent mt-2"
        type="submit"
      >
        {mode === "login" ? "Log in" : "Register"}
      </button>
    </form>
  );
}
