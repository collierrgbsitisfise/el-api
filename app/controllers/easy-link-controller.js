const url = require('url');
const Link = require('./../models/link.model');

module.exports.getEasyLink = async (req, res) => {
  try {
    const {
      query,
    } = url.parse(req.url, true);

    const {
      link,
    } = query;

    const shortLink = new Link({
      link,
    });

    const result = await shortLink.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
