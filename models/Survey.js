const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date, // Record the last time someone responded
});

mongoose.model('surveys', surveySchema);
