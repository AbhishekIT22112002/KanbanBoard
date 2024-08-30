import toast from "react-hot-toast";
import { useDrag } from "react-dnd";

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  function handleRemove(id) {
    const filterTasks = tasks.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filterTasks));
    setTasks(filterTasks);
    toast("Task removed successfully",{
        duration:1000,
        icon : "💀",
    });
  }
  // console.log(task)

  return (
    <div
      ref={drag}
      className={`relative overflow-hidden p-4 mt-4 bg-white shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <p className="text-lg text-slate-700">{task.name}</p>
      <p className="text-sm text-slate-400">{task.description}</p>

      <button
        className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Task;
