const { isUser } = require('../middleware/guard');
const { getPosts, getPostsById, getPostsByUser } = require('../services/post');
const { postViewModel } = require('../util/mapper');

const router = require('express').Router();


router.get('/' , isUser(), (req,res) => {
    res.render('home', {title: 'Home Page'});
})

router.get('/catalog' , async (req,res) => {
    const posts = (await getPosts()).map(postViewModel);
    res.render('catalog', {title: 'Catalog Page', posts});
})

router.get('/catalog/:id', async (req, res) => {
    const post = await getPostsById(req.params.id);
    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.hasAuthor = true;
            post.isVoted = post.votes.find( v => v._id == req.session.user._id) != undefined;
            
        }
    }
    res.render('details', { title: post.title, post});
})

router.get('/profile' , isUser(), async (req, res) => {
    const posts = await getPostsByUser(req.session.user._id);
    console.log(posts)
    res.render('profile', { title: 'Profile Page', posts});
})
module.exports = router;