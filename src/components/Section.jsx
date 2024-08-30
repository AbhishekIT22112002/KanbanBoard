import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";

function Section({ status, tasks, setTasks, ToDo, Inprogress, PeerReview, Done }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = ToDo;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-sky-400";
    tasksToMap = Inprogress;
  }
  if (status === "peerReview") {
    text = "Peer Review";
    bg = "bg-purple-500";
    tasksToMap = PeerReview;
  }
  if (status === "done") {
    text = "Closed";
    bg = "bg-green-500";
    tasksToMap = Done;
  }

  console.log(tasksToMap)
  function addItemToSection(id) {
    setTasks((prev) => {
      const modifyTasks = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: status };
        }

        return item;
      });
      toast(' Item Dropped', {
        duration: 1000,
        icon: '🛒',
      });
      localStorage.setItem("tasks", JSON.stringify(modifyTasks));
      return modifyTasks;
    });
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-4 shadow-md ${isOver ? "bg-slate-200" : bg}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
}

export default Section;
