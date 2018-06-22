BEMPRIV.decl('body', {
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
          view: 'action'
        },
        text: 'hey ' + this._getText()
      }
    ]);
  }
});