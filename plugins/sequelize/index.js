'use strict'
/* eslint-disable camelcase */
import {readdirSync} from 'fs'
import path from 'path'
import Sequelize, {DataTypes} from 'sequelize'
import configOrg from '../../config/sequelize.js'
import debug from 'debug'
const sequelizeDbg = debug('sequelize')

const {NODE_ENV, FORCE_DROP_DB_ON_INIT} = process.env
const PROD = NODE_ENV === 'production'
const config = configOrg[NODE_ENV || 'development']

export const sequelizeDbSync = db => {
	try {
		// sync: resync db schema
		// force: true will drop the database if it already exists (DEV only)
		db.sequelize.sync({force: FORCE_DROP_DB_ON_INIT || !PROD})
		sequelizeDbg(`DB: ${PROD ? 'dropped and' : ''} resync.`)
		// initial() // create initial values for tables
	} catch (err) {
		throw new Error(err)
	}
}

export const initDb = ({__filename, __dirname}) => {
	const db = {}
	const basename = path.basename(__filename)
	const {use_env_variable, database, username, password} = config

	// init db config
	const sequelize = use_env_variable
		? new Sequelize(process.env[use_env_variable], config)
		: new Sequelize(database, username, password, config)

	// attach models to db (from the folder)
	readdirSync(__dirname)
		.filter(file => {
			return (
				file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
			)
		})
		.forEach(file => {
			const model = require(path.join(__dirname, file))(sequelize, DataTypes)
			db[model.name] = model
		})

	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db)
		}
	})

	db.sequelize = sequelize
	db.Sequelize = Sequelize

	return db
}
