BEMPRIV.decl('page', {
  init: function() {
    const {data} = this.data;

    return {
      block: 'page',
      title:  data.title,
      mods: {said: 'hello'},
      content: [{
          block: 'header',
        },
        BEMPRIV.json('body', data)
      ]
    }
  }
});
