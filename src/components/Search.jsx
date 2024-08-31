import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/taskSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search..."
        className="border border-slate-300 rounded-full p-2 w-72 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-start"
      />
    </div>
  );
};

export default Search;
