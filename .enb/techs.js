const enbBemTechs = require('enb-bem-techs');
const levels = require('./levels');

const techs = {
  fileProvider: require('enb/techs/file-provider'),
  fileMerge: require('enb/techs/file-merge'),
  fileCopy: require('enb/techs/file-copy'),
  borschik: require('enb-borschik/techs/borschik'),
  postcss: require('enb-postcss/techs/enb-postcss'),
  postcssPlugins: [
      require('postcss-import')(),
      require('postcss-each'),
      require('postcss-for'),
      require('postcss-simple-vars')(),
      require('postcss-calc')(),
      require('postcss-nested'),
      require('rebem-css'),
      require('postcss-url')({ url: 'inline' }),
      require('autoprefixer')()
  ],
  browserJs: require('enb-js/techs/browser-js'),
  bemtree: require('enb-bemxjst/techs/bemtree'),
  bemhtml: require('enb-bemxjst/techs/bemhtml'),
  bempriv: require('enb-bempriv-js')
};

const isProd = process.env.YENV === 'production';


module.exports = {
  getCommonTechs,
  getPrivTechs
};

function getCommonTechs(bundlesName) {
  return [
      // essential
      [enbBemTechs.levels, { levels: levels[bundlesName] }],
      [techs.fileProvider, { target: '?.bemjson.js' }],
      [enbBemTechs.bemjsonToBemdecl],
      [enbBemTechs.deps],
      [enbBemTechs.files],

      // css
      [techs.postcss, {
          target: '?.css',
          oneOfSourceSuffixes: ['post.css', 'css'],
          plugins: techs.postcssPlugins
      }],

      // templates
      [techs.bemhtml, {
          sourceSuffixes: ['bemhtml', 'bemhtml.js'],
          forceBaseTemplates: true,
          engineOptions: { elemJsInstances: true }
      }],

      // client templates
      [enbBemTechs.depsByTechToBemdecl, {
          target: '?.tmpl.bemdecl.js',
          sourceTech: 'js',
          destTech: 'bemhtml'
      }],
      [enbBemTechs.deps, {
          target: '?.tmpl.deps.js',
          bemdeclFile: '?.tmpl.bemdecl.js'
      }],
      [enbBemTechs.files, {
          depsFile: '?.tmpl.deps.js',
          filesTarget: '?.tmpl.files',
          dirsTarget: '?.tmpl.dirs'
      }],
      [techs.bemhtml, {
          target: '?.browser.bemhtml.js',
          filesTarget: '?.tmpl.files',
          sourceSuffixes: ['bemhtml', 'bemhtml.js'],
          engineOptions: { elemJsInstances: true }
      }],

      // js
      [techs.browserJs, { includeYM: true }],
      [techs.fileMerge, {
          target: '?.js',
          sources: ['?.browser.js', '?.browser.bemhtml.js']
      }],

      // borschik
      [techs.borschik, { source: '?.js', target: '?.min.js', minify: isProd }],
      [techs.borschik, { source: '?.css', target: '?.min.css', minify: isProd }],

      [techs.fileCopy, { source: '?.min.js', target: `../../static/${bundlesName}-?.min.js` }],
      [techs.fileCopy, { source: '?.min.css', target: `../../static/${bundlesName}-?.min.css` }]
  ]
}

function getPrivTechs(bundlesName) {
  return [
      // essential
      [enbBemTechs.levels, { levels: levels[bundlesName] }],
      [techs.fileProvider, { target: '?.bemjson.js' }],
      [enbBemTechs.bemjsonToBemdecl],
      [enbBemTechs.deps],
      [enbBemTechs.files],
      // bempriv
      [techs.bempriv, 
        { privFile: './node_modules/bem-priv/build/lib/bempriv.js'}
      ]
  ];
}
