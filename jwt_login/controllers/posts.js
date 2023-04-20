const successHandle = require('../service/successHandle');
const appError = require('../service/appError');
const Post = require('../models/posts')
const User = require('../models/users')
const posts = {
  // 查詢資料
  async getPosts(req, res) {
    // asc 遞增(由小到大，由舊到新) createdAt ; 
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? new RegExp(req.query.q)
    : {};
    // 模糊搜尋多欄位
    const data = await Post.find({
      $or: [
        { type: {$in: [q] } },
        { content: { $regex: q } },
      ]
    }).populate({
      path: "user",
      select: "name photo"
    }).sort(timeSort)

    successHandle(res, data);
  },
  // 建立動態
  async createPost(req, res, next) {
    const { tags, type, content, image } = req.body;

    if(!content) {
      return next(appError("400","請輸入內容",next));
    }

    const newPost = await Post.create({
      user: req.user.id,
      tags: tags,
      type: type,
      content: content,
      image: image
    })
    successHandle(res, newPost)
  },
  // 刪除動態資料
  async deleteOnePost (req, res, next) {
    const id = req.body.id;
    const postCheck = await Post.findOne({
      "_id": id,
      "user": req.user.id
    })
    if(!postCheck) {
      return appError("400","無此動態",next);
    }
    await Post.findByIdAndDelete(id)
    successHandle(res, '此動態已刪除')
  },
  // 編輯動態資料
  async editPost (req, res, next) {
    const { id, content, image } = req.body;
    const postCheck = await Post.findOne({
      "_id": id,
      "user": req.user.id
    })

    if(!postCheck) {
      return next(appError("400","無此動態",next));
    }

    if(!content) {
      return next(appError("400","請輸入內容",next));
    }

    await Post.findByIdAndUpdate(id, {
      $set: {
        content: content,
        image: image
      }
    })
    successHandle(res, '修改成功')
  },
}

module.exports = posts;