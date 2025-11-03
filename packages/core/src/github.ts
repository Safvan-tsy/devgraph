import type { ContributionData } from './types.js';

/**
 * Fetches GitHub contributions using GraphQL API
 * Requires authentication for accurate data
 */
export async function fetchGitHubContributions(
  username: string,
  token?: string
): Promise<ContributionData> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GitHub GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const contributions: ContributionData = [];

    for (const week of weeks) {
      for (const day of week.contributionDays) {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          platform: 'github',
        });
      }
    }

    return contributions;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}
