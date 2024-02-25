import { useTask } from "@/provider/task";

// deleteTask.js
export const Delete = async (id) => {
  const { refreshTasks } = useTask();
  const confirmed = window.confirm("Are you sure?");

  if (confirmed) {
    const res = await fetch(`http://localhost:3000/api/task?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      refreshTasks();
    }
  }
};