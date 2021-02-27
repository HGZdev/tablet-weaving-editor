// jest.config.js
module.exports = {
	verbose: true,
	moduleDirectories: ['node_modules', 'src', 'plugins'],
	moduleNameMapper: {
		'^src(.*)$': '<rootDir>/src/$1',
		'^config(.*)$': '<rootDir>/config/$1',
		'^plugins(.*)$': '<rootDir>/plugins/$1',
		'^data(.*)$': '<rootDir>/data/$1',
		'^assets(.*)$': '<rootDir>/assets/$1',
		'^Components(.*)$': '<rootDir>/src/client/Components/$1',
		'^Styles(.*)$': '<rootDir>/src/client/styles/$1',
	},
}
