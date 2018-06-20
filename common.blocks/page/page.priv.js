blocks.declare('page', function(data) {
  return {
    block: 'page',
    title: data.data.title,
    content: [
      {
        block: 'header'
      },
      blocks.get('body')(data.data),
      {
        block: 'footer'
      }
    ]
  }
});