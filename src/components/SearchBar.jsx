import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a GitHub username');
      return;
    }
    setError('');
    onSearch(input.trim());
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  return (
    <div className="relative w-full bg-slate-900 py-8 border-b border-slate-800">
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            GitHub Profile <span className="text-blue-500">Summary</span>
          </h1>
          <p className="text-sm text-slate-400">Visualize your GitHub statistics and contributions</p>
        </div>

        {/* Compact Search form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg border border-slate-700 transition-colors">
            <svg className="w-5 h-5 text-slate-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Enter GitHub username..."
              disabled={loading}
              className="flex-1 px-3 py-3 bg-transparent text-white placeholder-slate-500 outline-none focus:outline-none focus:ring-0"
            />

            <button
              type="submit"
              disabled={loading}
              className="m-1 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors outline-none focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Minimal Error message */}
        {error && (
          <div className="mt-3 max-w-2xl mx-auto p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
