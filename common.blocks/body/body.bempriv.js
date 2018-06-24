var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

module.exports = BEMPRIV.decl('body', {
  init: function() {
    const {data} = this;

    this.content([
      {
        block: 'link',
        content: data.view
      },
      {
        block: 'button',
        mods: {
          theme: 'islands',
          size: 'm',
          view: 'attention'
        },
        text: 'Go'
      }
    ]);
  },
  _getText: function() {
    return 'Video';
  }
});