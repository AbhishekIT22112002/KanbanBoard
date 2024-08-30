// src/components/ListTasks.jsx
import Section from "./Section";
import { useSelector } from "react-redux";

function ListTasks() {
  // const filteredTasks = useSelector(state => state.tasks.filteredTasks);
  const tasks = useSelector(state => state.tasks.tasks);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {["todo", "inprogress", "peerReview", "done"].map((status, index) => (
        <Section
          status={status}
          tasks={tasks}
          key={index}
        />
      ))}
    </div>
  );
}

export default ListTasks;
