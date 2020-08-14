import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    tcoLink: { type: String, unique: true },
    tweetID: { type: String, unique: true, sparse: true },
    userID: { type: String, index: true },
    username: String,
    displayName: String,
    avatarURL: String,
    text: String,
    tweetTime: Date,
    active: { type: Boolean, default: false, index: true },
    deleted: { type: Boolean, default: false },
    hits: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

let model;
try {
  model = mongoose.model('Tweet');
} catch (error) {
  model = mongoose.model('Tweet', schema);
}

module.exports = model;
