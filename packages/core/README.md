# @teamboks/core

Framework-agnostic core SDK for Teamboks.

## Overview

This package contains the shared business logic, API communication, constants, and types that are used across all Teamboks framework-specific SDKs (React, Vue, Angular, Svelte, etc.).

## Features

- ✅ Framework-agnostic
- ✅ API key management
- ✅ TypeScript support
- ✅ Shared constants and configuration

## Installation

```bash
npm install @teamboks/core
# or
pnpm add @teamboks/core
# or  
yarn add @teamboks/core
```

## Usage

### Basic Setup

```typescript
import { init, permissions } from '@teamboks/core';

// Initialize with your API key
init('your-api-key-here');

// Check permissions
const result = await permissions.check({
  feature: 'dashboard',
  action: 'read',
  role: 'admin',
});

console.log('Permission status:', result.status);
```

### API Reference

#### `init(apiKey: string)`

Initialize the SDK with your API key.

#### `permissions.check(params: PermissionCheckParams)`

Check if a permission is granted.

**Parameters:**
- `feature: string` - The feature to check
- `action: string` - The action to perform 
- `role: string` - The user's role
- `apiKey?: string` - Optional API key override

**Returns:** `Promise<PermissionCheckResponse>`

### Types

```typescript
import type { PermissionCheckParams, PermissionCheckResponse } from '@teamboks/core';
```

## Framework-Specific Packages

This core package is used by:
- `@teamboks/react` - React hooks and components
- `@teamboks/vue` - Vue composables and components  
- `@teamboks/angular` - Angular services and directives
- `@teamboks/svelte` - Svelte stores and components

## License

MIT 