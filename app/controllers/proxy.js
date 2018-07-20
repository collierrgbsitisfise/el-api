const Proxy = require('./../models/proxy.model');

module.exports.getAllProxy = async (req, res) => {
  try {
    const allProxies = await Proxy.find({}).exec();
    res.send(allProxies);
  } catch (err) {
    res.status(500).send(err);
  }
};
