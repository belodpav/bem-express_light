var BEMPRIV = require('bem-priv/build/lib/bempriv.js');

module.exports = BEMPRIV.decl('footer', {
  init: function() {

    this.content([
      {
        block: 'section',
        content: '=== FРУДДЩ ==='
      }
    ]);
  }
});