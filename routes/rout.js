const express = require('express');
const Topic = require('./../models/topic');
const router = express.Router();

router.get('/category', (req, res) => {
  res.render('topic-categories', {
    coll: 'GOD',
    dc_title: 'Categories',
  });
});

router.get('/new', (req, res) => {
  res.render('new-topic', {
    topic: new Topic(),
    dc_title: 'New Topic'
  })
})

router.get('/:slug', async (req, res) => {
    const topic = await Topic.findOne({ slug: req.params.slug })
    if (topic == null) res.redirect('/')
    res.render('show', { 
        topic: topic,
        dc_title: topic.title
    })    
})

router.post('/', async (req, res, next) => {
    req.topic = new Topic();
    next();
  },
  saveTopicAndRedirect('new-topic')
);

router.put('/:id', async (req, res, next) => {
    req.topic = await Topic.findById(req.params.id);
    next();
  },
  saveTopicAndRedirect('edit')
);

router.delete('/:id', async (req, res) => {
  await Topic.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

function saveTopicAndRedirect(path) {
  return async (req, res) => {
    let topic = req.topic;
    topic.title = req.body.title;
    topic.category = req.body.category;
    topic.description = req.body.description;
    topic.markdown = req.body.markdown;
    try {
      topic = await topic.save();
      res.redirect(`/topics/${topic.slug}`);
    } catch (e) {
      res.send('asdsadasd')
    }
  };
}

module.exports = router;
