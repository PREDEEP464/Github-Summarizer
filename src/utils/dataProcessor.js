/**
 * Calculate language-based statistics from repositories
 */
export const calculateLanguageStats = (repos) => {
  const languageStats = {
    repoCount: {},
    starCount: {},
    forkCount: {},
    commitCount: {},
  };

  repos.forEach((repo) => {
    const language = repo.language || 'Unknown';

    // Count repos
    languageStats.repoCount[language] = (languageStats.repoCount[language] || 0) + 1;

    // Sum stars
    languageStats.starCount[language] = (languageStats.starCount[language] || 0) + repo.stargazers_count;

    // Sum forks
    languageStats.forkCount[language] = (languageStats.forkCount[language] || 0) + repo.forks_count;

    // Sum commits (if available)
    if (repo.commits_count) {
      languageStats.commitCount[language] = (languageStats.commitCount[language] || 0) + repo.commits_count;
    }
  });

  return languageStats;
};

/**
 * Get top N items from a data object
 */
export const getTopItems = (data, limit = 5) => {
  return Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};

/**
 * Format data for chart display
 */
export const formatChartData = (data, colors = null) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const defaultColors = [
    'rgba(67, 142, 233, 0.8)',
    'rgba(155, 89, 182, 0.8)',
    'rgba(52, 152, 219, 0.8)',
    'rgba(46, 204, 113, 0.8)',
    'rgba(231, 76, 60, 0.8)',
    'rgba(241, 196, 15, 0.8)',
    'rgba(26, 188, 156, 0.8)',
    'rgba(52, 73, 94, 0.8)',
  ];

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || defaultColors.slice(0, labels.length),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };
};

/**
 * Calculate quarterly commit activity
 */
export const calculateQuarterlyCommits = (repos) => {
  const quarterlyData = {};

  repos.forEach((repo) => {
    if (repo.updated_at) {
      const date = new Date(repo.updated_at);
      const year = date.getFullYear();
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      const quarterKey = `Q${quarter} ${year}`;

      quarterlyData[quarterKey] = (quarterlyData[quarterKey] || 0) + (repo.commits_count || 0);
    }
  });

  // Sort quarters chronologically
  const sortedQuarters = Object.entries(quarterlyData)
    .sort(([keyA], [keyB]) => {
      const [qA, yearA] = keyA.match(/Q(\d) (\d{4})/).slice(1, 3);
      const [qB, yearB] = keyB.match(/Q(\d) (\d{4})/).slice(1, 3);
      return yearA !== yearB ? yearA - yearB : qA - qB;
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedQuarters;
};

/**
 * Calculate repository statistics
 */
export const calculateRepoStats = (repos, limit = 5) => {
  const reposByCommits = repos
    .map((repo) => ({
      name: repo.name,
      commits: repo.commits_count || 0,
      stars: repo.stargazers_count,
    }))
    .sort((a, b) => b.commits - a.commits)
    .slice(0, limit);

  const reposByStars = repos
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      commits: repo.commits_count || 0,
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);

  return {
    byCommits: reposByCommits,
    byStars: reposByStars,
  };
};

/**
 * Process all user data for dashboard
 */
export const processUserData = (repos) => {
  const languageStats = calculateLanguageStats(repos);
  const topLanguagesByRepos = getTopItems(languageStats.repoCount, 5);
  const topLanguagesByStars = getTopItems(languageStats.starCount, 5);
  const topLanguagesByCommits = getTopItems(languageStats.commitCount, 5);
  const quarterlyCommits = calculateQuarterlyCommits(repos);
  const repoStats = calculateRepoStats(repos, 5);

  return {
    languageStats,
    topLanguagesByRepos,
    topLanguagesByStars,
    topLanguagesByCommits,
    quarterlyCommits,
    repoStats,
  };
};
