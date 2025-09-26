# Tablet Weaving Editor

A modern web application for designing tablet weaving patterns with an intuitive visual editor.

🌐 **Live Demo**: [https://hgzdev.github.io/tablet-weaving-editor/](https://hgzdev.github.io/tablet-weaving-editor/)

## Features

- **Visual Pattern Editor**: Interactive grid-based editor for designing tablet weaving patterns
- **Color Management**: Comprehensive color palette with custom color support
- **Pattern Gallery**: Browse and download community-created patterns
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Export/Import**: Save and load patterns in various formats
- **Real-time Preview**: See your pattern as you design it
- **Mobile-First Design**: Optimized for touch interactions on tablets and phones

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Testing**: Vitest, React Testing Library
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HGZdev/tablet-weaving-editor.git
cd tablet-weaving-editor
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
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
npm run deploy
```

### Deployment Configuration

- **Source**: GitHub Actions (configured in repository Settings → Pages)
- **Build Command**: `npm run build`
- **Test Command**: `npm run test:run`
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

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
5. Run tests (`npm run test:run`)
6. Run linting (`npm run lint`)
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
