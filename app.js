var BEMPRIV = require('./common.blocks/server/server.bempriv');

var Emitter = require("events");
global.emitter = new Emitter();

global.rootPath = __dirname;

BEMPRIV.create('server');

global.emitter.emit('restart');
