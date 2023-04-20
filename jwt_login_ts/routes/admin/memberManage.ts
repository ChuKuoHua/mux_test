import express from 'express';

const router = express.Router();
const handleErrorAsync = require('../../service/handleErrorAsync');
const userControllers = require('../../controllers/admin');
const {isAdmin} = require('../../middleware/admin');

// 全部會員資料
router.post('/users_list',isAdmin, handleErrorAsync(userControllers.usersList));
// 會員停用/啟用
router.post('/invalid_user', isAdmin, handleErrorAsync(userControllers.invalidUser));

module.exports = router;