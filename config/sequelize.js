module.exports = {
	development: {
		dialect: 'sqlite',
		storage: './data/dev.sqlite.db',
	},
	production: {
		dialect: 'sqlite',
		storage: './data/prod.sqlite.db',
	},
	test: {
		dialect: 'sqlite',
		storage: './data/test.sqlite.db',
	},
}
