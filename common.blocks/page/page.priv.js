blocks.decl('page', (data) => {

  if (data.data.view === '404') {
    return blocks.exec('page_view_404');
  }

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