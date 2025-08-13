# code-soffritto

## Table of Contents

- [Project Description](#project-description)
- [Setup](#setup)
- [Development server](#development-server)
- [Production server](#production-server)
- [API Fetch Strategy](#api-fetch-strategy)
- [Linting-Formatting](#linting-formatting)

## Project Description

Playground for experimentation

Tech:

- React 19
- TypeScript
- Tailwind CSS
- Vite
- [Biome](#linting-formatting)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Start](https://tanstack.com/start/latest)
- [Signals](https://preactjs.com/guide/v10/signals/)

## Setup

Install the Node version listed in [`.nvmrc`](.nvmrc).

```sh
nvm use
```

### Development server

Start the development server on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```

### Production server

Build the application for production:

```sh
npm run build
```

Locally preview production build:

```sh
npm run preview
```

## API Fetch Strategy

The API fetch layer is designed for robustness, type safety, and developer experience:

- **Type-safe fetch wrapper**: All API calls are strongly typed for request and response.
- **Custom error handling & mapping**: Differentiates between HTTP errors, network errors, aborts, and custom error codes/messages. Automatically maps error codes and HTTP status to friendly, optionally localized messages (i18n-ready).
- **Timeout support**: Requests are automatically aborted after a configurable timeout.
- **Authorization & localization**: Supports configurable access tokens and language/locale headers.
- **Flexible request config**: Easily merge headers, stringify bodies, and handle FormData.
- **JSDoc documentation**: All fetch utilities are fully documented for IDE autocompletion.
- **Testing exceptions support**: Simulate network errors for testing purposes.
- **Seamless integration**: Can be used standalone, with React's `use()` for Suspense-based data fetching, or with TanStack Query.
- **Facade Pattern**: The API layer exposes a simple, unified interface for all network operations, hiding internal complexity and implementation details and avoiding entanglement.

## Linting-Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

[Getting Started](https://biomejs.dev/guides/getting-started/)

[Formatter](hhttps://biomejs.dev/formatter/)

### Common Biome Commands

```sh
# Format all files
npx @biomejs/biome format --write

# Format specific files
npx @biomejs/biome format --write <files>

# Lint files and apply safe fixes to all files
npx @biomejs/biome lint --write

# Lint files and apply safe fixes to specific files
npx @biomejs/biome lint --write <files>

# Format, lint, and organize imports of all files
npx @biomejs/biome check --write

# Format, lint, and organize imports of specific files
npx @biomejs/biome check --write <files>
```

### Biome suppression syntax

```js
// biome-ignore lint: <explanation>
// biome-ignore assist: <explanation>
// biome-ignore syntax: <explanation>
// biome-ignore lint/suspicious: <explanation>
// biome-ignore lint/suspicious/noDebugger: <explanation>
// biome-ignore lint/suspicious/noDebugger(foo): <explanation>
// biome-ignore-all lint: <explanation>
// biome-ignore-start lint: <explanation>
// biome-ignore-end lint: <explanation>
```
