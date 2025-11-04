# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-04

### 🎉 Major Improvements

#### Added
- **No Token Required!** Both packages now work without authentication tokens
  - GitHub: Uses public REST API to fetch last ~300 events
  - GitLab: Fetches up to 1,000 events from public profiles
  - Tokens are now optional, only needed for private repos or higher rate limits

- **Date Range Selector** in demo app
  - Choose from: Last 30 days, 3 months, 6 months, or 1 year
  - Better control over displayed contribution data
  
- **Improved Data Fetching**
  - GitHub: Dual API support (GraphQL with token, REST without)
  - GitLab: Fetches up to 10 pages (1,000 events) instead of just 100
  - Better coverage of contribution history

#### Changed
- Updated default usernames in demo to actual contributors
- Improved error messages and user guidance
- Better documentation about when tokens are needed

#### Fixed
- GitHub contributions not showing without token
- Limited GitLab event history (100 → 1,000 events)
- Missing date range filter in UI

### Technical Details

**devgraph-core v0.2.0:**
- New `fetchGitHubContributionsPublic()` function for token-free access
- New `fetchGitHubContributionsGraphQL()` for authenticated requests
- Updated `fetchGitLabContributions()` to fetch multiple pages
- Automatic fallback: uses GraphQL if token present, REST otherwise

**devgraph-react v0.2.0:**
- No breaking changes
- Fully compatible with new core API

## [0.1.0] - 2025-11-03

### 🚀 Initial Release

#### Added
- Core package (`devgraph-core`) with GitHub & GitLab support
- React component package (`devgraph-react`)
- Three built-in themes: GitHub, Dark, Light
- TypeScript support with full type definitions
- Smart caching (30-minute TTL)
- Monorepo setup with npm workspaces
- Demo application with Vite + React
- Comprehensive documentation
- CI/CD pipeline with GitHub Actions

#### Features
- Multi-platform contribution aggregation
- Customizable contribution graph visualization
- Date range filtering
- Zero external dependencies in core
- ESM-only for modern JavaScript
- Server-side rendering compatible

---

## Upgrade Guide

### From 0.1.0 to 0.2.0

**No breaking changes!** This is a backward-compatible update.

**What's better:**
1. You can now remove tokens from your config if only accessing public data
2. More contribution data will be fetched automatically
3. Better user experience in the demo app

**Migration:**
```typescript
// Before (0.1.0) - token required
const contributions = await getContributions({
  github: { 
    username: 'octocat',
    token: 'ghp_...' // Required
  }
});

// After (0.2.0) - token optional!
const contributions = await getContributions({
  github: { 
    username: 'octocat'
    // token: 'ghp_...' // Optional
  }
});
```

**Recommendation:**
- Update to 0.2.0 for better public profile support
- Keep tokens only if you need private repo data or higher rate limits
- Test without tokens first - you might not need them!

---

## Roadmap

### 0.3.0 (Planned)
- [ ] Bitbucket integration
- [ ] Contribution statistics and analytics
- [ ] Export as SVG/PNG
- [ ] More customization options
- [ ] Hover tooltips with detailed info

### 0.4.0 (Planned)
- [ ] Vue component package
- [ ] Angular component package
- [ ] Custom theme builder
- [ ] Contribution streaks

### 1.0.0 (Future)
- [ ] Stable API
- [ ] Production-ready for all platforms
- [ ] Advanced analytics dashboard
- [ ] Plugin system for custom platforms
