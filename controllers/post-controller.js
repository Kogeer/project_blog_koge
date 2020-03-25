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
        const { title, slug, content } = req.body

        if (!title || !content) {
            res.redirect('/newpost?error=miss');
            return;
        }

        //kiszedni a cookiet req.cookiesból
        const author = req.cookies.authcookie;
        Post.newPostAdd(title, content, author, slug);

        res.redirect('/admin');
    }

    static async newPostAdd(mainTitle, text, author, slug) {
        const post = {};
        post.author = author;
        post.date = new Date().toLocaleString();
        post.postTitle = mainTitle;
        post.slug = slug;
        post.content = text;
        post.pub = 1;

        PostsDb.newPostDb(post);
        return true;
    }

    static async getPostsDb() {
        const posts = await PostsDb.getPostsDb();
        return posts;
    }

    static async getOnePost(req, res) {
        const { postparam } = req.params;
        const post = await PostsDb.getOnePost(postparam);

        res.render('onepost', {
            post: post,
            mainTitle: "of Motors"
        });
    }

    static async adminPostList(req, res) {
        const posts = await Post.getPostsDb();
        res.render('adminposts', {
            posts: posts,
            mainTitle: "of Motors"
        })
    }

    static async editPost(req, res) {
        const { postid } = req.params;
        const post = await PostsDb.getOnePost(postid);

        res.render('editpost', {
            post: post,
            mainTitle: "of Motors"
        })
    }

    static async updatePost(req, res) {
        const { postid } = req.params;
        const { title, slug, content } = req.body;
        const { update } = req.query;

        if (update === 'draft') {
            const date = 'N/A';
            PostsDb.updatePost(+postid, title, slug, content, 0, date);
        }
        if (update == undefined) {
            const isPublished = await PostsDb.isPublished(postid);
            if(isPublished.post_pub) {
                PostsDb.updatePost(+postid, title, slug, content, 1, isPublished.created_at);
            } else if(isPublished.post_pub == 0) {
                const date = new Date().toLocaleString();
                PostsDb.updatePost(+postid, title, slug, content, 1, date);
            }
        }

        res.redirect('/admin-posts-list');
    }

    static newPostDraft(req, res) {
        const { title, slug, content } = req.body

        if (!title || !content) {
            res.redirect('/newpost?error=miss');
            return;
        }

        //kiszedni a cookiet req.cookiesból
        const author = req.cookies.authcookie;
        Post.draftPostAdd(title, content, author, slug);

        res.redirect('/admin');
    }

    static draftPostAdd(title, content, author, slug) {
        const post = {};
        post.author = author;
        post.date = 'N/A'
        post.postTitle = title;
        post.slug = slug;
        post.content = content;
        post.pub = 0;

        PostsDb.newPostDb(post);
    }
}

module.exports = {
    Post: Post
}
