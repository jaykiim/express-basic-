const express = require('express');

const app = express();
app.use(express.json());
app.set('views', 'src/views');
app.set('view engine', 'pug');

const PORT = 5000;

const userRouter = require('./routers/user');

app.use('/users', userRouter);
app.use('/public', express.static('src/public'));

// 4개의 인자를 받는 경우에만 에러 핸들링 미들웨어로 취급
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

app.listen(PORT, () =>
  console.log(`The Express server is listening at port: ${PORT}`)
);
