import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import DonutChart from './components/DonutChart';
import BarChart from './components/BarChart';
import QuarterlyCommitChart from './components/CommitChart';
import ShareButtons from './components/ShareButtons';
import ThemeToggle from './components/ThemeToggle';
import { fetchProfileSummary, processProfileSummary } from './services/profileSummaryApi';

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [username]);

  const loadProfile = async (user) => {
    setLoading(true);
    setError(null);
    setUserData(null);
    setProcessedData(null);

    try {
      const summaryData = await fetchProfileSummary(user);
      const processed = processProfileSummary(summaryData);
      
      setUserData(processed.user);
      setProcessedData(processed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };


  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header with back button and theme toggle */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Search Another Profile
          </button>
          <div className="flex items-center gap-3">
            {userData && <ShareButtons username={userData.login} />}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-red-50 to-red-100 dark:from-slate-950 dark:to-slate-900">
          <div className="text-center max-w-xl w-full">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <svg className="w-32 h-32 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800/80 border-2 border-red-200 dark:border-red-900/50 rounded-xl px-6 py-8 shadow-lg">
              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                User Not Found
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The GitHub user <span className="font-mono font-bold text-red-600 dark:text-red-400">"{username}"</span> doesn't exist or might be misspelled.
              </p>
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center gap-2 px-6 py-2 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Try Another Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Loading profile data...</p>
          </div>
        </div>
      )}

      {/* Profile Content */}
      {userData && processedData && (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
          {/* User Profile */}
          <UserProfile user={userData} />

          {/* Quarterly Commits Chart */}
          {processedData.quarterlyCommits && Object.keys(processedData.quarterlyCommits).length > 0 && (
            <QuarterlyCommitChart data={processedData.quarterlyCommits} />
          )}

          {/* Language Distribution */}
          {processedData.languageStats && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Language Distribution</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(processedData.languageStats.byRepos).length > 0 && (
                  <DonutChart
                    title="Repos per Language"
                    data={processedData.languageStats.byRepos}
                  />
                )}
                {Object.keys(processedData.languageStats.byStars).length > 0 && (
                  <DonutChart
                    title="Stars per Language"
                    data={processedData.languageStats.byStars}
                  />
                )}
                {Object.keys(processedData.languageStats.byCommits).length > 0 && (
                  <DonutChart
                    title="Commits per Language"
                    data={processedData.languageStats.byCommits}
                  />
                )}
              </div>
            </div>
          )}

          {/* Top Repositories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {processedData.repoStats.byStars.length > 0 && (
              <BarChart
                title="Stars per Repo"
                data={processedData.repoStats.byStars.reduce((acc, repo) => {
                  acc[repo.name] = repo.stars;
                  return acc;
                }, {})}
                color="rgb(236, 72, 153)"
              />
            )}
            {processedData.repoStats.byCommits.length > 0 && (
              <BarChart
                title="Commits per Repo (Top 10)"
                data={processedData.repoStats.byCommits.slice(0, 10).reduce((acc, repo) => {
                  acc[repo.name] = repo.commits;
                  return acc;
                }, {})}
                color="rgb(168, 85, 247)"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
