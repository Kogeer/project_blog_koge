const PostsDb = require('../service/dbservice.js');

class Post {

    static id = 0;

    static newPostPage(req, res) {
        const { error } = req.query;
        
        res.render('newpost', {
            mainTitle: "of Motors",
            error: error
        });
    }

    static newPostPublish(req, res) {
        const { title, slug,content } = req.body
        
        if (!title || !content) {
            res.redirect('/newpost?error=miss');
            return;
        }
        
        //kiszedni a cookiet req.cookiesból
        const author = req.cookies.authcookie;
        Post.newPostAdd(title,content,author,slug);

        res.redirect('/admin');
    }

    static newPostAdd(mainTitle,text,author,slug) {
        const post = {};
        post.author = author;
        post.date = new Date().toLocaleString();
        post.postTitle = mainTitle;
        post.slug = slug;
        post.content = text;

        PostsDb.createDataBase();
        PostsDb.newPostDb(post);

        return true;
    }

    static async getPostsDb() {
        const posts = await PostsDb.getPostsDb();
        return posts;
    }

    static async getOnePost(req,res) {
        const {postparam} = req.params;
        const post = await PostsDb.getOnePost(postparam);
        
        res.render('onepost', {
            post:post,
            mainTitle:"of Motors"
        });
    }

    static async adminPostList(req,res) {
        const posts = await Post.getPostsDb();
        res.render('adminposts', {
            posts:posts,
            mainTitle:"of Motors"
        })
    }

    static async editPost(req,res) {
        const {postid} = req.params;
        const post = await PostsDb.getOnePost(postid);

        res.render('editpost', {
            post:post,
            mainTitle: "of Motors"
        })
    }

    static updatePost(req,res) {
        const {postid} = req.params;
        const {title,slug,content} = req.body;
        // console.log(typeof +postid,title,slug,content);

        PostsDb.updatePost(+postid,title,slug,content);

        res.redirect('/admin-posts-list');
    }
}

module.exports = {
    Post: Post
}
