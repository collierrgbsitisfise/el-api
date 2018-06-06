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

    // check if this link was't saved in db already
    const findLink = await Link.findOne({
      link,
    });

    if (findLink) {
      res.send(findLink);
      return;
    }

    const shortLink = new Link({
      link,
    });

    const result = await shortLink.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
