# @teamboks/eslint-config

Shared ESLint configuration for Teamboks SDK packages.

## Installation

```bash
pnpm add -D @teamboks/eslint-config eslint typescript
```

## Usage

### Base Configuration

For basic TypeScript projects:

```json
{
  "extends": ["@teamboks/eslint-config"]
}
```

### Framework-specific Configurations

#### React

```json
{
  "extends": ["@teamboks/eslint-config/react"]
}
```

Additional dependencies needed:

```bash
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
```

#### Vue

```json
{
  "extends": ["@teamboks/eslint-config/vue"]
}
```

Additional dependencies needed:

```bash
pnpm add -D eslint-plugin-vue vue-eslint-parser
```

#### Svelte

```json
{
  "extends": ["@teamboks/eslint-config/svelte"]
}
```

Additional dependencies needed:

```bash
pnpm add -D eslint-plugin-svelte3
```

#### Angular

```json
{
  "extends": ["@teamboks/eslint-config/angular"]
}
```

Additional dependencies needed:

```bash
pnpm add -D @angular-eslint/eslint-plugin
```

## What's included

- TypeScript support with `@typescript-eslint`
- Prettier integration
- Framework-specific rules and configurations
- Common best practices for code quality

## Rules

The configuration includes sensible defaults for:

- TypeScript strict mode
- Unused variables detection
- Code style consistency
- Framework-specific best practices
