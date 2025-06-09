import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Dodaj typ dla propsów
type TaskFormProps = {
  onTaskAdded?: () => void;
};

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // jeśli chcesz pokazywać błąd

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = supabase.auth.getUser
      ? (await supabase.auth.getUser()).data.user
      : null;
    if (!user) {
      setError("Nie jesteś zalogowany!");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description,
        status,
        user_id: user.id,
      },
    ]);

    if (error) {
      setError("Błąd dodawania zadania: " + error.message);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
      if (onTaskAdded) onTaskAdded();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-900 rounded-md"
    >
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <textarea
        placeholder="Opis (opcjonalnie)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
      >
        <option value="todo">Do zrobienia</option>
        <option value="in_progress">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold"
      >
        {loading ? "Dodawanie..." : "Dodaj zadanie"}
      </button>
    </form>
  );
}
