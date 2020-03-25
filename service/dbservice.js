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
            db.run("INSERT INTO posts(author,created_at,post_title,post_slug,post_content,post_pub) VALUES (?,?,?,?,?,?)",[post.author,post.date,post.postTitle,post.slug,post.content,post.pub]);
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

    static updatePost(id,title,slug,content,pub,date) {
        db.serialize(function() {
            console.log(id,title,slug,content);
            db.run(`UPDATE posts SET post_title = "${title}", post_slug="${slug}", post_content="${content}", post_pub = "${pub}", created_at = "${date}" WHERE id = "${id}"`);
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
}

module.exports = DataBase;
