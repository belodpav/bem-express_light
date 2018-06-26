var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

module.exports =  BEMPRIV.decl('server__rebuild', {
  init: function() {
    const fs = require('fs');
    const path = require('path');
    const _ = require('lodash');
    const enb = require('enb');
    const make = enb.make;
    const watch = require('chokidar').watch;

    const rootDir = global.rootPath;
    const watchOpts = {
        persistent: true,
        ignoreInitial: true,
        ignored: '**/.DS_Store'
    };

    // get bundles list
    const bundlesDir = path.join(rootDir, 'desktop.bundles');
    const bundles = fs.readdirSync(bundlesDir).filter(function(file) {
        return fs.statSync(path.join(bundlesDir, file)).isDirectory();
    });

    // enb make
    function rebuild(event, file) {
        console.log(file);
        //console.time('Rebuild: ' + file);
        return make()
            .then(function() {
                console.timeEnd('Rebuild: ' + file);
            })
            .fail(function(err) {
                console.log('hey'); 
                console.error(err);
            });
    }

    const debouncedRebuild = _.debounce(rebuild, 30, { leading: true, trailing: true });

    // Запускаем сборку 
    // process.env.NO_AUTOMAKE || watch([
    //     path.join(rootDir, '*.blocks', '**'),
    // ], watchOpts).on('all', debouncedRebuild);


    // livereload
    process.env.NO_LIVERELOAD || watch([
        path.join(rootDir, 'static', '*.min.*'),
    ].concat(bundles.map(function(bundle) {
        return path.join(bundlesDir, bundle, bundle + '.bemhtml.js');
    })), watchOpts).on('all', function(event, file) {
        global.bs.reload(file);
    });
    
    // Перезагружаем страницу в браузере по событию restart
    global.emitter.on('restart', function() {
        global.bs.reload();
    })
  }
})