const fs = require('fs');
const path = require('path');
const nodeEval = require('node-eval');

const bundleName = 'index';
const pathToBundle = path.resolve(__dirname, '..', 'desktop.bundles', bundleName);

const isDev = process.env.NODE_ENV === 'development';

// const BEMPRIV = require('../node_modules/bem-priv/build/lib/bempriv.js');

// console.log(BEMPRIV);

let templates = getTemplates();


function render(req, res, data, context) {
    const query = req.query;

    if (isDev && query.json) return res.send('<pre>' + JSON.stringify(data, null, 4) + '</pre>');

    const dataCtx = {
        block: 'root',
        context: context,
        // extend with data needed for all routes
        data: Object.assign({}, data)
    };

    if (isDev) templates = getTemplates();

    let bemjson;

    try {
        // console.log(templates.priv);
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
}

function evalFile(filename) {
    return nodeEval(fs.readFileSync(filename, 'utf8'), filename);
}

function getTemplates() {
    return {
        priv: evalFile(path.join(pathToBundle, bundleName + '.bempriv.js')),
        BEMHTML: evalFile(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML
    };
}

module.exports = {
    render: render,
};
