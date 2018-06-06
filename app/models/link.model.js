const mongoose = require('mongoose');

const SchemaM = mongoose.Schema;
const linkRegExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;


const linkSchema = new SchemaM({
  link: {
    type: String,
    validate: {
      validator: value => linkRegExp.test(value),
      message: 'Provided link is not valid',
    },
  },
  shortLinkHash: {
    type: String,
  },
});

linkSchema.pre('save', function preSave(next) {
  this.shortLinkHash = Buffer.from(String(Date.now()) + Math.random()).toString('base64');
  next(null);
});

const Link = mongoose.model('story', linkSchema);

module.exports = Link;
