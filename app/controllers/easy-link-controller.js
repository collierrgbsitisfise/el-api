const url = require('url');
const Link = require('./../models/link.model');
const path = require('path');

module.exports.createEasyLink = async (req, res) => {
  try {
    const {
      query,
    } = url.parse(req.url, true);

    const {
      link,
      privateOnly,
    } = query;

    // check if this link was't saved in db already
    // const findLink = await Link.findOne({
    //   link,
    // });

    // if (findLink) {
    //   res.send(findLink);
    //   return;
    // }

    const shortLink = new Link({
      link,
      privateOnly,
    });

    const result = await shortLink.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.getEasyLink = async (req, res) => {
  try {
    const {
      hash,
    } = req.params;

    const result = await Link.findOne({
      shortLinkHash: hash,
    });

    if (!result) {
      res.status(404).send(`invalid hash: ${hash}`);
      return;
    }

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.redirectEasyLinkByHash = async (req, res) => {
  try {
    const {
      hash,
    } = req.params;

    const result = await Link.findOne({
      shortLinkHash: hash,
    });

    if (!result) {
      res.sendFile(path.join(__dirname, './../templates/invalid-hash.html'));
      return;
    }

    res.redirect(301, result.link);
  } catch (err) {
    res.status(500).send(err);
  }
};
