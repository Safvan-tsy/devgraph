# devgraph-core

Core library for fetching and normalizing developer contributions across multiple platforms.

## Features

- 🔥 **Multi-platform support**: GitHub, GitLab (Bitbucket coming soon)
- 🎨 **Built-in themes**: GitHub, Dark, Light
- 📦 **Zero dependencies**: Pure TypeScript
- 🚀 **Modern ESM**: Tree-shakeable exports
- 💾 **Smart caching**: Reduces API calls
- 🔒 **Type-safe**: Full TypeScript support

## Installation

```bash
npm install devgraph-core
```

## Quick Start

```typescript
import { getContributions } from 'devgraph-core';

const contributions = await getContributions({
  github: { 
    username: 'octocat',
    token: 'ghp_...' // Optional, for private repos
  },
  gitlab: { 
    username: 'gitlab-user' 
  }
});

console.log(contributions);
// [{ date: '2024-01-01', count: 5 }, ...]
```

## API Reference

### `getContributions(config)`

Fetches and merges contributions from configured platforms.

```typescript
interface DevGraphConfig {
  github?: {
    username: string;
    token?: string;
  };
  gitlab?: {
    username: string;
    token?: string;
    baseUrl?: string; // Default: https://gitlab.com
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
}
```

### `getCachedContributions(config)`

Same as `getContributions` but with 30-minute in-memory cache.

### Themes

```typescript
import { themes, getTheme, getColorLevel } from 'devgraph-core';

const darkTheme = getTheme('dark');
const level = getColorLevel(5); // Returns 0-4 or -1 for empty
```

### Utilities

```typescript
import { 
  mergeContributions,
  filterByDateRange,
  fillMissingDates,
  getLastYear 
} from 'devgraph-core';

const merged = mergeContributions(githubData, gitlabData);
const lastYear = getLastYear();
const filtered = filterByDateRange(contributions, lastYear.start, lastYear.end);
```

## Authentication

### GitHub

Create a personal access token at https://github.com/settings/tokens with `read:user` scope.

### GitLab

Create a personal access token at https://gitlab.com/-/profile/personal_access_tokens with `read_api` scope.

## License

MIT © safvan
