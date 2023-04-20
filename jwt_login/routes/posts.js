const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../service/handleErrorAsync');
const PostsControllers = require('../controllers/posts');
const {isAuth} = require('../middleware/auth');

// 觀看所有動態
router.get('/', handleErrorAsync(PostsControllers.getPosts));
// 張貼個人動態
router.post('/', isAuth, handleErrorAsync(PostsControllers.createPost));
// 刪除個人動態
router.delete('/', isAuth, handleErrorAsync(PostsControllers.deleteOnePost));
// 修改個人動態
router.patch('/', isAuth, handleErrorAsync(PostsControllers.editPost));

module.exports = router;