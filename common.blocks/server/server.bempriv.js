BEMPRIV.decl('server', {
    init: function() {
        const path = require('path');
        const express = require('express');
        const useragent = require('express-useragent');
        const app = express();
        const bodyParser = require('body-parser');
        const favicon = require('serve-favicon');
        const serveStatic = require('serve-static');
        const config = this._getConfig();
        const staticFolder = path.resolve(__dirname, '..', config.staticFolder);
        
        const render = BEMPRIV.create('server__render');
        
        const port = process.env.PORT || config.defaultPort;
        
        const isDev = process.env.NODE_ENV === 'development';
        global.bs = require('browser-sync');


        app
            .use(favicon(path.join(staticFolder, 'favicon.ico')))
            .use(serveStatic(staticFolder))
            .use(bodyParser.urlencoded({ extended: true }))
            .use(useragent.express());

        app.get('/ping/', function(req, res) {
            res.send('ok');
        });

        app.get('/', function(req, res) {
            render.render(req, res, {
                view: 'page-index',
                title: 'Main page',
                meta: {
                    description: 'Page description',
                    og: {
                        url: 'https://site.com',
                        siteName: 'Site name'
                    }
                }
            })
        });

        isDev && BEMPRIV.create('server__rebuild');

        app.get('*', function(req, res) {
            res.status(404);
            return render.render(req, res, { view: '404' });
        });

        app.listen(port, function() {
            isDev && global.bs({
                proxy: 'localhost:' + port,
                files: false,
                open: false
            });
            console.log('server is listening on', this.address().port);
        });

    },
    _getConfig: function() {
        return {
            staticFolder: '../static',
            defaultPort: 3000
        };   
    }
});

