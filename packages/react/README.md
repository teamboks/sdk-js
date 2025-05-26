# @teamboks/react

A React SDK for managing permissions in Teamboks applications.

## Installation

```bash
npm install @teamboks/react
# or
yarn add @teamboks/react
```

## Usage

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
  const canEdit = usePermission({
    feature: 'users',
    action: 'edit',
    role: 'admin'
  });

  return (
    <div>
      {canEdit ? (
        <button>Edit User</button>
      ) : (
        <p>You don't have permission to edit users</p>
      )}
    </div>
  );
}
```

## API Reference

### `<TeamboksProvider apiKey={string}>`

A React provider component that initializes the SDK with your API key and makes it available to child components.

#### Props

- `apiKey`: Your Teamboks API key
- `children`: React children components

### `usePermission({ feature: string, action: string, role: string })`

A React hook that returns a boolean indicating whether the current user has permission to perform the specified action.

#### Parameters

- `feature`: The feature to check permissions for
- `action`: The action to check permissions for
- `role`: The role to check permissions for

#### Returns

- `boolean`: Whether the user has permission

### `useTeamboks()`

A React hook that returns the Teamboks context, providing access to the current API key.

#### Returns

- `{ apiKey: string }`: The current Teamboks context

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
