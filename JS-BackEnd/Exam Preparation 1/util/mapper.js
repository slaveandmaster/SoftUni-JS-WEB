function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(e => ({ msg: e.message}));
    } else if(typeof error.message == 'string') {
        return [{ msg: error.message}];
    } else {
        return [{ msg: 'Request error'}];

    }



}
function postViewModel(post) {
    return {
        _id: post._id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        description: post.description,
        author: post.author,
        vote: post.votes,
        rating: post.rating
    }
}
module.exports =  {
    mapError,
    postViewModel
};