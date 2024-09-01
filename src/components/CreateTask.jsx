import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

function CreateTask({ closeModal }) {
  const dispatch = useDispatch();
 /* The `const [task, setTask] = useState({ id: "", name: "", description: "", status: "todo" });`
  `CreateTask` component is using the `useState` hook from React to initialize a state
 variable named `task` and a function to update that state named `setTask`. */
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    status: "todo",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (task.name.length <= 0)
      return toast.error("A task must have required field");

    if (task.name.length > 100)
      return toast.error("A task must not have more than 100 characters");

    dispatch(addTask({ ...task, id: uuidv4() }));
    
    toast.success("Task Created", { duration: 1000 });

    setTask({
      id: "",
      name: "",
      description: "",
      status: "todo",
    });
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        name="heading"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        className="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter task name..."
        autoComplete="off"
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter task details..."
        autoComplete="off"
        required
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white rounded-md px-6 py-3 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
}

export default CreateTask;