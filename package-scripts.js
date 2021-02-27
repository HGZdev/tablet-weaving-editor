const {concurrent, getBin} = require('nps-utils')
const serverPath = 'src/_server/index.js'

let jestBin
try {
	jestBin = getBin('jest-cli', 'jest')
} catch {
	jestBin = 'pleaseInstallJest'
}

const PROD = 'NODE_ENV=production'
const TEST = 'NODE_ENV=test'

// const DEBUG = `DEBUG=\${DEBUG:-$_dbg}`
const DEBUG = `DEBUG=http,express,sqlite,sequelize:*`
const DEBUG_BABEL = `DEBUG=*,-babel*`
const DEBUG_ALL = `DEBUG=*`

module.exports = {
	scripts: {
		default: 'nps start', // heroku require default action in nps
		start: {
			default: `nps build`,
		},
		prod: {
			default: `${DEBUG} ${PROD} node --inspect ${serverPath}`,
			inspect: `${DEBUG_ALL} ${PROD} node --inspect ${serverPath}`,
		},
		dev: {
			default: concurrent.nps('server', 'client'),
			verbose: concurrent.nps('server.verbose', 'client'),
		},
		build: `${PROD} webpack --mode production`,
		client: `webpack serve --mode development --devtool inline-source-map --hot`,
		server: {
			default: `${DEBUG} nodemon --inspect ${serverPath}`,
			verbose: `${DEBUG_ALL} nodemon --inspect ${serverPath}`,
		},
		db: {
			init: `node_modules/.bin/sequelize init`,
			migration: {
				default: `node_modules/.bin/sequelize db:migrate`,
				prod: `${PROD} node_modules/.bin/sequelize db:migrate`,
				create: `node_modules/.bin/sequelize migration:create`,
			},
		},
		test: {
			default: concurrent.nps('test.lint', 'test.full'),
			watch: `jest --color --watch`,
			full: 'jest --coverage --color',
			lint: `eslint {src,plugins}/**/*.js{,x}`,
			inspect: {
				default: `${TEST} node --inspect ${jestBin} --runInBand --watch`,
				verbose: `${DEBUG_BABEL} ${TEST} node --inspect ${jestBin} --runInBand --watch`,
			},
		},
	},
}
