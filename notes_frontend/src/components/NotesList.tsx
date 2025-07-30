"use client";
import React, { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../utils/api";
import { useAuth } from "../context/AuthContext";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  async function loadNotes() {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch {
      setError("Failed to load notes.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user) loadNotes();
  }, [user]);

  function handleSelect(note: Note) {
    setSelected(note);
    setShowEditor(true);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this note?")) return;
    await deleteNote(id);
    if (selected?.id === id) setShowEditor(false);
    setSelected(null);
    loadNotes();
  }

  async function handleSave(note: Note | null, values: { title: string; content: string }) {
    if (!values.title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    try {
      if (note) {
        await updateNote(note.id, values.title, values.content);
      } else {
        await createNote(values.title, values.content);
      }
      setShowEditor(false);
      setSelected(null);
      loadNotes();
    } catch {
      setError("Failed to save note.");
    }
  }

  if (loading) {
    return <div className="w-full p-6 text-gray-400 text-center">Loading notes...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto mt-8">
      {/* Sidebar */}
      <aside className="md:w-1/3 bg-background p-4 border rounded min-h-[400px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Your Notes</h2>
          <button
            className="text-sm px-3 py-1 rounded bg-primary text-white hover:bg-accent"
            onClick={() => { setSelected(null); setShowEditor(true); }}
          >
            + New
          </button>
        </div>
        {notes.length === 0 ? (
          <span className="text-gray-500">No notes yet.</span>
        ) : (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li
                key={note.id}
                className={`cursor-pointer px-2 py-2 rounded transition-colors ${selected?.id === note.id ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                onClick={() => handleSelect(note)}
              >
                <div className="font-medium truncate">{note.title}</div>
                <div className="text-xs text-gray-400">{new Date(note.updated_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </aside>
      {/* Editor/Main */}
      <main className="flex-1 bg-background border rounded p-4 min-h-[400px]">
        {showEditor ? (
          <NoteEditor
            note={selected}
            onSave={handleSave}
            onCancel={() => { setShowEditor(false); setSelected(null); }}
            onDelete={selected ? () => handleDelete(selected.id) : undefined}
            error={error}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 pt-16">
            <span>Select a note or create a new one to get started.</span>
          </div>
        )}
      </main>
    </div>
  );
}

function NoteEditor({
  note,
  onSave,
  onCancel,
  onDelete,
  error,
}: {
  note: Note | null;
  onSave: (note: Note | null, values: { title: string; content: string }) => void;
  onCancel: () => void;
  onDelete?: () => void;
  error?: string;
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  return (
    <form
      className="flex flex-col gap-4 h-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(note, { title, content });
      }}
    >
      <input
        className="border rounded px-2 py-2 font-semibold text-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        maxLength={100}
        required
      />
      <textarea
        className="border rounded px-2 py-2 min-h-[180px] font-mono resize vertical"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        required
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-1 rounded hover:bg-accent"
        >
          {note ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300"
          onClick={onCancel}
        >
          Cancel
        </button>
        {note && onDelete && (
          <button
            type="button"
            className="bg-red-500 text-white px-3 py-1 rounded ml-auto hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
