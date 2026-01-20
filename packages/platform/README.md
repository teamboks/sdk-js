# @teamboks/client

Teamboks Client SDK - API client for community platform management.

This package provides a Prisma-like interface for interacting with the Teamboks API, allowing you to manage workspaces, features, roles, actions, and users programmatically.

## Installation

```bash
npm install @teamboks/client
# or
yarn add @teamboks/client
# or
pnpm add @teamboks/client
```

## Usage

### Initialize the Client

```typescript
import { createTeamboksClient } from '@teamboks/client';

const teamboks = createTeamboksClient({
  apiKey: process.env.TEAMBOKS_API_KEY,
  baseUrl: 'https://api.teamboks.com', // optional
});
```

### Workspaces

```typescript
// Create a workspace
const workspace = await teamboks.workspaces.create({
  name: 'My Community',
  description: 'A community platform',
});

// Get all workspaces
const workspaces = await teamboks.workspaces.findMany();

// Get a specific workspace
const workspace = await teamboks.workspaces.findUnique({
  id: 'workspace-id',
});

// Update a workspace
const updated = await teamboks.workspaces.update({
  id: 'workspace-id',
  data: {
    name: 'Updated Name',
  },
});

// Delete a workspace
await teamboks.workspaces.delete({
  id: 'workspace-id',
});
```

## License

MIT
