# @codgital/module-account-types

A TypeScript library providing shared type definitions for the Account module.

## Overview

This package contains DTOs, entities, and enums used across multiple services in the Account module. It enables strong typing and validation across the codebase, ensuring consistency between services.

## Installation

```bash
# Using yarn
yarn add @codgital/module-account-types

# Using npm
npm install @codgital/module-account-types
```

## Dependencies

This package has the following peer dependencies:
- `class-transformer`: For transforming plain objects to class instances
- `class-validator`: For input validation

## Usage

### Importing Types

```typescript
// Import specific types
import { CreateAdminDto, Admin, UserTypeEnum } from '@codgital/module-account-types';

// Or import from specific features
import { CreateAdminDto } from '@codgital/module-account-types/features/admins';
```

### Using DTOs for Validation

```typescript
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAdminDto } from '@codgital/module-account-types';

// Convert plain object to DTO
const createAdminDto = plainToClass(CreateAdminDto, {
  id: '123e4567-e89b-12d3-a456-426614174000',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1234567890',
  document: '123456789',
  type: 'ADMINISTRATOR'
});

// Validate the DTO
validate(createAdminDto).then(errors => {
  if (errors.length > 0) {
    console.log('Validation failed');
    console.log(errors);
  } else {
    console.log('Validation successful');
  }
});
```

### Using the Describe Decorator

This library includes a custom `@Describe` decorator for generating API documentation:

```typescript
import { Describe, configureSharedApiProperty } from '@codgital/module-account-types';

// Configure with your framework's decorator (NestJS example)
import { ApiProperty } from '@nestjs/swagger';
configureSharedApiProperty(ApiProperty);

// Now you can use @Describe in your own classes
class YourEntity {
  @Describe({ description: 'Unique identifier' })
  id: string;

  @Describe({ description: 'User name', required: true })
  name: string;
}
```

## Features

The package is organized into feature modules:

- **admins**: Admin user types, DTOs, and entities
- **access**: Access control and authentication types

## Available Types

### Admin Types

- `Admin`: Base admin user entity
- `AdminWithProfiles`: Admin with associated profiles
- `CreateAdminDto`: DTO for creating admin users
- `UpdateAdminDto`: DTO for updating admin users
- `UserTypeEnum`: Enum for user types (ADMINISTRATOR, OPERATOR, etc.)

### Access Types

- `AccessSimple`: Simple access entity
- `RecoveryAccessDto`: DTO for password recovery

## Development

### Setup

```bash
# Install dependencies
yarn install
```

### Commands

```bash
# Build the library
yarn build

# Watch mode during development
yarn watch

# Run linter
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format
```

### Release Process

This package uses semantic versioning. To release:

```bash
# Patch release (bug fixes)
yarn release:patch

# Minor release (new features, backward compatible)
yarn release:minor

# Major release (breaking changes)
yarn release:major

# Pre-releases
yarn release:prerelease
yarn release:beta:patch
```

## Contributing

1. Follow the code style guidelines in CLAUDE.md
2. Add/update types as needed
3. Include appropriate class-validator decorators for DTOs
4. Use the @Describe decorator for all properties
5. Update the CHANGELOG.md file when making changes

## License

UNLICENSED - Private package