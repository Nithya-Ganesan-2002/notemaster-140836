"use client";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import RequireAuth from "../components/RequireAuth";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <RequireAuth>
          <NotesList />
        </RequireAuth>
      </main>
    </div>
  );
}
