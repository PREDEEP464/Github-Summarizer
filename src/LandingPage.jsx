import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* GitHub Icon with Glow */}
        <div className="mb-8 relative pt-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <svg 
            className="w-32 h-32 text-slate-800 dark:text-slate-200 relative" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.15] text-slate-900 dark:text-white mb-4 text-center">
          GitHub Profile
          <span className="block pb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Summary
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 pt-6 text-center max-w-md">
          Visualize your GitHub statistics with beautiful charts and insights
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-l-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:outline-none focus:ring-0 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus:outline-none focus:ring-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Example Users
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 w-full text-center mb-2">Try examples:</p>
          {['torvalds', 'gaearon', 'tj', 'PREDEEP464'].map(user => (
            <button
              key={user}
              onClick={() => navigate(`/${user}`)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {user}
            </button>
          ))}
        </div> */}

        {/* Footer */}
        {/* <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Powered by <a href="https://profile-summary-for-github.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Profile Summary for GitHub</a></p>
        </div> */}
      </div>
    </div>
  );
}
