const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('postsdb');

class DataBase {
    static createDataBase() {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(40), created_at VARCHAR(20), post_title TEXT, post_content TEXT)");
        })
    }

    static newPostDb(post) {
        db.serialize(function() {
            db.run("INSERT INTO posts(author,created_at,post_title,post_content) VALUES (?,?,?,?)",[post.author,post.date,post.postTitle,post.content])
        })
    }

    static async getPostsDb() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all("SELECT * FROM posts ORDER BY created_at DESC", function(err,posts){
                    if( err !== null) {
                        console.log(err.toString());
                    }
                    resolve(posts);
                })
            })
        })
    }
}

module.exports = DataBase;