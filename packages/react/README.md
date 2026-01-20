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

### Using the `usePermission` Hook

Check permissions in your components:

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

### Using the `useFeature` Hook

Check if a feature is enabled (optionally for the a specific segment):

```typescript
import { useFeature } from '@teamboks/react';

function FeatureComponent() {
  const { isEnabled, isLoading, error } = useFeature({
    feature: 'advanced-analytics',
    segment: 'workspace-123' // optional
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isEnabled ? (
        <div>Advanced Analytics Panel</div>
      ) : (
        <p>This feature is not available</p>
      )}
    </div>
  );
}
```

### Using the `ProtectedRoute` Component

Conditionally render content based on feature availability:

```typescript
import { ProtectedRoute } from '@teamboks/react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <ProtectedRoute
        feature="premium-dashboard"
        segment="workspace-123"
        loadingFallback={<div>Loading dashboard...</div>}
        fallback={<p>Premium dashboard is not available</p>}
      >
        <div>Premium Dashboard Content</div>
      </ProtectedRoute>
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
  role: 'admin',
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

### `useFeature({ feature: string, segment?: string | null })`

A React hook that checks if a feature is enabled for the current workspace.

#### Parameters

- `feature`: The feature name to check
- `segment`: Optional workspace/segment identifier

#### Returns

- `{ isEnabled: boolean, isLoading: boolean, error: Error | null }`

### `<ProtectedRoute feature={string} segment?={string | null} fallback?={ReactNode} loadingFallback?={ReactNode}>`

A React component that conditionally renders children based on feature availability.

#### Props

- `feature`: The feature name to check
- `segment`: Optional workspace/segment identifier
- `children`: Content to render if feature is enabled
- `fallback`: Content to render if feature is disabled (default: null)
- `loadingFallback`: Content to render while checking feature status (default: null)

#### Example

```tsx
<ProtectedRoute
  feature="premium-dashboard"
  loadingFallback={<div>Loading...</div>}
  fallback={<div>Feature not available</div>}
>
  <PremiumDashboard />
</ProtectedRoute>
```

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
