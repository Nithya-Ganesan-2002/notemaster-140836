"use client";
import Header from "../../components/Header";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center">
        <AuthForm mode="login" />
        <div className="text-center mt-4">
          <a href="/register" className="text-primary hover:underline">
            Don&apos;t have an account? Register
          </a>
        </div>
      </main>
    </div>
  );
}
