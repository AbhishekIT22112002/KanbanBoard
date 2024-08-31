import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/taskSlice";
import toast from "react-hot-toast";

function Task({ task }) {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = () => {
    toast("Item Deleted", {
      icon: "💀",
      duration: 1000,
      style: {
        background: '#f56565',
        color: '#fff',
      },
    });
    dispatch(removeTask(task.id));
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      } transition-opacity duration-200 ease-in-out`}
    >
      <p className="text-lg font-semibold text-gray-900 mb-2 truncate">{task.name}</p>
      <p className="text-sm text-gray-700">{task.description}</p>
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default Task;
