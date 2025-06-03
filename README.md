# Teamboks JavaScript SDK

A monorepo containing JavaScript/TypeScript SDKs for Teamboks permission management across different frameworks.

## Packages

### Core Package

- `@teamboks/core` - Framework-agnostic core SDK containing business logic, API communication, constants, and types

### Framework SDK Packages

- `@teamboks/react` - React SDK with hooks and components (depends on `@teamboks/core`)
- `@teamboks/vue` - Vue SDK with composables and components (coming soon)
- `@teamboks/svelte` - Svelte SDK with stores and components (coming soon)
- `@teamboks/angular` - Angular SDK with services and directives (coming soon)

### Shared Configuration Packages

- `@teamboks/eslint-config` - Shared ESLint configuration for all SDK packages
- `@teamboks/prettier-config` - Shared Prettier configuration for all SDK packages
- `@teamboks/tsconfig` - Shared TypeScript configurations for all SDK packages

## Architecture

The SDK follows a **core + framework-specific wrapper** architecture:

- **`@teamboks/core`** provides framework-agnostic functionality:
  - API configuration and constants
  - Permission checking business logic
  - API key management
  - TypeScript types and interfaces
  - Error handling

- **Framework packages** provide framework-specific wrappers:
  - React: Hooks (`usePermission`), Context (`TeamboksProvider`), Components
  - Vue: Composables, reactive stores, components (coming soon)
  - Angular: Services, directives, guards (coming soon)
  - Svelte: Stores, actions, components (coming soon)

This ensures consistency across frameworks while providing optimal developer experience for each.

## Usage

### Framework-Agnostic (Core)

For direct API usage without framework-specific features:

```bash
npm install @teamboks/core
```

```typescript
import { init, permissions, API_CONFIG } from '@teamboks/core';

// Initialize with API key
init('your-api-key');

// Check permissions
const result = await permissions.check({
  feature: 'dashboard',
  action: 'read',
  role: 'admin'
});

console.log('Permission granted:', result.status === 200);
```

### React

For React applications with hooks and components:

```bash
npm install @teamboks/react @teamboks/core
```

```typescript
import { TeamboksProvider, usePermission } from '@teamboks/react';

function App() {
  return (
    <TeamboksProvider apiKey="your-api-key">
      <Dashboard />
    </TeamboksProvider>
  );
}

function Dashboard() {
  const { canActivate, isLoading } = usePermission({
    feature: 'dashboard',
    action: 'read',
    role: 'admin'
  });

  if (isLoading) return <div>Loading...</div>;
  return canActivate ? <div>Dashboard Content</div> : <div>Access Denied</div>;
}
```

## Development

This project uses:

- **pnpm** for package management
- **Turbo** for build orchestration
- **Changesets** for versioning and publishing

### Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run linting
pnpm run lint

# Run tests
pnpm run test

# Format code
pnpm run format
```

### Using Shared Configurations

#### ESLint Configuration

For React projects:

```json
{
  "extends": ["@teamboks/eslint-config/react"]
}
```

For Vue projects:

```json
{
  "extends": ["@teamboks/eslint-config/vue"]
}
```

For Svelte projects:

```json
{
  "extends": ["@teamboks/eslint-config/svelte"]
}
```

For Angular projects:

```json
{
  "extends": ["@teamboks/eslint-config/angular"]
}
```

#### TypeScript Configuration

For React projects:

```json
{
  "extends": "@teamboks/tsconfig/react.json"
}
```

#### Prettier Configuration

Add to your `package.json`:

```json
{
  "prettier": "@teamboks/prettier-config"
}
```

Or create a `.prettierrc.json`:

```json
@teamboks/prettier-config
```

### Adding New SDK Packages

When creating new SDK packages for other frameworks:

1. **Create the package directory**: `packages/[framework-name]/`

2. **Add dependency on core package**:
   ```json
   {
     "dependencies": {
       "@teamboks/core": "workspace:*"
     }
   }
   ```

3. **Add the shared configurations**:
   - ESLint: `{ "extends": ["@teamboks/eslint-config/[framework]"] }`
   - TypeScript: `{ "extends": "@teamboks/tsconfig/[framework].json" }`
   - Prettier: `"prettier": "@teamboks/prettier-config"`

4. **Install framework-specific dependencies** as needed

5. **Create framework-specific wrappers** around `@teamboks/core`:
   - Import business logic from `@teamboks/core`
   - Implement framework-specific patterns (hooks, composables, services, etc.)
   - Provide framework-optimized developer experience

6. **Follow the same build and test patterns** as the React package

### Example Framework Integration

```typescript
// Import core functionality
import { permissions } from '@teamboks/core';

// Create framework-specific wrapper
export function usePermission(params) {
  // Framework-specific reactive/state logic
  // Call core business logic: permissions.check(params)
  // Return framework-appropriate data structure
}
```

## License

MIT
