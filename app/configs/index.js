/*eslint-disable */
const configs = {
  dev: {
    mongoConnectionUrl: "mongoconectionurl DEV"  
  },
  prod: {
    mongoConnectionUrl: "mongoconectionurl DEV"  
  },
};

module.exports = function getConfig(env) {
  
  if (!configs[env]) {
    console.log('Incorrect env!!!');
    console.log('by default will be used DEV env.')
    return configs.dev;
  }

  return configs[env];
}
