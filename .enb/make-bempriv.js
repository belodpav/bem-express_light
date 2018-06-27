const {getPrivTechs} = require('./techs');


const isProd = process.env.YENV === 'production';
// isProd || levels.push('development.blocks');

module.exports = function(config) {
  config.nodes('*.bundles/*', function(nodeConfig) {
      const bundlesName = nodeConfig._path.split('.bundles')[0];
      nodeConfig.addTechs(getPrivTechs(bundlesName));

      nodeConfig.addTargets(['?.bempriv.js']);
  });
};