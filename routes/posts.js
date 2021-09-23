const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post')

// Display form to create new articles
router.get('/add', (req, res) => {
    res.render('posts/add');
})

// Display all articles
router.get('/', async(req, res) => {
    const posts = await Post.find().lean().sort({date: -1})
    res.render('posts/index', {posts})
})

// Create new post
router.post('/', async(req, res)=> {
    const {title, text} = req.body;
    let errors = [];
    if(!title) errors.push({msg: 'Title required'});
    if(!text) errors.push({msg: 'Text required'});
    if(errors.length > 0) res.render('post/add', {title, text})
    else {
        const newPostData = {
            title: title,
            text: text
        }
        const newPost = new Post(newPostData);
        await newPost.save();
        res.redirect('/posts');
    }
})

// Display form to edit articles
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id}).lean();
    res.render('posts/edit', {post})
})

// Save data to database
router.put('/:id', async(req, res) => {
    const {title, text} = req.body;
    await Post.findOneAndUpdate({_id: req.params.id}, {title, text});
    res.redirect('/posts');
})

// Delete article
router.delete('/:id', async(req, res) => {
    await Post.findByIdAndDelete({_id: req.params.id});
    res.redirect('/posts');
})

module.exports = router