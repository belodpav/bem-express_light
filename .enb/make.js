const {getCommonTechs, getPrivTechs} = require('./techs');


const isProd = process.env.YENV === 'production';
// isProd || levels.push('development.blocks');

module.exports = function(config) {
  config.nodes('*.bundles/*', function(nodeConfig) {
      const bundlesName = nodeConfig._path.split('.bundles')[0];

      if (bundlesName === 'server') {
        
        nodeConfig.addTechs(getPrivTechs(bundlesName));
      
        nodeConfig.addTargets([
          '?.bempriv.js',
        ]);

      } else {
        nodeConfig.addTechs(getCommonTechs(bundlesName));
        
        nodeConfig.addTargets([
          '?.bemhtml.js', 
          `../../static/${bundlesName}-?.min.js`,
          `../../static/${bundlesName}-?.min.css`
        ]);
      }
  });
};