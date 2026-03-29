export default function UserProfile({ user }) {
  const createdAt = user.created_at ? new Date(user.created_at) : null;
  const isValidDate = createdAt && !Number.isNaN(createdAt.getTime());
  const yearsOnGithub = isValidDate
    ? Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365.25)))
    : null;

  const StatCard = ({ icon, value, label, color }) => (
    <div className="group rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md dark:hover:shadow-md dark:hover:shadow-blue-900/20 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600">
      <div className="flex items-center gap-2">
        <div className={`rounded-lg bg-${color}-100 dark:bg-${color}-900/30 p-1.5 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <p className={`text-lg font-bold text-${color}-600 dark:text-${color}-400`}>{value}</p>
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{label}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/40 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg dark:shadow-2xl dark:shadow-slate-900/50 hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-28 h-28 rounded-full border-3 border-white dark:border-slate-700 shadow-md ring-3 ring-blue-100 dark:ring-blue-900/30 object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                {user.name || user.login}
              </h2>
              <p className="text-base font-mono text-blue-600 dark:text-blue-400 font-semibold mb-2">@{user.login}</p>

              {user.bio && (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">{user.bio}</p>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              icon={<svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>}
              value={user.public_repos}
              label="Repositories"
              color="cyan"
            />
            <StatCard
              icon={<svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v4h8v-4zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>}
              value={user.followers}
              label="Followers"
              color="purple"
            />
            <StatCard
              icon={<svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.756a3.066 3.066 0 01-3.062 3.062H7.041a3.066 3.066 0 01-3.062-3.062V6.517a3.066 3.066 0 012.812-3.062zm7.958 5.183a.75.75 0 00-1.064-1.064L7.83 9.95a.75.75 0 001.064 1.065l5.331-5.332z" clipRule="evenodd" /></svg>}
              value={user.following}
              label="Following"
              color="pink"
            />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {user.location && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V8.414a1 1 0 00-.293-.707l-4.414-4.414A1 1 0 0011.586 3H4z" />
                </svg>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{user.company}</span>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 sm:col-span-2">
                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v1l-8 5-8-5V5z" />
                  <path d="M2 8.236l7.445 4.653a1 1 0 001.11 0L18 8.236V15a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
                </svg>
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{user.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 p-4 space-y-4 shadow-lg h-full flex flex-col">
            {/* Membership Section - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Membership</p>
                {yearsOnGithub !== null ? (
                  <p className="text-xl leading-relaxed mt-1">
                    <span className="font-semibold text-2xl text-blue-600 dark:text-blue-400">{yearsOnGithub}</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm ml-1">years on GitHub</span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic mt-1">Join date unavailable</p>
                )}
              </div>
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent"></div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {user.blog && (
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 2.586a2 2 0 112.828 2.828l-7.5 7.5a2 2 0 01-.878.516l-2.5.714a1 1 0 01-1.237-1.237l.714-2.5a2 2 0 01.516-.878l7.5-7.5z" clipRule="evenodd" />
                  </svg>
                  Portfolio
                </a>
              )}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-xs"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.04c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.763-1.605-2.665-.304-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0112 6.844c1.02.005 2.047.138 3.006.404 2.291-1.552 3.299-1.23 3.299-1.23.651 1.653.24 2.874.116 3.176.769.84 1.235 1.91 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.192.689.801.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
