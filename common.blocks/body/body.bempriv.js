// var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

BEMPRIV.decl('body', {
  init: function() {
    const {data} = this;

    this.content([
      {
        block: 'link',
        content: data.view,
        url: 'hello',
        attrs: {
          fine: 'hello'
        }
      },
      {
        block: 'button',
        mods: {
            theme: 'islands',
            size: 'l',
            view: 'action'
        },
        text: 'Yandex'
      },
      {
        block: 'link',
        mods: {
            theme: 'islands',
            size: 'm'
        },
        url: 'https://bem.info/',
        content: 'bem.info'
      }
    ]);
  },
  _getText: function() {
    return 'Video';
  }
});