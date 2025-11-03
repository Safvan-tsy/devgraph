# DevGraph 📊

> Cross-platform developer contribution visualization library

[![npm version](https://img.shields.io/npm/v/@devgraph/core.svg)](https://www.npmjs.com/package/@devgraph/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/safvan/devgraph/workflows/CI%2FCD/badge.svg)](https://github.com/safvan/devgraph/actions)

DevGraph is a modern TypeScript library that aggregates and visualizes developer contributions from multiple platforms (GitHub, GitLab, and more) into a unified contribution graph.

![DevGraph Demo](https://via.placeholder.com/800x400?text=DevGraph+Demo)

## ✨ Features

- 🌐 **Multi-platform**: GitHub, GitLab support (Bitbucket coming soon)
- ⚛️ **Framework Support**: React (Vue & Angular coming soon)
- 🎨 **Themeable**: Built-in GitHub, Dark, and Light themes
- 📦 **Zero Dependencies**: Core library has no dependencies
- 🚀 **Modern Stack**: TypeScript, ES Modules, Tree-shakeable
- 💾 **Smart Caching**: Reduces API calls
- 🔒 **Type-safe**: Full TypeScript support
- ♿ **Accessible**: ARIA labels and keyboard navigation

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@devgraph/core](./packages/core) | ![npm](https://img.shields.io/npm/v/@devgraph/core) | Core API client (framework-agnostic) |
| [@devgraph/react](./packages/react) | ![npm](https://img.shields.io/npm/v/@devgraph/react) | React components |

## 🚀 Quick Start

### Installation

```bash
npm install @devgraph/react @devgraph/core
```

### Basic Usage

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

## 📚 Documentation

### Core Library

The `@devgraph/core` package provides framework-agnostic utilities for fetching and normalizing contribution data.

```typescript
import { getContributions } from '@devgraph/core';

const contributions = await getContributions({
  github: { 
    username: 'octocat',
    token: 'ghp_...' // Optional
  },
  gitlab: { 
    username: 'gitlab-user' 
  }
});
```

[View full core documentation →](./packages/core/README.md)

### React Components

The `@devgraph/react` package provides ready-to-use React components.

```tsx
<ContributionGraph
  config={{ github: { username: 'octocat' } }}
  theme="github"
  squareSize={12}
  showMonthLabels={true}
/>
```

[View full React documentation →](./packages/react/README.md)

## 🎨 Themes

DevGraph comes with three built-in themes:

- **GitHub**: Classic GitHub contribution graph colors
- **Dark**: Dark mode with vibrant greens
- **Light**: Light mode with softer colors

You can also create custom themes by extending the theme system.

## 🔐 Authentication

### GitHub

1. Go to https://github.com/settings/tokens
2. Generate a new token with `read:user` scope
3. Pass it to the config:

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

### GitLab

1. Go to https://gitlab.com/-/profile/personal_access_tokens
2. Create a token with `read_api` scope
3. Pass it to the config:

```tsx
<ContributionGraph
  config={{
    gitlab: {
      username: 'gitlab-user',
      token: process.env.GITLAB_TOKEN
    }
  }}
/>
```

## 🛠️ Development

This is a monorepo managed with npm workspaces.

### Setup

```bash
# Clone the repository
git clone https://github.com/safvan/devgraph.git
cd devgraph

# Install dependencies
npm install

# Build all packages
npm run build

# Run the demo
npm run dev
```

### Project Structure

```
devgraph/
├── packages/
│   ├── core/          # @devgraph/core
│   └── react/         # @devgraph/react
├── examples/
│   └── react-demo/    # Vite + React demo
└── .github/
    └── workflows/     # CI/CD
```

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ GitHub integration
- ✅ GitLab integration
- ✅ React component
- ✅ Basic themes

### Phase 2
- [ ] Bitbucket integration
- [ ] More customization options
- [ ] Contribution statistics
- [ ] Export as SVG/PNG

### Phase 3
- [ ] Vue component
- [ ] Angular component
- [ ] Custom theme builder
- [ ] Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © safvan

## 🙏 Acknowledgments

- Inspired by GitHub's contribution graph
- Built with TypeScript, React, and Vite
- Icons and design inspiration from various open-source projects

## 💬 Support

- 📫 **Issues**: [GitHub Issues](https://github.com/safvan/devgraph/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/safvan/devgraph/discussions)
- 📧 **Email**: support@devgraph.dev

---

Made with ❤️ by developers, for developers
