# Teamboks JavaScript SDK

A monorepo containing JavaScript/TypeScript SDKs for Teamboks permission management across different frameworks.

## Packages

### SDK Packages

- `@teamboks/react` - React SDK for permission management
- `@teamboks/vue` - Vue SDK for permission management (coming soon)
- `@teamboks/svelte` - Svelte SDK for permission management (coming soon)
- `@teamboks/angular` - Angular SDK for permission management (coming soon)

### Shared Configuration Packages

- `@teamboks/eslint-config` - Shared ESLint configuration for all SDK packages
- `@teamboks/prettier-config` - Shared Prettier configuration for all SDK packages
- `@teamboks/tsconfig` - Shared TypeScript configurations for all SDK packages

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

1. Create the package directory: `packages/[framework-name]/`
2. Add the shared configurations:
   - ESLint: `{ "extends": ["@teamboks/eslint-config/[framework]"] }`
   - TypeScript: `{ "extends": "@teamboks/tsconfig/[framework].json" }`
   - Prettier: `"prettier": "@teamboks/prettier-config"`
3. Install framework-specific dependencies as needed
4. Follow the same build and test patterns as the React package

## License

MIT
