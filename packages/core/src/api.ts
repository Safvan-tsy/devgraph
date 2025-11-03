import type { DevGraphConfig, ContributionData } from './types.js';
import { fetchGitHubContributions } from './github.js';
import { fetchGitLabContributions } from './gitlab.js';
import { mergeContributions, filterByDateRange, getLastYear } from './utils.js';

/**
 * Fetches and merges contributions from all configured platforms
 * 
 * @param config - Configuration object with platform credentials
 * @returns Promise resolving to merged contribution data
 * 
 * @example
 * ```typescript
 * const contributions = await getContributions({
 *   github: { username: 'octocat', token: 'ghp_...' },
 *   gitlab: { username: 'gitlab-user' }
 * });
 * ```
 */
export async function getContributions(config: DevGraphConfig): Promise<ContributionData> {
  const datasets: ContributionData[] = [];

  // Fetch from each platform
  const promises: Promise<void>[] = [];

  if (config.github) {
    promises.push(
      fetchGitHubContributions(config.github.username, config.github.token)
        .then((data) => {
          datasets.push(data);
        })
        .catch((error) => {
          console.error('Failed to fetch GitHub contributions:', error);
        })
    );
  }

  if (config.gitlab) {
    promises.push(
      fetchGitLabContributions(
        config.gitlab.username,
        config.gitlab.token,
        config.gitlab.baseUrl
      )
        .then((data) => {
          datasets.push(data);
        })
        .catch((error) => {
          console.error('Failed to fetch GitLab contributions:', error);
        })
    );
  }

  // Wait for all fetches to complete
  await Promise.all(promises);

  // Merge all contributions
  let merged = mergeContributions(...datasets);

  // Apply date range filter if specified
  if (config.dateRange) {
    merged = filterByDateRange(merged, config.dateRange.start, config.dateRange.end);
  } else {
    // Default to last year
    const { start, end } = getLastYear();
    merged = filterByDateRange(merged, start, end);
  }

  return merged;
}

/**
 * Simple in-memory cache for contributions
 * Reduces API calls during development
 */
const cache = new Map<string, { data: ContributionData; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

/**
 * Cached version of getContributions
 * Uses a simple in-memory cache with TTL
 */
export async function getCachedContributions(
  config: DevGraphConfig
): Promise<ContributionData> {
  const cacheKey = JSON.stringify(config);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await getContributions(config);
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}
