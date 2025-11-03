# Contributing to DevGraph

Thank you for your interest in contributing to DevGraph! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/devgraph.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/my-new-feature`

## Development Workflow

### Running the Demo

```bash
npm run dev
```

This starts the Vite dev server with the React demo at http://localhost:3000

### Building Packages

```bash
npm run build
```

This builds all packages in the monorepo.

### Linting

```bash
npm run lint
```

## Project Structure

- `packages/core/` - Core API library (TypeScript)
- `packages/react/` - React components (TypeScript + React)
- `examples/react-demo/` - Demo application (Vite + React)

## Adding a New Platform

To add support for a new platform (e.g., Bitbucket):

1. Create a new file in `packages/core/src/` (e.g., `bitbucket.ts`)
2. Implement the `fetch<Platform>Contributions` function
3. Update the `DevGraphConfig` type in `types.ts`
4. Update the `getContributions` function in `api.ts`
5. Add tests and documentation

## Code Style

- Use TypeScript for all code
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Commit Messages

Use conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring

Example: `feat: add Bitbucket integration`

## Pull Request Process

1. Update documentation for any API changes
2. Ensure all tests pass
3. Update CHANGELOG.md
4. Request review from maintainers

## Questions?

Feel free to open an issue or start a discussion!
