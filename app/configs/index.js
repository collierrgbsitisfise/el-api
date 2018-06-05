/*eslint-disable */
const configs = {
  dev: {
    mongoConnectionUrl: "mongodb://admin:ASASasas123!@#@ds247330.mlab.com:47330/easy-links-db"  
  },
  prod: {
    mongoConnectionUrl: "mongodb://admin:ASASasas123!@#@ds247330.mlab.com:47330/easy-links-db"  
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
