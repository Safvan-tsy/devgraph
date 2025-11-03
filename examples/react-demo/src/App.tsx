import React, { useState } from 'react';
import { ContributionGraph, type DevGraphConfig, type ThemeName } from 'devgraph-react';

function App() {
  const [githubUsername, setGithubUsername] = useState('torvalds');
  const [gitlabUsername, setGitlabUsername] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [theme, setTheme] = useState<ThemeName>('github');
  const [config, setConfig] = useState<DevGraphConfig>({
    github: { username: 'torvalds' },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newConfig: DevGraphConfig = {};

    if (githubUsername) {
      newConfig.github = {
        username: githubUsername,
        ...(githubToken && { token: githubToken }),
      };
    }

    if (gitlabUsername) {
      newConfig.gitlab = {
        username: gitlabUsername,
      };
    }

    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            DevGraph
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Visualize your developer contributions across GitHub and GitLab in a unified graph
          </p>
        </div>

        {/* Configuration Form */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* GitHub Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  GitHub
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="github-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      id="github-username"
                      type="text"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="octocat"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="github-token" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Token (optional)
                    </label>
                    <input
                      id="github-token"
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* GitLab Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  GitLab
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="gitlab-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      id="gitlab-username"
                      type="text"
                      value={gitlabUsername}
                      onChange={(e) => setGitlabUsername(e.target.value)}
                      placeholder="gitlab-user"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex gap-4">
                {(['github', 'dark', 'light'] as ThemeName[]).map((themeName) => (
                  <label key={themeName} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={themeName}
                      checked={theme === themeName}
                      onChange={(e) => setTheme(e.target.value as ThemeName)}
                      className="mr-2"
                    />
                    <span className="capitalize text-gray-700 dark:text-gray-300">
                      {themeName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Update Graph
            </button>
          </form>
        </div>

        {/* Contribution Graph */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contribution Activity
            </h2>
            <div className="flex justify-center">
              <ContributionGraph
                config={config}
                theme={theme}
                loading={
                  <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Loading contributions...
                    </p>
                  </div>
                }
                error={(err) => (
                  <div className="text-center py-20">
                    <div className="text-red-500 text-lg font-semibold mb-2">
                      Error loading contributions
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {err.message}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Built with <span className="text-red-500">♥</span> using DevGraph
          </p>
          <p className="text-sm">
            Supports GitHub and GitLab • More platforms coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
