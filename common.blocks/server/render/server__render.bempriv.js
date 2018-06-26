// var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

BEMPRIV.decl('server__render', {
    init: function () {
        this._helpers = {
            fs: require('fs'),
            path: require('path'),
            nodeEval: require('node-eval'),
        };
        const {path} = this._helpers;

        this._bundleName = 'index';
        this._isDev = process.env.NODE_ENV === 'development';
        
    },
    render: function(req, res, data, context) {
        // require('../../page/page.bempriv');
        const query = req.query;
        const isDev = this._isDev;
        let templates;

        if (isDev && query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');
    
        

        function getBundlesName(useragent) {
            if (useragent.isDesktop) {
                return 'desktop';
            }
            if (useragent.isMobile) {
                return 'touch';
            }
        }

        const bundlesName = getBundlesName(req.useragent);

        const dataCtx = {
            block: 'root',
            context: context,
            bundlesName, 
            // extend with data needed for all routes
            data: Object.assign({}, data)
        };

        templates = this._getTemplates(bundlesName, this._bundleName); // bundleName настроить!!!
        
        let bemjson;
        
        try {
            bemjson = templates.priv.json('page', dataCtx);
        } catch(err) {
            console.error('PRIV error', err.stack);
            console.trace('server stack');
            return res.sendStatus(500);
        }
    
        if (isDev && query.bemjson) {
            return res
                .send(`<pre>${JSON.stringify(bemjson, null, 4)}</pre>`);
        }
        
        let html;
    
        try {
            html = templates.BEMHTML.apply(bemjson);
        } catch(err) {
            console.error('BEMHTML error', err.stack);
            return res.sendStatus(500);
        }
    
        res.send(html);
    },
    _evalFile: function(filename) {
        const {nodeEval, fs} = this._helpers;

        return nodeEval(fs.readFileSync(filename, 'utf8'), filename);
    },
    _getTemplates: function(bundlesName, bundleName) {
        const {path} = this._helpers;
        const pathToBundle = path.resolve(global.rootPath , `${bundlesName}.bundles`, bundleName);
         
        return {
            priv: this._evalFile(path.join(pathToBundle, bundleName + '.bempriv.js')),
            BEMHTML: this._evalFile(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML
        };
    }

});