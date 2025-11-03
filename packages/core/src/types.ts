/**
 * Represents a single day's contribution data
 */
export interface ContributionDay {
  date: string; // ISO date string (YYYY-MM-DD)
  count: number; // Number of contributions
  platform?: 'github' | 'gitlab' | 'bitbucket';
}

/**
 * Array of contribution days
 */
export type ContributionData = ContributionDay[];

/**
 * Configuration for fetching GitHub contributions
 */
export interface GitHubConfig {
  username: string;
  token?: string; // Optional personal access token for private repos
}

/**
 * Configuration for fetching GitLab contributions
 */
export interface GitLabConfig {
  username: string;
  token?: string; // Optional personal access token
  baseUrl?: string; // Default: https://gitlab.com
}

/**
 * Configuration for fetching Bitbucket contributions
 */
export interface BitbucketConfig {
  username: string;
  token?: string;
}

/**
 * Main configuration object for fetching contributions
 */
export interface DevGraphConfig {
  github?: GitHubConfig;
  gitlab?: GitLabConfig;
  bitbucket?: BitbucketConfig;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Theme color configuration
 */
export interface ThemeColors {
  background: string;
  empty: string;
  levels: [string, string, string, string, string]; // 5 levels from low to high
}

/**
 * Available theme names
 */
export type ThemeName = 'github' | 'dark' | 'light';
