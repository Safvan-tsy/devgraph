import type { ContributionData } from './types.js';

/**
 * Merges contribution data from multiple platforms
 * Aggregates counts for the same date
 */
export function mergeContributions(...datasets: ContributionData[]): ContributionData {
  const mergedMap = new Map<string, number>();

  for (const dataset of datasets) {
    for (const day of dataset) {
      const current = mergedMap.get(day.date) || 0;
      mergedMap.set(day.date, current + day.count);
    }
  }

  return Array.from(mergedMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Filters contributions by date range
 */
export function filterByDateRange(
  contributions: ContributionData,
  start: Date,
  end: Date
): ContributionData {
  const startStr = start.toISOString().split('T')[0];
  const endStr = end.toISOString().split('T')[0];

  return contributions.filter((day) => day.date >= startStr && day.date <= endStr);
}

/**
 * Fills missing dates with zero contributions
 * Ensures every day in the range has an entry
 */
export function fillMissingDates(
  contributions: ContributionData,
  start: Date,
  end: Date
): ContributionData {
  const filled: ContributionData = [];
  const contributionMap = new Map(contributions.map((c) => [c.date, c.count]));

  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    filled.push({
      date: dateStr,
      count: contributionMap.get(dateStr) || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return filled;
}

/**
 * Gets the date range for the last N days
 */
export function getLastNDays(days: number): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  return { start, end };
}

/**
 * Gets the date range for the last year
 */
export function getLastYear(): { start: Date; end: Date } {
  return getLastNDays(365);
}
