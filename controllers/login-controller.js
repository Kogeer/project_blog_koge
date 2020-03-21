const loginAuthenticate = require('./login-authenticate.js');
const authenticate = new loginAuthenticate();

const dbPosts = require('./post-controller.js');

class LoginController {

    constructor() {
        this.adminUser = { username: "admin", password: "admin" };
        this.authenticate = authenticate;
    }

    async indexPage(req, res) {
        const posts = await dbPosts.Post.getPostsDb();
        res.render('index',{
            mainTitle: "of Motors",
            posts: posts
        });
    }

    loginPage(req, res) {
        const {error} = req.query;
        res.render('login', {
            mainTitle: "of Motors",
            error: error
        });
    }

    adminPage(req, res) {
        res.render('admin', {
            mainTitle: "of Motors"
        });
    }

    cookieAuthentication(req,res,next) {
        return this.authenticate.cookieAuthentication(req,res,next);
    }

    userLogin(req, res) {
        const admin = this.adminUser.username;
        const pw = this.adminUser.password;
        const { username, password } = req.body;
        if (username === admin && password === pw) {
            const session = this.authenticate.registrateSession(username);

            res.cookie(this.authenticate.AUTH_COOKIE,session.id).redirect('/admin');
            return;
        }
        res.redirect('/login?error=credentials');
    }

    logout(req,res) {
        delete this.authenticate.session['id'];
        console.log(this.authenticate.session);
        res.clearCookie(this.authenticate.AUTH_COOKIE).redirect('/login');
    }
}

module.exports = LoginController;
