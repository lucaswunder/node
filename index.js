const express = require('express');
const nunjuks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

nunjuks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', UserAgeMiddleware, (req, res) => {
  let age = req.body.user.age;

  if (age > 1) {
    return 0;
  }

  res.render('main');
});

const UserAgeMiddleware = (req, res, next) => {
  console.log('teste');
  next();
};

app.listen(3000, () => {
  console.log('Started');
});
