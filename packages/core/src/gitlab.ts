import type { ContributionData } from './types.js';

/**
 * Fetches GitLab contributions (events) for a user
 * GitLab doesn't have a contribution graph API, so we approximate using events
 */
export async function fetchGitLabContributions(
  username: string,
  token?: string,
  baseUrl = 'https://gitlab.com'
): Promise<ContributionData> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['PRIVATE-TOKEN'] = token;
  }

  try {
    // Fetch user ID first
    const userResponse = await fetch(`${baseUrl}/api/v4/users?username=${username}`, {
      headers,
    });

    if (!userResponse.ok) {
      throw new Error(`GitLab API error: ${userResponse.status} ${userResponse.statusText}`);
    }

    const users = await userResponse.json();
    if (!users || users.length === 0) {
      throw new Error(`GitLab user not found: ${username}`);
    }

    const userId = users[0].id;

    // Fetch events from multiple pages to get more data
    // GitLab allows up to 100 per page, we'll fetch multiple pages
    const contributionMap = new Map<string, number>();
    const maxPages = 10; // Fetch up to 1000 events
    
    for (let page = 1; page <= maxPages; page++) {
      const eventsResponse = await fetch(
        `${baseUrl}/api/v4/users/${userId}/events?per_page=100&page=${page}`,
        { headers }
      );

      if (!eventsResponse.ok) {
        throw new Error(`GitLab API error: ${eventsResponse.status} ${eventsResponse.statusText}`);
      }

      const events = await eventsResponse.json();
      
      // Stop if no more events
      if (events.length === 0) break;

      // Group events by date
      for (const event of events) {
        const date = event.created_at.split('T')[0]; // Extract YYYY-MM-DD
        contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
      }
      
      // If we got less than 100, we've reached the end
      if (events.length < 100) break;
    }

    // Convert to ContributionData format
    const contributions: ContributionData = Array.from(contributionMap.entries()).map(
      ([date, count]) => ({
        date,
        count,
        platform: 'gitlab',
      })
    );

    return contributions.sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error('Error fetching GitLab contributions:', error);
    throw error;
  }
}
