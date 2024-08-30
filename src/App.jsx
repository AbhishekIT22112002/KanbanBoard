import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Search from "./components/Search";
import CreateButton from "./components/CreateButton";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    const results = tasks.filter(task =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className=" flex items-center p-3 gap-16 pt-32">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CreateButton tasks={tasks} setTasks={setTasks}/>
          
          
        </div>
        <div className=" flex flex-col items-center p-3 gap-16 pt-32">
        <ListTasks tasks={filteredTasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
