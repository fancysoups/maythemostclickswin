import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userID: { type: String, index: true },
    banned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

let model;
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', schema);
}

module.exports = model;
