
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filteredTasks: [],
  searchQuery: ''
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      state.tasks = state.tasks.map(task =>
        task.id === id ? { ...task, status } : task
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});

export const { setTasks, addTask, removeTask, updateTaskStatus, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
