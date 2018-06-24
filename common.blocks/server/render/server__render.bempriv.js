var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

module.exports = BEMPRIV.decl('server__render', {
    init: function () {
        this._helpers = {
            fs: require('fs'),
            path: require('path'),
            nodeEval: require('node-eval'),
        };
        const {path} = this._helpers;

        this._bundleName = 'index';
        this._pathToBundle = path.resolve(global.rootPath , 'desktop.bundles', this._bundleName);
        this._isDev = process.env.NODE_ENV === 'development';
        
    },
    render: function(req, res, data, context) {
        require('../../page/page.bempriv');
        const query = req.query;
        const isDev = this._isDev;
        let templates;

        if (isDev && query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');
    
        const dataCtx = {
            block: 'root',
            context: context,
            // extend with data needed for all routes
            data: Object.assign({}, data)
        };

        templates = this._getTemplates();
        
        let bemjson;
        
        try {
            bemjson = BEMPRIV.json('page', dataCtx);
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
    _getTemplates: function() {
        const {path} = this._helpers;
        return {
            // priv: this._evalFile(path.join(this._pathToBundle, this._bundleName + '.bempriv.js')),
            BEMHTML: this._evalFile(path.join(this._pathToBundle, this._bundleName + '.bemhtml.js')).BEMHTML
        };
    }

});