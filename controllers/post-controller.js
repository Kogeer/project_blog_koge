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
        const { title, content } = req.body

        //kiszedni a cookiet req.cookiesból
        if (!title || !content) {
            res.redirect('/newpost?error=miss');
            return;
        }

        const author = req.cookies.authcookie;
        Post.newPostAdd(title,content,author);

        res.redirect('/admin');
    }

    static newPostAdd(mainTitle,text,author) {
        const post = {};
        post.author = author;
        post.date = new Date().toLocaleString();
        post.postTitle = mainTitle;
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
        const {postid} = req.params;
        const post = await PostsDb.getOnePost(postid);
        res.render('onepost', {
            post:post,
            mainTitle:"of Motors"
        });
    }
}

module.exports = {
    Post: Post
}
