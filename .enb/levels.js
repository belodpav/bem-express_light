const commonLevels = [
  { path: 'node_modules/bem-core/common.blocks', check: false },
  { path: 'node_modules/bem-core/desktop.blocks', check: false },
  { path: 'node_modules/bem-components/common.blocks', check: false },
  { path: 'node_modules/bem-components/desktop.blocks', check: false },
  { path: 'node_modules/bem-components/design/common.blocks', check: false },
  { path: 'node_modules/bem-components/design/desktop.blocks', check: false },
  'common.blocks'
];

// Добовляем новые наборы уровней если необходимо
module.exports = {
  desktop: [...commonLevels, 'desktop.blocks'],
  touch: [...commonLevels, 'touch.blocks'],
  server: [...commonLevels]
};
