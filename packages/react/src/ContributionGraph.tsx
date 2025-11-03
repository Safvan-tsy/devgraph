import React, { useEffect, useState } from 'react';
import {
  getContributions,
  type ContributionData,
  type DevGraphConfig,
  type ThemeName,
  getTheme,
  getColorLevel,
  fillMissingDates,
  getLastYear,
} from '@devgraph/core';
import clsx from 'clsx';

export interface ContributionGraphProps {
  /**
   * Configuration for fetching contributions
   */
  config: DevGraphConfig;

  /**
   * Theme to use for the graph
   * @default 'github'
   */
  theme?: ThemeName;

  /**
   * Size of each contribution square in pixels
   * @default 12
   */
  squareSize?: number;

  /**
   * Gap between squares in pixels
   * @default 3
   */
  gap?: number;

  /**
   * Whether to show month labels
   * @default true
   */
  showMonthLabels?: boolean;

  /**
   * Whether to show weekday labels
   * @default true
   */
  showWeekdayLabels?: boolean;

  /**
   * Loading component
   */
  loading?: React.ReactNode;

  /**
   * Error component
   */
  error?: (error: Error) => React.ReactNode;

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Contribution graph component that visualizes developer activity
 */
export function ContributionGraph({
  config,
  theme = 'github',
  squareSize = 12,
  gap = 3,
  showMonthLabels = true,
  showWeekdayLabels = true,
  loading,
  error: errorComponent,
  className,
}: ContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getContributions(config);
        if (!cancelled) {
          setContributions(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch contributions'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [config]);

  if (isLoading) {
    return loading || <div className="text-gray-500">Loading contributions...</div>;
  }

  if (error) {
    return (
      errorComponent?.(error) || (
        <div className="text-red-500">Error: {error.message}</div>
      )
    );
  }

  return (
    <ContributionGraphView
      contributions={contributions}
      theme={theme}
      squareSize={squareSize}
      gap={gap}
      showMonthLabels={showMonthLabels}
      showWeekdayLabels={showWeekdayLabels}
      className={className}
    />
  );
}

interface ContributionGraphViewProps {
  contributions: ContributionData;
  theme: ThemeName;
  squareSize: number;
  gap: number;
  showMonthLabels: boolean;
  showWeekdayLabels: boolean;
  className?: string;
}

function ContributionGraphView({
  contributions,
  theme,
  squareSize,
  gap,
  showMonthLabels,
  showWeekdayLabels,
  className,
}: ContributionGraphViewProps) {
  const themeColors = getTheme(theme);

  // Fill missing dates
  const { start, end } = getLastYear();
  const filledData = fillMissingDates(contributions, start, end);

  // Group by weeks
  const weeks = groupByWeeks(filledData);

  // Calculate dimensions
  const weekdayLabelWidth = showWeekdayLabels ? 30 : 0;

  return (
    <div
      className={clsx('font-sans', className)}
      style={{ backgroundColor: themeColors.background }}
    >
      <div className="inline-block p-4">
        {/* Month labels */}
        {showMonthLabels && (
          <div
            className="flex text-xs text-gray-600 mb-1"
            style={{ marginLeft: weekdayLabelWidth }}
          >
            {getMonthLabels(weeks, squareSize, gap)}
          </div>
        )}

        <div className="flex">
          {/* Weekday labels */}
          {showWeekdayLabels && (
            <div className="flex flex-col justify-around text-xs text-gray-600 mr-2">
              <div style={{ height: squareSize }}>Mon</div>
              <div style={{ height: squareSize }}>Wed</div>
              <div style={{ height: squareSize }}>Fri</div>
            </div>
          )}

          {/* Contribution grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => {
                  const level = getColorLevel(day.count);
                  const color = level === -1 ? themeColors.empty : themeColors.levels[level];

                  return (
                    <div
                      key={dayIndex}
                      className="rounded-sm transition-all hover:ring-2 hover:ring-gray-400 cursor-pointer"
                      style={{
                        width: squareSize,
                        height: squareSize,
                        backgroundColor: color,
                      }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-2 text-xs text-gray-600">
          <span>Less</span>
          <div className="flex gap-1">
            <div
              className="rounded-sm"
              style={{
                width: squareSize,
                height: squareSize,
                backgroundColor: themeColors.empty,
              }}
            />
            {themeColors.levels.map((color, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: squareSize,
                  height: squareSize,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Groups contribution data by weeks (starting on Sunday)
 */
function groupByWeeks(data: ContributionData): ContributionData[] {
  const weeks: ContributionData[] = [];
  let currentWeek: ContributionData = [];

  // Find the first Sunday
  const firstDate = new Date(data[0].date);
  const dayOfWeek = firstDate.getDay();

  // Pad with empty days if not starting on Sunday
  for (let i = 0; i < dayOfWeek; i++) {
    currentWeek.push({ date: '', count: 0 });
  }

  for (const day of data) {
    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add remaining days
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', count: 0 });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Generates month labels for the graph
 */
function getMonthLabels(
  weeks: ContributionData[],
  squareSize: number,
  gap: number
): React.ReactNode[] {
  const labels: React.ReactNode[] = [];
  let lastMonth = '';

  weeks.forEach((week, index) => {
    const firstDay = week.find((d) => d.date);
    if (firstDay) {
      const date = new Date(firstDay.date);
      const month = date.toLocaleString('default', { month: 'short' });

      if (month !== lastMonth) {
        labels.push(
          <div
            key={index}
            style={{
              width: squareSize + gap,
              textAlign: 'left',
            }}
          >
            {month}
          </div>
        );
        lastMonth = month;
      } else {
        labels.push(
          <div
            key={index}
            style={{
              width: squareSize + gap,
            }}
          />
        );
      }
    }
  });

  return labels;
}
