"use client";
import Header from "../../components/Header";
import AuthForm from "../../components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center">
        <AuthForm mode="register" />
        <div className="text-center mt-4">
          <a href="/login" className="text-primary hover:underline">
            Already have an account? Login
          </a>
        </div>
      </main>
    </div>
  );
}
