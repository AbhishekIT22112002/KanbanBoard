// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    searchQuery: '',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState.tasks,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        updateTask: (state, action) => {
            const { id, status } = action.payload;
            const task = state.find(task => task.id === id);
            if (task) task.status = status;
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
    },
});

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState.searchQuery,
    reducers: {
        setSearchQuery: (state, action) => action.payload,
    },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export const { setSearchQuery } = searchSlice.actions;

const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        search: searchSlice.reducer,
    },
});

export default store;
