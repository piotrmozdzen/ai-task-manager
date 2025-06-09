"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const fetchTasks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    setUserId(user.id);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Błąd pobierania zadań:", error);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 text-white w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Twoje zadania</h1>

        {userId && <TaskForm onTaskAdded={fetchTasks} />}

        {loading ? (
          <p className="text-center">Ładowanie...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center">Brak zadań.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-gray-800 p-4 rounded-md">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <span className="text-sm text-gray-400">
                  Status: {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
