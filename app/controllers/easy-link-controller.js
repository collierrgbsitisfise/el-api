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
      onceAvailable,
    } = query;
    // check if this link was't saved in db already
    const findLink = await Link.findOne({
      link,
      privateOnly,
      onceAvailable,
    });

    if (findLink) {
      res.send(findLink);
      return;
    }

    const shortLink = new Link({
      link,
      privateOnly,
      onceAvailable,
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
      query,
    } = url.parse(req.url, true);

    const {
      ignorePrivate,
    } = query;

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

    if (result.privateOnly && !ignorePrivate) {
      res.status(404).send('Private Link');
      return;
    }

    if (result.onceAvailable) {
      await Link.remove({
        /*eslint-disable */
        _id: result._id,
        /* eslint-enable */
      }).exec();
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

    if (result.privateOnly) {
      res.sendFile(path.join(__dirname, './../templates/private-link-redirect.html'));
      return;
    }

    if (result.onceAvailable) {
      await Link.remove({
        /*eslint-disable */
        _id: result._id,
        /* eslint-enable */
      }).exec();
    }

    res.redirect(301, result.link);
  } catch (err) {
    res.status(500).send(err);
  }
};
