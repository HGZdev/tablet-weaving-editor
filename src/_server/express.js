import {OUT_DIR, LOCAL_SERVER_PORT, APP_ICON_PATH} from '../../config'
import express from 'express'
import os from 'os'
import path from 'path'
import apolloServer from '../../plugins/apollo/ApolloServer'
import {sequelizeDbSync} from '../../plugins/sequelize'
import favicon from 'serve-favicon'
import debug from 'debug'
import db from './database'

const expressDbg = debug('express')

const {PORT = LOCAL_SERVER_PORT, PWD: ABSOLUTE_PATH} = process.env

const app = express()

const serveFavIcon = app =>
	app.use(favicon(path.join(ABSOLUTE_PATH, APP_ICON_PATH)))
const serveStatic = app =>
	app.use(express.static(path.join(ABSOLUTE_PATH, OUT_DIR)))

// sequelize: create / update / drop the database
sequelizeDbSync(db)
// define favicon path
serveFavIcon(app)
// load static assets
serveStatic(app)

// get user name for 'hello <name>' at home page (fetching test)
app.get('/api/getUsername', (req, res) =>
	res.send({username: os.userInfo().username})
)

// redirects all url to one public root './build/index.html', so React Router can control it on client-site
app.get('*', (req, res) => {
	res.sendFile(path.join(ABSOLUTE_PATH, OUT_DIR, 'index.html'))
})

apolloServer(app)

// eslint-disable-next-line no-console
app.listen(PORT, () => {
	expressDbg(`Listening on port ${PORT}!`)
})

// TEST: node --inspect src/_server/index.js
