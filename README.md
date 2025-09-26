# Tablet Weaving Editor

A modern web application for designing tablet weaving patterns with an intuitive visual editor.

## Features

- **Visual Pattern Editor**: Interactive grid-based editor for designing tablet weaving patterns
- **Color Management**: Comprehensive color palette with custom color support
- **Pattern Gallery**: Browse and download community-created patterns
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Export/Import**: Save and load patterns in various formats
- **Real-time Preview**: See your pattern as you design it

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context + Hooks

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tablet-weaving-editor2
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

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Editor/           # Pattern editor components
│   └── Layout/           # Layout components (nav, drawer)
├── pages/                # Route-based pages
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please:

- Check the Help page in the application
- Open an issue on GitHub
- Contact the development team

## Acknowledgments

- Inspired by traditional tablet weaving techniques
- Built with modern web technologies
- Community-driven pattern sharing
