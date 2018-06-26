// var BEMPRIV = require('bem-priv/build/lib/bempriv.js');
// require('../body/body.bempriv');
// require('../../desktop.blocks/body/body.bempriv');
// require('../../common.blocks/footer/footer.bempriv');

BEMPRIV.decl('page', {
  init: function() {
    const {data} = this.data;
    const {bundlesName} = this.data;


    return {
      block: 'page',
      title:  data.title,
      mods: {said: 'index'},
      favicon: '/favicon.ico',
    styles: [
        {
            elem: 'css',
            url: bundlesName + '-index.min.css'
        }
    ],
    scripts: [
        {
            elem: 'js',
            url: bundlesName + '-index.min.js'
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
