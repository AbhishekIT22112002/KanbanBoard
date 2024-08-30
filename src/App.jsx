// src/App.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setSearchQuery } from './redux/taskSlice';
import ListTasks from './components/ListTasks';
import Search from './components/Search';
import CreateButton from './components/CreateButton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="flex items-center p-3 gap-16 pt-32">
          <Search
            searchQuery={searchQuery}
            setSearchQuery={(query) => dispatch(setSearchQuery(query))}
          />
          <CreateButton />
        </div>
        <div className="flex flex-col items-center p-3 gap-16 pt-32">
          <ListTasks />
        </div>
      </DndProvider>
    </>
  );
}

export default App;
