# DevGraph - Getting Started

## 🎉 Setup Complete!

Your DevGraph monorepo is fully configured and ready to use. All packages have been built successfully.

## 📁 Project Structure

```
devgraph/
├── packages/
│   ├── core/              # devgraph-core - Platform API client
│   │   ├── src/
│   │   │   ├── api.ts         # Main API functions
│   │   │   ├── github.ts      # GitHub integration
│   │   │   ├── gitlab.ts      # GitLab integration
│   │   │   ├── themes.ts      # Theme configurations
│   │   │   ├── types.ts       # TypeScript types
│   │   │   └── utils.ts       # Utility functions
│   │   └── dist/          # Build output
│   │
│   └── react/             # devgraph-react - React components
│       ├── src/
│       │   ├── ContributionGraph.tsx  # Main component
│       │   └── index.ts
│       └── dist/          # Build output
│
├── examples/
│   └── react-demo/        # Demo application
│       ├── src/
│       │   ├── App.tsx        # Demo UI
│       │   └── main.tsx
│       └── dist/          # Build output
│
├── .github/
│   └── workflows/
│       └── ci.yml         # CI/CD pipeline
│
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE                # MIT License
└── package.json           # Root package
```

## 🚀 Quick Commands

### Development
```bash
# Install dependencies (already done)
npm install

# Build all packages
npm run build

# Run demo application (already running at http://localhost:3000)
npm run dev

# Lint code
npm run lint
```

### Publishing (when ready)
```bash
# Publish core package
npm run publish:core

# Publish React package
npm run publish:react
```

## 🔑 Key Features Implemented

### devgraph-core
- ✅ GitHub API integration (GraphQL)
- ✅ GitLab API integration (REST)
- ✅ Contribution data normalization
- ✅ Smart caching (30-min TTL)
- ✅ Three built-in themes (GitHub, Dark, Light)
- ✅ Date range filtering
- ✅ Full TypeScript support
- ✅ Zero dependencies

### devgraph-react
- ✅ ContributionGraph component
- ✅ Theme support
- ✅ Customizable sizing
- ✅ Loading & error states
- ✅ Responsive design
- ✅ Tailwind CSS styling
- ✅ "use client" directive for Next.js

### Demo Application
- ✅ Interactive configuration form
- ✅ Multi-platform support (GitHub + GitLab)
- ✅ Theme switcher
- ✅ Token authentication support
- ✅ Beautiful UI with Tailwind CSS
- ✅ Dark mode support

## 📝 Next Steps

### 1. Test the Demo
Visit http://localhost:3000 to see your contribution graph in action!

### 2. Try Different Users
- Default: `torvalds` (GitHub)
- Try your own username
- Add a GitLab username

### 3. Add Authentication (Optional)
For private repositories or higher rate limits:

**GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Generate token with `read:user` scope
3. Add to the demo form

**GitLab Token:**
1. Go to https://gitlab.com/-/profile/personal_access_tokens
2. Create token with `read_api` scope
3. Add to the demo form

### 4. Customize
- Modify themes in `packages/core/src/themes.ts`
- Adjust component in `packages/react/src/ContributionGraph.tsx`
- Update demo UI in `examples/react-demo/src/App.tsx`

### 5. Before Publishing

**Required Steps:**
1. Update `package.json` files with your details:
   - Author name
   - Repository URL
   - Homepage
   
2. Create GitHub repository
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DevGraph Phase 1"
   git remote add origin https://github.com/YOUR_USERNAME/devgraph.git
   git push -u origin main
   ```

3. Add npm authentication:
   - Create npm account at https://www.npmjs.com
   - Login: `npm login`
   - Add NPM_TOKEN to GitHub secrets

4. Test publishing:
   ```bash
   npm run build
   npm run publish:core
   npm run publish:react
   ```

## 🎨 Using in Your Projects

### Installation
```bash
npm install devgraph-react devgraph-core
```

### Basic Usage
```tsx
import { ContributionGraph } from 'devgraph-react';

function MyWebsite() {
  return (
    <ContributionGraph
      config={{
        github: { username: 'your-username' },
        gitlab: { username: 'your-gitlab' }
      }}
      theme="dark"
    />
  );
}
```

## 🐛 Troubleshooting

### Build Errors
```bash
npm run clean
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in examples/react-demo/vite.config.ts
```

### Rate Limiting
- Add authentication tokens
- Use cached version: `getCachedContributions()`
- Wait for rate limit reset

## 📚 Documentation

- Core API: `packages/core/README.md`
- React Components: `packages/react/README.md`
- Contributing: `CONTRIBUTING.md`

## 🗺️ Roadmap

### Phase 2 (Next)
- [ ] Bitbucket integration
- [ ] Contribution statistics
- [ ] Export as SVG/PNG
- [ ] More themes

### Phase 3 (Future)
- [ ] Vue component
- [ ] Angular component
- [ ] Custom theme builder
- [ ] Analytics dashboard

## 💡 Tips

1. **Performance**: Use `getCachedContributions()` to reduce API calls
2. **Styling**: Pass custom `className` to ContributionGraph
3. **Themes**: Extend themes in core package
4. **Error Handling**: Provide custom error component
5. **Loading States**: Add custom loading UI

## 🎯 Success!

Your DevGraph library is production-ready! 🚀

- ✅ Monorepo structure
- ✅ Type-safe TypeScript
- ✅ Modern build setup
- ✅ CI/CD pipeline
- ✅ Comprehensive docs
- ✅ Working demo

Happy coding! 🎉
