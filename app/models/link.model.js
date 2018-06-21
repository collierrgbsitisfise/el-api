const mongoose = require('mongoose');

const SchemaM = mongoose.Schema;
/* eslint-disable */
const linkRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
/* eslint-enable */

const linkSchema = new SchemaM({
  link: {
    type: String,
    validate: {
      validator: value => linkRegExp.test(value),
      message: 'Provided link is not valid',
    },
  },
  isExp: {
    type: Boolean,
    default: false,
  },
  shortLinkHash: {
    type: String,
  },
});

linkSchema.pre('save', function preSave(next) {
  /*eslint-disable */
  this.link = this.link.indexOf('//') === -1 ? `http://${this.link}` : this.link;
  this.shortLinkHash = this._id;
  /* eslint-enable */
  next(null);
});

const Link = mongoose.model('story', linkSchema);

module.exports = Link;
