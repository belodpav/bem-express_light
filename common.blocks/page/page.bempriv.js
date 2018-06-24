var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

module.exports = BEMPRIV.decl('page', {
  init: function() {
    const {data} = this.data;
    require('../body/body.bempriv');
    require('../../desktop.blocks/body/body.bempriv');
    require('../../common.blocks/footer/footer.bempriv');


    return {
      block: 'page',
      title:  data.title,
      mods: {said: 'index'},
      favicon: '/favicon.ico',
    styles: [
        {
            elem: 'css',
            url: 'index.min.css'
        },
        {
            elem: 'css',
            content: `
            html {
                font-size: 10px;
                font-family: Arial, Helvetica, sans-serif;
            }
            @media (min-width: 1200px) {
                html {
                    font-size: 13px;
                }
                }
                @media (min-width: 1400px) {
                html {
                    font-size: 16px;
                }
                }
                @media (min-width: 1800px) {
                html {
                    font-size: 22px;
                }
            }
            `
        }
    ],
    scripts: [
        {
            elem: 'js',
            url: 'index.min.js'
        }
    ],
    head: [
        { elem: 'meta', attrs: {name: 'robots', content: 'no-index'}},
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } }
    ],
      content: [{
          block: 'header',
        },
        BEMPRIV.json('body', data),
        BEMPRIV.json('footer', data)
      ]
    }
  }
});
