# @teamboks/react

A React SDK for managing permissions in Teamboks applications.

## Installation

```bash
npm install @teamboks/react @teamboks/core
# or
yarn add @teamboks/react @teamboks/core
```

## Usage

This package provides React-specific functionality (hooks, components, context). For core functionality like API configuration and direct permission checking, use `@teamboks/core`.

First, wrap your app with the `TeamboksProvider` and provide your API key:

```typescript
import React from 'react';
import { TeamboksProvider } from '@teamboks/react';
import App from './App';

function Root() {
  return (
    <TeamboksProvider apiKey="your-api-key">
      <App />
    </TeamboksProvider>
  );
}

export default Root;
```

Then use the `usePermission` hook to check permissions in your components:

```typescript
import { usePermission } from '@teamboks/react';

function MyComponent() {
  const { canActivate, isLoading, error } = usePermission({
    feature: 'users',
    action: 'edit',
    role: 'admin'
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {canActivate ? (
        <button>Edit User</button>
      ) : (
        <p>You don't have permission to edit users</p>
      )}
    </div>
  );
}
```

For direct API usage without React hooks, use the core package:

```typescript
import { init, permissions, API_CONFIG } from '@teamboks/core';

// Initialize with API key
init('your-api-key');

// Check permissions directly
const result = await permissions.check({
  feature: 'users',
  action: 'edit',
  role: 'admin'
});

console.log('Permission granted:', result.status === 200);
```

## API Reference

### `<TeamboksProvider apiKey={string}>`

A React provider component that initializes the SDK with your API key and makes it available to child components.

#### Props

- `apiKey`: Your Teamboks API key
- `children`: React children components

### `usePermission({ feature: string, action: string, role: string })`

A React hook that returns permission status with loading and error states.

#### Parameters

- `feature`: The feature to check permissions for
- `action`: The action to check permissions for
- `role`: The role to check permissions for

#### Returns

- `{ canActivate: boolean, isLoading: boolean, error: Error | null }`

### `useTeamboks()`

A React hook that returns the Teamboks context, providing access to the current API key.

#### Returns

- `{ apiKey: string }`: The current Teamboks context

## Core Functionality

For framework-agnostic functionality, see [`@teamboks/core`](../core/README.md):
- API configuration and constants
- Direct permission checking
- API key management
- TypeScript types

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build
npm run build
```

## License

MIT
