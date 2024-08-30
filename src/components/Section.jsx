
import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../redux/taskSlice";
import toast from "react-hot-toast";

function Section({ status }) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.filteredTasks);

  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const tasksToMap = tasks.filter(task => task.status === status);

  function handleDrop(id) {
    dispatch(updateTaskStatus({ id, status }));
    toast.success('Task moved successfully', {
      duration: 1000,
      icon: '🛒',
    });
  }

  let text = "Todo";
  let bg = "bg-slate-500";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-sky-400";
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
      className={`w-64 rounded-md p-4 shadow-md ${isOver ? "bg-slate-200" : bg}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Section;
