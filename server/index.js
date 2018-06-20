const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');

const config = require('./config');
const staticFolder = path.resolve(__dirname, '..', config.staticFolder);

const render = require('./render').render;

const port = process.env.PORT || config.defaultPort;

const isDev = process.env.NODE_ENV === 'development';


app
    .use(favicon(path.join(staticFolder, 'favicon.ico')))
    .use(serveStatic(staticFolder))
    .use(bodyParser.urlencoded({ extended: true }))

app.get('/ping/', function(req, res) {
    res.send('ok');
});

app.get('/', function(req, res) {
    render(req, res, {
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

isDev && require('./rebuild')(app);

app.get('*', function(req, res) {
    res.status(404);
    return render(req, res, { view: '404' });
});


app.listen(port, function() {
    console.log('server is listening on', this.address().port);
});
