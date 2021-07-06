const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Topic = require('./models/topic')
const port = 1223
const methodOverride = require('method-override')

mongoose.connect('mongodb+srv://Liviu:sept2003@cluster--1.5nsas.mongodb.net/DailyBibl', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
  const topics = await Topic.find().sort({ createdAt: 'desc' })
  res.render('index', { topics: topics })
})

app.use('/topics', require('./routes/rout'))

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app