const BEMPRIV = require('./server.bundles/index/index.bempriv');
const Emitter = require('events');

global.rootPath = __dirname;
global.emitter = new Emitter();

BEMPRIV.create('server');

global.emitter.emit('restart');

