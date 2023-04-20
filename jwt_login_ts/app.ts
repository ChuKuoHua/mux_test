import express from 'express';

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/front/user');
const adminRouter = require('./routes/admin/admin');
const { resAllError } = require('./middleware/resError');
const notFound = require('./service/notFound');
const session = require('express-session');
const app = express();

require('./connections');
require('./middleware/processError');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session
app.use(session({
  secret: 'keyTokeId',
  // 保存 session 值
  resave: true,
  // 無論有無 session cookie，每次請求都設置 session cookie
  // 默認為 connect.sid
  saveUninitialized: true,
  // 當 secure 為 true 時，cookie 在 HTTP 中是無效，在 HTTPS 中才有效
  cookie: ({ secure: false })
}));

app.use('/api/users', userRouter);
app.use('/admin', adminRouter)
// 檢查路由
app.use(notFound);

// 錯誤處理
app.use(resAllError);


module.exports = app;
