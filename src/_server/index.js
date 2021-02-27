// One of the ways you can use Babel is through the require hook. The require hook will bind itself to node's require and automatically compile files on the fly.
// allows to use 'import' in file
require('@babel/register')
require('./express.js')
