
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/taskSlice";

function Search() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.tasks.searchQuery);

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search tasks... 🔍"
        className="border border-slate-300 rounded-md p-3 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
      
      />
    </div>
  );
}

export default Search;
