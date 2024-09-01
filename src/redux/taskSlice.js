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
   /* The `setTasks` reducer is updating the `tasks` state with the payload
   received in the action. It then updates the local storage with the updated tasks array after
   converting it to a JSON string. Finally, it filters the `tasks` array based on the `searchQuery`
   in the state and updates the `filteredTasks` state with the filtered tasks. */
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  /* The `addTask` reducer is responsible for adding a new task to the `tasks`
  state array. Here's a breakdown of what it does: */
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
   /* The `removeTask` reducer  is responsible for removing a task from the `tasks`
   state array. Here's a breakdown of what it does: */
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      state.filteredTasks = state.tasks.filter(task =>
        task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
   /* The `updateTaskStatus` reducer is responsible for updating the status of a
   specific task in the `tasks` state array. Here's a breakdown of what it does: */
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
  /* The `setSearchQuery` reducer is responsible for updating the `searchQuery`
  state with the payload received in the action. It then filters the `tasks` array based on the
  updated `searchQuery` value and updates the `filteredTasks` state with the filtered tasks. This
  allows for dynamically filtering tasks based on the search query input by the user. */
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
