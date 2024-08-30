function Search({ searchQuery, setSearchQuery }) {
    return (
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks... 🔍"
          className="border border-slate-300 rounded-md p-3 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
    );
  }
  
  export default Search;
  