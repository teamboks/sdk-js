# Changelog

## 3.0.0

### Major Changes

- Add users calls

## 2.0.0

### Major Changes

- 238bb22: Added useFeature() hook to do feature flags and introduced ProtectedRoute component

## 1.0.0

### Major Changes

- 13d7d07: Initial release of @teamboks/platform SDK

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-15

### Added

- Initial release
- Workspace management API client
  - `create()` - Create a new workspace
  - `findMany()` - Get all workspaces
  - `findUnique()` - Get a specific workspace by ID
  - `update()` - Update a workspace
  - `delete()` - Delete a workspace
- Type-safe TypeScript interfaces for all workspace operations
- Full test coverage for the client
