import type { ContributionData } from './types.js';

/**
 * Fetches GitHub contributions using GraphQL API (requires token)
 * For authenticated requests with private repo access
 */
export async function fetchGitHubContributionsGraphQL(
  username: string,
  token: string
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
    'Authorization': `Bearer ${token}`,
  };

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

/**
 * Fetches GitHub contributions using REST API + web scraping approach
 * Works without authentication for public profiles
 */
export async function fetchGitHubContributionsPublic(
  username: string
): Promise<ContributionData> {
  try {
    // Fetch events from the last year using REST API
    const contributions: ContributionData = [];
    const contributionMap = new Map<string, number>();
    
    // GitHub REST API: Get public events (limited to 300 most recent)
    // We'll fetch multiple pages to get more data
    const pages = 3; // Fetch last ~90 events per page = ~270 events
    
    for (let page = 1; page <= pages; page++) {
      const eventsUrl = `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`;
      
      const response = await fetch(eventsUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'devgraph',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user not found: ${username}`);
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const events = await response.json();
      
      if (events.length === 0) break; // No more events
      
      // Count events by date
      for (const event of events) {
        const date = event.created_at.split('T')[0]; // Extract YYYY-MM-DD
        contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
      }
    }

    // Convert to ContributionData format
    for (const [date, count] of contributionMap.entries()) {
      contributions.push({
        date,
        count,
        platform: 'github',
      });
    }

    return contributions.sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}

/**
 * Fetches GitHub contributions
 * Uses GraphQL if token is provided, otherwise uses public REST API
 */
export async function fetchGitHubContributions(
  username: string,
  token?: string
): Promise<ContributionData> {
  if (token) {
    return fetchGitHubContributionsGraphQL(username, token);
  } else {
    return fetchGitHubContributionsPublic(username);
  }
}
