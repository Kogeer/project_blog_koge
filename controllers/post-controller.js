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
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        const date = `${day}-${month}-${year}`;

        post.author = author;
        post.date = date;
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
            PostsDb.updateDraftPost(+postid, title, slug, content, 0);
        }
        if (update == undefined) {
            const isPublished = await PostsDb.isPublished(postid);
            if (isPublished.post_pub) {
                PostsDb.updatePublishedPost(+postid, title, slug, content, 1, isPublished.created_at);
            } else if (isPublished.post_pub == 0) {
                PostsDb.updatePost(+postid, title, slug, content, 1);
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
        post.postTitle = title;
        post.slug = slug;
        post.content = content;
        post.pub = 0;

        PostsDb.newDraftPostDb(post);
    }

    static async archivedPosts() {
        const archiv = {};
        const posts = await PostsDb.archivePosts();
        for(let i = 0; i < posts.length; i++) {
            posts[i].created_at = new Date(posts[i].created_at);
        }
        
        for(let i = 0; i < posts.length; i++) {
            posts[i].year = posts[i].created_at.getFullYear();
            posts[i].month = posts[i].created_at.getMonth()+1;
        }
        console.log(posts);

        for(let i = 0; i < posts.length; i++) {
            if (!archiv.hasOwnProperty(posts[i].year)) {
				archiv[posts[i].year] = {};
			}
			if (!archiv[posts[i].year].hasOwnProperty(posts[i].month)) {
				archiv[posts[i].year][posts[i].month] = [];
			}
			archiv[posts[i].year][posts[i].month].push({
				id: posts[i].id,
				title: posts[i].post_title
			});
        }
        
        return archiv;
    }
}

module.exports = {
    Post: Post
}
