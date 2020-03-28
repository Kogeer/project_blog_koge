const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('postsdb');

class DataBase {
    static createDataBase() {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(40), created_at VARCHAR(20), post_title TEXT, post_slug TEXT, post_content TEXT, post_pub INTEGER)");
        })
    }

    static newPostDb(post) {
        db.serialize(function() {
            db.run(`INSERT INTO posts(author,created_at,post_title,post_slug,post_content,post_pub) VALUES (?,datetime('now','localtime'),?,?,?,?)`,[post.author,post.postTitle,post.slug,post.content,post.pub]);
        })
    }

    static newDraftPostDb(post) {
        db.serialize(function() {
            db.run(`INSERT INTO posts(author,created_at,post_title,post_slug,post_content,post_pub) VALUES (?,"N/A",?,?,?,?)`,[post.author,post.postTitle,post.slug,post.content,post.pub]);
        })
    }

    static async getPostsDb() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all("SELECT * FROM posts ORDER BY created_at DESC", function(err,posts){
                    if( err !== null) {
                        console.log(err.toString());
                        reject(err);
                    }
                    resolve(posts);
                })
            })
        })
    }

    static async getOnePost(postparam) {
        return new Promise((resolve,reject) => {
            if(!isNaN(postparam)) {
                db.serialize(function() {
                    db.get(`SELECT * FROM posts WHERE id = "${postparam}"`, function(err,post) {
                        if(err !== null) {
                            console.log(err.toString());
                            reject(err);
                        }
                        resolve(post);
                    })
                })
            }

            db.serialize(function() {
                db.get(`SELECT * FROM posts WHERE post_slug = "${postparam}";`, function(err,post) {
                    if(err !== null || post == undefined) {
                        reject(err);
                    }
                    resolve(post);
                })
            })
        })
    }

    static updatePost(id,title,slug,content,pub) {
        db.serialize(function() {
            db.run(`UPDATE posts SET post_title = "${title}", post_slug="${slug}", post_content="${content}", post_pub = "${pub}", created_at = datetime('now','localtime') WHERE id = "${id}"`);
        })
    }

    static updatePublishedPost(id,title,slug,content,pub,date) {
        db.serialize(function() {
            db.run(`UPDATE posts SET post_title = "${title}", post_slug="${slug}", post_content="${content}", post_pub = "${pub}", created_at = "${date}" WHERE id = "${id}"`);
        })
    }

    static updateDraftPost(id,title,slug,content,pub,date) {
        db.serialize(function() {
            db.run(`UPDATE posts SET post_title = "${title}", post_slug="${slug}", post_content="${content}", post_pub = "${pub}", created_at = "N/A" WHERE id = "${id}"`);
        })
    }

    static async isPublished(postid) {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.get(`SELECT post_pub, created_at FROM posts WHERE id = "${postid}"`, function(err,post) {
                    if(err !== null) {
                        reject(err);
                    }
                    resolve(post);
                })
            })
        })
    }

    static async archivePosts() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all(`SELECT id,post_title,created_at FROM posts WHERE post_pub = 1;`, function(err,post) {
                    if(err !== null) {
                        reject(err);
                    }
                    resolve(post);
                })
            })
        })
    }
}

module.exports = DataBase;
