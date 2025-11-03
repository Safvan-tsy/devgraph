# DevGraph API Examples

## Core Package Examples

### Basic Usage

```typescript
import { getContributions } from 'devgraph-core';

// Fetch GitHub contributions
const contributions = await getContributions({
  github: { username: 'octocat' }
});

console.log(contributions);
// [
//   { date: '2024-01-01', count: 5, platform: 'github' },
//   { date: '2024-01-02', count: 3, platform: 'github' },
//   ...
// ]
```

### Multiple Platforms

```typescript
import { getContributions } from 'devgraph-core';

const contributions = await getContributions({
  github: { 
    username: 'octocat',
    token: 'ghp_...' // Optional for private repos
  },
  gitlab: { 
    username: 'gitlab-user',
    token: 'glpat-...' // Optional
  }
});

// Contributions are automatically merged by date
```

### Date Range Filtering

```typescript
import { getContributions } from 'devgraph-core';

const lastMonth = new Date();
lastMonth.setMonth(lastMonth.getMonth() - 1);

const contributions = await getContributions({
  github: { username: 'octocat' },
  dateRange: {
    start: lastMonth,
    end: new Date()
  }
});
```

### Using Cache

```typescript
import { getCachedContributions } from 'devgraph-core';

// Same API, but results are cached for 30 minutes
const contributions = await getCachedContributions({
  github: { username: 'octocat' }
});
```

### Platform-Specific Fetching

```typescript
import { fetchGitHubContributions, fetchGitLabContributions } from 'devgraph-core';

// GitHub only
const githubData = await fetchGitHubContributions('octocat', 'ghp_token');

// GitLab only
const gitlabData = await fetchGitLabContributions('gitlab-user');

// Self-hosted GitLab
const selfHosted = await fetchGitLabContributions(
  'username',
  'token',
  'https://gitlab.company.com'
);
```

### Data Utilities

```typescript
import {
  mergeContributions,
  filterByDateRange,
  fillMissingDates,
  getLastYear,
  getLastNDays
} from 'devgraph-core';

// Merge multiple datasets
const github = await fetchGitHubContributions('user1');
const gitlab = await fetchGitLabContributions('user2');
const merged = mergeContributions(github, gitlab);

// Filter by date range
const { start, end } = getLastYear();
const filtered = filterByDateRange(merged, start, end);

// Fill missing dates with zeros
const complete = fillMissingDates(filtered, start, end);

// Get last 90 days
const { start: start90, end: end90 } = getLastNDays(90);
```

### Themes

```typescript
import { themes, getTheme, getColorLevel } from 'devgraph-core';

// Get all themes
console.log(themes);
// {
//   github: { background: '#ffffff', empty: '#ebedf0', levels: [...] },
//   dark: { ... },
//   light: { ... }
// }

// Get specific theme
const darkTheme = getTheme('dark');

// Get color level for contribution count
const level = getColorLevel(0);   // -1 (empty)
const level = getColorLevel(2);   // 0 (1-3 contributions)
const level = getColorLevel(5);   // 1 (4-6 contributions)
const level = getColorLevel(15);  // 4 (10+ contributions)
```

## React Component Examples

### Basic Usage

```tsx
import { ContributionGraph } from 'devgraph-react';

function App() {
  return (
    <ContributionGraph
      config={{ github: { username: 'octocat' } }}
    />
  );
}
```

### Multiple Platforms

```tsx
<ContributionGraph
  config={{
    github: { username: 'github-user' },
    gitlab: { username: 'gitlab-user' }
  }}
  theme="dark"
/>
```

### With Authentication

```tsx
<ContributionGraph
  config={{
    github: {
      username: 'octocat',
      token: process.env.REACT_APP_GITHUB_TOKEN
    }
  }}
/>
```

### Custom Styling

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  theme="github"
  squareSize={10}
  gap={2}
  showMonthLabels={true}
  showWeekdayLabels={false}
  className="shadow-lg rounded-lg"
/>
```

### Custom Loading State

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  loading={
    <div className="flex items-center justify-center p-20">
      <Spinner />
      <p>Loading your contributions...</p>
    </div>
  }
/>
```

### Custom Error Handling

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  error={(error) => (
    <div className="bg-red-50 p-4 rounded">
      <h3 className="text-red-800 font-bold">Error</h3>
      <p className="text-red-600">{error.message}</p>
      <button onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  )}
/>
```

### Dynamic Configuration

```tsx
import { useState } from 'react';
import { ContributionGraph, DevGraphConfig } from 'devgraph-react';

function DynamicGraph() {
  const [username, setUsername] = useState('octocat');
  const [config, setConfig] = useState<DevGraphConfig>({
    github: { username: 'octocat' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig({ github: { username } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
        />
        <button type="submit">Update</button>
      </form>

      <ContributionGraph config={config} />
    </div>
  );
}
```

### All Themes

```tsx
function ThemeShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h2>GitHub Theme</h2>
        <ContributionGraph
          config={{ github: { username: 'torvalds' } }}
          theme="github"
        />
      </div>

      <div>
        <h2>Dark Theme</h2>
        <ContributionGraph
          config={{ github: { username: 'torvalds' } }}
          theme="dark"
        />
      </div>

      <div>
        <h2>Light Theme</h2>
        <ContributionGraph
          config={{ github: { username: 'torvalds' } }}
          theme="light"
        />
      </div>
    </div>
  );
}
```

### Next.js Integration

```tsx
// app/page.tsx (App Router)
'use client';

import { ContributionGraph } from 'devgraph-react';

export default function Home() {
  return (
    <main>
      <h1>My Contributions</h1>
      <ContributionGraph
        config={{ github: { username: 'your-username' } }}
        theme="dark"
      />
    </main>
  );
}
```

```tsx
// pages/index.tsx (Pages Router)
import { ContributionGraph } from 'devgraph-react';

export default function Home() {
  return (
    <div>
      <h1>My Contributions</h1>
      <ContributionGraph
        config={{ github: { username: 'your-username' } }}
        theme="dark"
      />
    </div>
  );
}
```

### TypeScript Types

```tsx
import type {
  ContributionGraphProps,
  DevGraphConfig,
  ThemeName,
  ContributionData,
  ContributionDay
} from 'devgraph-react';

// Use in your components
const MyComponent: React.FC<ContributionGraphProps> = (props) => {
  return <ContributionGraph {...props} />;
};

// Type-safe configuration
const config: DevGraphConfig = {
  github: { username: 'octocat' },
  gitlab: { username: 'gitlab-user' }
};

// Custom data processing
const processContributions = (data: ContributionData): number => {
  return data.reduce((sum, day: ContributionDay) => sum + day.count, 0);
};
```

## Advanced Examples

### Custom Data Processing

```typescript
import { getContributions } from 'devgraph-core';

const contributions = await getContributions({
  github: { username: 'octocat' }
});

// Calculate statistics
const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
const avgPerDay = totalContributions / contributions.length;
const maxDay = contributions.reduce((max, day) => day.count > max.count ? day : max);

console.log(`Total: ${totalContributions}`);
console.log(`Average: ${avgPerDay.toFixed(2)}`);
console.log(`Best day: ${maxDay.date} with ${maxDay.count} contributions`);
```

### Streak Calculation

```typescript
function calculateStreak(contributions: ContributionData): number {
  let streak = 0;
  let currentStreak = 0;

  for (const day of contributions.reverse()) {
    if (day.count > 0) {
      currentStreak++;
      streak = Math.max(streak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return streak;
}

const contributions = await getContributions({ github: { username: 'octocat' } });
const longestStreak = calculateStreak(contributions);
```

### Rate Limit Handling

```typescript
import { getContributions } from 'devgraph-core';

async function fetchWithRetry(config: DevGraphConfig, retries = 3) {
  try {
    return await getContributions(config);
  } catch (error) {
    if (retries > 0 && error.message.includes('rate limit')) {
      console.log(`Rate limited, retrying in 60s... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 60000));
      return fetchWithRetry(config, retries - 1);
    }
    throw error;
  }
}
```

## Environment Variables

### React (CRA, Vite)

```env
# .env
VITE_GITHUB_TOKEN=ghp_your_token_here
VITE_GITLAB_TOKEN=glpat_your_token_here
```

```tsx
<ContributionGraph
  config={{
    github: {
      username: 'octocat',
      token: import.meta.env.VITE_GITHUB_TOKEN
    }
  }}
/>
```

### Next.js

```env
# .env.local
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token_here
NEXT_PUBLIC_GITLAB_TOKEN=glpat_your_token_here
```

```tsx
<ContributionGraph
  config={{
    github: {
      username: 'octocat',
      token: process.env.NEXT_PUBLIC_GITHUB_TOKEN
    }
  }}
/>
```

## Testing

### Mock Data

```typescript
import type { ContributionData } from 'devgraph-core';

const mockContributions: ContributionData = [
  { date: '2024-01-01', count: 5 },
  { date: '2024-01-02', count: 3 },
  { date: '2024-01-03', count: 0 },
  { date: '2024-01-04', count: 8 },
];

// Use in tests or storybook
<ContributionGraph
  config={{ github: { username: 'mock' } }}
  loading={<div>Mock data loaded</div>}
/>
```

---

For more examples, check out the demo app at `examples/react-demo/src/App.tsx`!
