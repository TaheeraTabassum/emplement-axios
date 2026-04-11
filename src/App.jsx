import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const fetchTasks = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => res.data);

const addTask = (newTask) =>
  axios.post("https://jsonplaceholder.typicode.com/todos", newTask);

function App() {
  const queryClient = useQueryClient();


  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"], 
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      alert("Task Added (Simulated)!");
    },
  });

  if (isLoading)
    return <div className="p-10 text-xl font-bold">Loading Tasks...</div>;
  if (isError)
    return <div className="p-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-10 max-w-lg mx-auto bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Quantum Mini Manager</h1>

      {/* Add Task Button */}
      <button
        onClick={() =>
          mutation.mutate({ title: "New AI Task", completed: false })
        }
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Adding..." : "Add Sample Task"}
      </button>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white border rounded shadow-sm flex items-center gap-3"
          >
            <input type="checkbox" checked={task.completed} readOnly />
            <span
              className={task.completed ? "line-through text-gray-400" : ""}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
