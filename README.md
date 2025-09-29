# Tablet Weaving Editor

A modern web application for designing tablet weaving patterns with an intuitive visual editor.

🌐 **Live Demo**: [https://hgzdev.github.io/tablet-weaving-editor/](https://hgzdev.github.io/tablet-weaving-editor/)

## What is Tablet Weaving?

Tablet weaving is a traditional craft where square cards (tablets) with holes are used to create woven bands. Each tablet can be rotated to create different thread patterns, allowing for complex geometric designs. This editor helps you visualize and plan these patterns before weaving.

## Features

- **Visual Pattern Editor**: Interactive grid-based editor for designing tablet weaving patterns
- **Color Management**: Comprehensive color palette with custom color support
- **Pattern Gallery**: Browse and download community-created patterns
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Export/Import**: Save and load patterns in various formats
- **Real-time Preview**: See your pattern as you design it
- **Mobile-First Design**: Optimized for touch interactions on tablets and phones
- **Multi-page Navigation**: Editor, Gallery, and Help sections
- **Accessibility**: Full keyboard navigation and screen reader support

## Technology Stack

### Core Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4 with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API with custom hooks

### UI & Styling

- **Component Library**: Custom components with Radix UI primitives
- **Icons**: Lucide React + React Icons
- **Styling Utilities**: Tailwind Merge, Class Variance Authority
- **CSS-in-JS**: Styled Components (legacy components)

### Forms & Validation

- **Form Management**: Formik
- **Validation**: Yup schema validation

### Development & Testing

- **Testing Framework**: Vitest with React Testing Library
- **Test Utilities**: MSW (Mock Service Worker), Jest DOM matchers
- **Linting**: ESLint with TypeScript and React rules
- **Type Safety**: Strict TypeScript configuration

### Data & State

- **GraphQL**: Apollo Client (for future API integration)
- **Utilities**: Lodash for data manipulation
- **State Persistence**: Local storage integration

### Deployment

- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Package Manager**: npm/pnpm support

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm (pnpm recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HGZdev/tablet-weaving-editor.git
cd tablet-weaving-editor
```

2. Install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

3. Start the development server:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Running Tests

```bash
# Run tests in watch mode
pnpm test
# or: npm test

# Run tests once
pnpm test:run
# or: npm run test:run

# Run tests with coverage
pnpm test:coverage
# or: npm run test:coverage

# Run tests with UI
pnpm test:ui
# or: npm run test:ui
```

### Building for Production

```bash
# Using pnpm (recommended)
pnpm build

# Or using npm
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
# Using pnpm
pnpm preview

# Or using npm
npm run preview
```

This will serve the built files at `http://localhost:4173` with the correct base path.

## GitHub Pages Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The live site is available at:
**https://hgzdev.github.io/tablet-weaving-editor/**

### Automatic Deployment

The deployment happens automatically when you push changes to the `master` branch:

1. **GitHub Actions Workflow**: Tests are run, then the app is built and deployed
2. **No manual intervention required**
3. **Deployment status**: Check the Actions tab in the GitHub repository

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Using pnpm
pnpm deploy

# Or using npm
npm run deploy
```

### Deployment Configuration

- **Source**: GitHub Actions (configured in repository Settings → Pages)
- **Build Command**: `pnpm build` or `npm run build`
- **Test Command**: `pnpm test:run` or `npm run test:run`
- **Publish Directory**: `./dist`
- **Base Path**: `/tablet-weaving-editor/`

## Project Structure

```
src/
├── domains/                 # Domain-based architecture
│   ├── editor/             # Pattern editor domain
│   │   ├── components/     # Editor-specific components
│   │   ├── context/        # Draft context provider
│   │   ├── pages/          # Editor pages
│   │   └── __tests__/      # Editor tests
│   ├── gallery/            # Pattern gallery domain
│   └── help/               # Help documentation domain
├── shared/                  # Shared components and utilities
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
├── styles/                  # Global styles
├── App.tsx                 # Main app component
└── main.tsx                # App entry point
```

## Usage

### Creating a Pattern

1. **Set Pattern Parameters**: Use the control panel to set the number of tablets, holes per tablet, and pattern length
2. **Select Colors**: Choose thread colors from the color palette
3. **Design Pattern**: Click on holes in the grid to assign colors
4. **Save Pattern**: Use the save button to store your pattern

### Pattern Design Tips

- Start with simple geometric patterns
- Use high contrast colors for bold effects
- Consider threading direction when designing
- Test patterns with small samples first

## Development

### Available Scripts

- `pnpm dev` / `npm run dev` - Start development server
- `pnpm build` / `npm run build` - Build for production
- `pnpm preview` / `npm run preview` - Preview production build
- `pnpm test` / `npm test` - Run tests in watch mode
- `pnpm test:run` / `npm run test:run` - Run tests once
- `pnpm test:coverage` / `npm run test:coverage` - Run tests with coverage
- `pnpm test:ui` / `npm run test:ui` - Run tests with UI
- `pnpm lint` / `npm run lint` - Run ESLint
- `pnpm deploy` / `npm run deploy` - Deploy to GitHub Pages

### Testing

The project uses Vitest and React Testing Library for testing:

- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **Test Coverage**: Aim for high coverage on critical paths
- **Test Files**: Located in `__tests__` directories

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React-specific rules
- **Prettier**: Code formatting (if configured)
- **Git Hooks**: Pre-commit checks (if configured)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Run tests (`pnpm test:run` or `npm run test:run`)
6. Run linting (`pnpm lint` or `npm run lint`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please:

- Check the Help page in the application
- Open an issue on [GitHub](https://github.com/HGZdev/tablet-weaving-editor/issues)
- Contact the development team

## Status

- ✅ **Tests**: All 63 tests passing
- ✅ **Deployment**: Automatic deployment to GitHub Pages
- ✅ **Build**: Production build working
- ✅ **Responsive**: Mobile and desktop optimized

## Acknowledgments

- Inspired by traditional tablet weaving techniques
- Built with modern web technologies (React, TypeScript, Tailwind CSS)
- Community-driven pattern sharing
- Open source and MIT licensed
