const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pkeySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  apikey: {
    type: String,
    required: true
  }
});

module.exports = pkey = mongoose.model('pkeys', pkeySchema);