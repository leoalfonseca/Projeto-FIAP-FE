# @codgital/module-account-types Development Guide

## Commands
- Build: `yarn build` (removes lib/ and rebuilds with TypeScript)
- Watch mode: `yarn watch` (TypeScript watch mode)
- Lint: `yarn lint` (lints all files)
- Lint fix: `yarn lint:fix` (auto-fixes lint issues)
- Format: `yarn format` (prettier formatting)

## Code Style Guidelines
- **Imports**: Group imports: external, builtin, internal - alphabetized and with newlines between groups
- **Formatting**: Uses Prettier with 100 char line length, 2 space tabs, single quotes, no trailing comma
- **Types**: Class-based with decorators (@Describe for documentation/API properties)
- **Naming**: PascalCase for classes/interfaces, camelCase for variables/methods, UPPER_CASE for enums
- **DTOs**: Use class-validator decorators (@IsString, @IsEmail, etc.) and class-transformer (@Expose, @Transform)
- **Error Handling**: Validate input via class-validator, provide descriptive error messages
- **Comments**: Minimal comments, self-documenting code preferred with @Describe for API properties

This package builds TypeScript declaration files.