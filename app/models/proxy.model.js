const mongoose = require('mongoose');

const SchemaM = mongoose.Schema;

const proxySchema = new SchemaM({
  time: {
    type: String,
    default: new Date(),
  },
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Proxy = mongoose.model('story', proxySchema);

module.exports = Proxy;
