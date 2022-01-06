const express = require('express');
const router = express.Router();

const USERS = {
  15: { nickname: 'foo' },
  16: { nickname: 'bar' },
};

router.get('/', (req, res) => {
  res.send('User list');
});

router.param('id', async (req, res, next, value) => {
  try {
    const user = USERS[value];

    if (!user) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['html', 'json']);

  if (resMimeType === 'json') res.send(req.user);
  else if (resMimeType === 'html')
    res.render('user-profile', {
      nickname: req.user.nickname,
    });
  else res.status(401).send('The requested type is not supported.');
});

router.post('/', (req, res) => {
  // register user
  res.send('User registered');
});

router.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname": "bar"}
  req.user.nickname = req.body.nickname;
  res.send('User nickname updated');
});

module.exports = router;
