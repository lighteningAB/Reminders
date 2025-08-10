export const API_BASE = "https://localhost:8080/api";

export async function postTasks(email: string, tasks: string[]){
    const res = await fetch (`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, tasks})
    });

    if (!res.ok) {
        throw new Error(`Failed to add tasks: ${res.status}`);
    }

    return res.json();
}