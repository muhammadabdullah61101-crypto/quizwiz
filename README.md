# Playwright Test Project

This project is set up with Playwright for end-to-end testing.

## Setup

Install dependencies:
```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests in headed mode (with visible browser):
```bash
npm run test:headed
```

Debug tests:
```bash
npm run test:debug
```

## Configuration

- **Test directory**: `tests/`
- **Config file**: `playwright.config.ts`
- **Base URL**: http://localhost:3000 (default, can be updated in config)

## Project Structure

- `tests/` - Your test files (*.spec.ts)
- `playwright.config.ts` - Playwright configuration
- `package.json` - Dependencies and scripts

## Learn More

- [Playwright Documentation](https://playwright.dev)
- [Getting Started Guide](https://playwright.dev/docs/intro)
