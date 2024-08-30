import { useEffect, useState } from "react";
import Section from "./Section";

function ListTasks({ tasks, setTasks }) {
  const [ToDo, setToDo] = useState([]);
  const [Inprogress, setInprogress] = useState([]);
  const [PeerReview, setPeerReview] = useState([]);
  const [Done, setDone] = useState([]);

 /* The `useEffect` hook in the provided code snippet is responsible for updating the state variables
 `ToDo`, `Inprogress`, `PeerReview`, and `Done` based on the changes in the `tasks` prop. */

  useEffect(() => {
    const filterToDos = tasks.filter((task) => task.status === "todo");
    const filterInprogress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterPeerReview = tasks.filter(
      (task) => task.status === "peerReview"
    );

    const filterDone = tasks.filter((task) => task.status === "done");

    setToDo(filterToDos);
    setInprogress(filterInprogress);
    setPeerReview(filterPeerReview);
    setDone(filterDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "peerReview", "done"];

  return (
    <div className="flex flex-wrap  items-center justify-center gap-8">
      {statuses.map((status, index) => (
          <Section
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            ToDo={ToDo}
            Inprogress={Inprogress}
            PeerReview={PeerReview}
            Done={Done}
            key={index}
          />
    
      ))}
    </div>
  );
}

export default ListTasks;
