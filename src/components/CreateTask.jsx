
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

function CreateTask({ closeModal }) {
  const dispatch = useDispatch();
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
    <form onSubmit={handleSubmit} className="flex items-center mb-8">
      <input
        type="text"
        name="heading"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, name: e.target.value })
        }
        className="border border-slate-300 bg-white rounded-md p-3 w-64 text-sm mr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Enter task name..."
        autoComplete="off"
        
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
        className="border border-slate-300 bg-white rounded-md p-3 w-64 text-sm mr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Enter task details..."
        autoComplete="off"
        required
      />

      <button
        type="submit"
        className="bg-cyan-500 text-white rounded-md px-6 py-3 text-sm font-semibold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        Add Task
      </button>
    </form>
  );
}

export default CreateTask;
