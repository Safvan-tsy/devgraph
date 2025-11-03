// Export types
export type {
  ContributionDay,
  ContributionData,
  GitHubConfig,
  GitLabConfig,
  BitbucketConfig,
  DevGraphConfig,
  ThemeColors,
  ThemeName,
} from './types.js';

// Export main API
export { getContributions, getCachedContributions } from './api.js';

// Export platform-specific fetchers
export { fetchGitHubContributions } from './github.js';
export { fetchGitLabContributions } from './gitlab.js';

// Export utilities
export {
  mergeContributions,
  filterByDateRange,
  fillMissingDates,
  getLastNDays,
  getLastYear,
} from './utils.js';

// Export themes
export { themes, getTheme, getColorLevel } from './themes.js';
