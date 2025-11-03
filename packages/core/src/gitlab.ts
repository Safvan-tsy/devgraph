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

    // Fetch events (last 100 by default)
    const eventsResponse = await fetch(
      `${baseUrl}/api/v4/users/${userId}/events?per_page=100`,
      { headers }
    );

    if (!eventsResponse.ok) {
      throw new Error(`GitLab API error: ${eventsResponse.status} ${eventsResponse.statusText}`);
    }

    const events = await eventsResponse.json();

    // Group events by date
    const contributionMap = new Map<string, number>();

    for (const event of events) {
      const date = event.created_at.split('T')[0]; // Extract YYYY-MM-DD
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
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
