const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  tags: [
    {
      type: String,
      required: [true, '貼文標籤 tags 未填寫']
    }
  ],
  type: {
    type: String,
    enum: ['group', 'person'],
    required: [true, '貼文類型 type 未填寫']
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID 未填寫'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

const posts = mongoose.model('posts', postSchema)

module.exports = posts;