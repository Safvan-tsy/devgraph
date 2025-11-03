# @devgraph/react

React components for visualizing developer contributions across platforms.

## Features

- ⚛️ **React 18+**: Modern React with hooks
- 🎨 **Themeable**: Built-in themes (GitHub, Dark, Light)
- 📱 **Responsive**: Works on all screen sizes
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🎯 **TypeScript**: Full type safety
- 🎭 **Customizable**: Control size, colors, labels

## Installation

```bash
npm install @devgraph/react @devgraph/core
```

## Quick Start

```tsx
import { ContributionGraph } from '@devgraph/react';

function App() {
  return (
    <ContributionGraph
      config={{
        github: { username: 'octocat' },
        gitlab: { username: 'gitlab-user' }
      }}
      theme="dark"
    />
  );
}
```

## Props

### ContributionGraphProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `DevGraphConfig` | **required** | Platform configurations |
| `theme` | `'github' \| 'dark' \| 'light'` | `'github'` | Color theme |
| `squareSize` | `number` | `12` | Size of each square in pixels |
| `gap` | `number` | `3` | Gap between squares in pixels |
| `showMonthLabels` | `boolean` | `true` | Show month labels |
| `showWeekdayLabels` | `boolean` | `true` | Show weekday labels |
| `loading` | `ReactNode` | Loading text | Custom loading component |
| `error` | `(error: Error) => ReactNode` | Error text | Custom error handler |
| `className` | `string` | - | Additional CSS class |

## Examples

### With Authentication

```tsx
<ContributionGraph
  config={{
    github: {
      username: 'octocat',
      token: process.env.GITHUB_TOKEN
    }
  }}
/>
```

### Custom Theme

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  theme="dark"
  squareSize={10}
  gap={2}
/>
```

### Custom Loading & Error

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  loading={<Spinner />}
  error={(err) => <ErrorBanner message={err.message} />}
/>
```

### Multiple Platforms

```tsx
<ContributionGraph
  config={{
    github: { username: 'github-user' },
    gitlab: { username: 'gitlab-user', baseUrl: 'https://gitlab.company.com' }
  }}
/>
```

## Styling

The component uses inline styles for the graph itself but accepts a `className` prop for the container:

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  className="shadow-lg rounded-lg"
/>
```

## Server-Side Rendering

This component is compatible with Next.js and other SSR frameworks. It uses `"use client"` directive internally.

## License

MIT © safvan
