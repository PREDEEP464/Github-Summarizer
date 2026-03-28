import axios from 'axios';

// Use Vite proxy in development, direct URL in production
const PROFILE_SUMMARY_API = import.meta.env.DEV 
  ? '/api'  // Vite proxy (no CORS in dev)
  : 'https://profile-summary-for-github.com/api';  // Direct call in production

/**
 * Fetch complete GitHub profile summary from profile-summary-for-github API
 * This returns all data in one call: user info, quarterly commits, language stats, repo stats
 */
export const fetchProfileSummary = async (username) => {
  try {
    const response = await axios.get(`${PROFILE_SUMMARY_API}/user/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(`Failed to fetch profile summary: ${error.message}`);
  }
};

/**
 * Process the API response into a format our components expect
 */
export const processProfileSummary = (data) => {
  return {
    user: {
      id: data.user.id,
      login: data.user.login,
      name: data.user.name,
      type: data.user.type,
      avatar_url: data.user.avatarUrl,
      html_url: data.user.htmlUrl,
      api_url: data.user.url,
      blog: data.user.blog,
      location: data.user.location,
      email: data.user.email,
      company: data.user.company,
      hireable: data.user.hireable,
      bio: null, // Not provided by this API
      public_repos: data.user.publicRepos,
      public_gists: data.user.publicGists,
      followers: data.user.followers,
      following: data.user.following,
      created_at: new Date(data.user.createdAt).toISOString(),
    },
    quarterlyCommits: data.quarterCommitCount || {},
    languageStats: {
      byRepos: data.langRepoCount || {},
      byStars: data.langStarCount || {},
      byCommits: data.langCommitCount || {},
    },
    repoStats: {
      byCommits: Object.entries(data.repoCommitCount || {})
        .map(([name, commits]) => ({ name, commits }))
        .sort((a, b) => b.commits - a.commits),
      byStars: Object.entries(data.repoStarCount || {})
        .map(([name, stars]) => ({ name, stars }))
        .sort((a, b) => b.stars - a.stars),
    },
  };
};

export default { fetchProfileSummary, processProfileSummary };
