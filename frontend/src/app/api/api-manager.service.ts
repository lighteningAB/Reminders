export const API_BASE = "http://localhost:8080/api";

interface TaskPayload {
  day: string;
  title: string;
}

export async function postTasks(email: string, tasks: TaskPayload[]) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, tasks })
  });

  if (!res.ok) {
    throw new Error(`Failed to add tasks: ${res.status}`);
  }

  return res.json();
}

export async function getTasks(){
    const res = await fetch(`${API_BASE}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    return res.json();
}