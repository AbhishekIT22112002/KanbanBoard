import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../redux/taskSlice";
import toast from "react-hot-toast";

function Section({ status }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.filteredTasks);

/* This code is using the `useDrop` hook from the `react-dnd` library in a React component. */
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const tasksToMap = tasks.filter((task) => task.status === status);

/**
 * The handleDrop function updates the status of a task and displays a success message using a toast
 * notification.
 */
  function handleDrop(id) {
    dispatch(updateTaskStatus({ id, status }));
    toast.success("Task moved successfully", {
      duration: 1000,
      icon: "🛒",
    });
  }

  let text = "Todo";
  let bg = "bg-gray-700";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-blue-500";
  } else if (status === "peerReview") {
    text = "Peer Review";
    bg = "bg-purple-500";
  } else if (status === "done") {
    text = "Closed";
    bg = "bg-green-500";
  }

  return (
    <div
      ref={drop}
      className={`w-full md:w-72 h-96 rounded-md p-4 shadow-lg overflow-hidden ${isOver ? "bg-gray-200" : "bg-white"} transition-all`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      <div className="mt-4 space-y-4 overflow-y-auto h-72">
        {tasksToMap.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Section;