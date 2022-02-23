const { isUser } = require('../middleware/guard');
const { createPost, getPostsById, updatePost, deletePost, vote } = require('../services/post');
const {mapError} = require('../util/mapper');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create new Record'});
})

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId
    }
    try {
        await createPost(post)
        res.redirect('/catalog');
    } catch (error) {
        
        const errors = mapError(error);
        res.render('create', { title: 'Create new Post', errors, data: post});
    }
})

router.get('/edit/:id', isUser(), async (req, res) => {
        const post = await getPostsById(req.params.id);

        if (req.session.user._id != post.author._id) {
            res.redirect('/login');
        }
        res.render('edit', {title: post.title, post})
})

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const exisiting = await getPostsById(id);
    console.log(exisiting);
    if (req.session.user._id != exisiting.author._id) {
        res.redirect('/login');
    }
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        
    }
    try {
        await updatePost(id, post);
        res.redirect('/catalog/' + id);
    } catch (error) {
        const errors = mapError(error);
        post._id = id;
        res.render('edit', { title: post.title, post, errors});
    }
     
})

router.get('/delete/:id' ,isUser(), async (req,res)=> {
    const id = req.params.id;
    const exisiting = await getPostsById(id);
    if (req.session.user._id != exisiting.author._id) {
        res.redirect('/login');
    }
    try {
        await deletePost(id);
        res.redirect('/catalog');
    } catch (error) {
        const errors = mapError(error);
        res.render('details' + id, { title: exisiting.title , errors});
    }
})
router.get('/vote/:id/:type', isUser(), async (req, res)=>{
    const id = req.params.id;
    const value = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(req.params.id, req.session.user._id, value);
        res.redirect('/catalog/' + id);
    } catch (error) {
        const errors = mapError(error);
        res.render('details' + id, { title: 'Post Details' , errors});
    }


})
module.exports = router;