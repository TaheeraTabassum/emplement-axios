// import React from 'react'
// import Movie from './Movie'
// import GetPost from './Componants/Services/GetPost'

// export default function App() {
//   return (
//     <div>
//       <Movie/>
//       <GetPost/>
//     </div>
//   )
// }




// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";


// const fetchTasks = () =>
//   axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
//     .then((res) => res.data);

// const addTask = (newTask) =>
//   axios.post("https://jsonplaceholder.typicode.com/todos", newTask);

// function App() {
//   const queryClient = useQueryClient();


//   const {
//     data: tasks,
        //     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["todos"], 
//     queryFn: fetchTasks,
//   });

//   const mutation = useMutation({
//     mutationFn: addTask,
//     onSuccess: () => {
     
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//       alert("Task Added (Simulat0ed)!");
//     },
//   });

//   if (isLoading)
//     return <div className="p-10 text-xl font-bold">Loading Tasks...</div>;
//   if (isError)
//     return <div className="p-10 text-red-500">Error: {error.message}</div>;

//   return (
//     <div className="p-10 max-w-lg mx-auto bg-gray-50 rounded-xl shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Quantum Mini Manager</h1>

//       {/* Add Task Button */}
//       <button
//         onClick={() =>
//           mutation.mutate({ title: "New AI Task", completed: false })
//         }
//         className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//         disabled={mutation.isPending}
//       >
//         {mutation.isPending ? "Adding..." : "Add Sample Task"}
//       </button>

//       {/* Task List */}
//       <ul className="space-y-3">
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             className="p-3 bg-white border rounded shadow-sm flex items-center gap-3"
//           >
//             <input type="checkbox" checked={task.completed} readOnly />
//             <span
//               className={task.completed ? "line-through text-gray-400" : ""}
//             >
//               {task.title}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
0 
// export default App;


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const fetchComments = (page) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`)
    .then((res) => res.data);

const addComment = (newComment) =>
  axios.post("https://jsonplaceholder.typicode.com/comments", newComment);

function App() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

 
  const { data: comments, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["comments", page], 
    queryFn: () => fetchComments(page),
    placeholderData: (previousData) => previousData, 
  });

  const mutation = useMutation({
    mutationFn: addComment,
    onMutate: async (newComment) => {
     
      await queryClient.cancelQueries({ queryKey: ["comments", page] });
      const previousComments = queryClient.getQueryData(["comments", page]);


      queryClient.setQueryData(["comments", page], (old) => [
        { ...newComment, id: Date.now() }, 
        ...old,
      ]);

      return { previousComments };
    },
    onError: (err, newComment, context) => {
     
      queryClient.setQueryData(["comments", page], context.previousComments);
    },
    onSettled: () => {
      
      queryClient.invalidateQueries({ queryKey: ["comments", page] });
    },
  });

  if (isLoading) return <div className="p-10 font-bold">Loading...</div>;

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-black text-gray-800 mb-6">Quantum Feedback</h1>

      
      <button
        onClick={() => mutation.mutate({ name: "Akash Rahim", body: "This is a lightning fast update!" })}
        className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold active:scale-95 transition"
      >
        Post Instant Comment
      </button>

     
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded">
            <h4 className="font-bold capitalize">{comment.name}</h4>
            <p className="text-sm text-gray-600">{comment.body}</p>
          </div>
        ))}
      </div>

     
      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <button 
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-bold text-indigo-600">Page {page}</span>
        <button 
          onClick={() => setPage((old) => old + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;