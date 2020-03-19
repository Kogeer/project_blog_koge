const loginAuthenticate = require('./login-authenticate.js');
const authenticate = new loginAuthenticate();
// console.log(authenticate.cookieAuthentication);

class LoginController {
    constructor() {
        this.adminUser = { username: "admin", password: "admin" };
        this.authenticate = authenticate;
    }

    indexPage(req, res) {
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
            // console.log(session,authenticate.AUTH_COOKIE);

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

const posts = [
    {author: "Author",
     date: "2020.02.10",
     postTitle: "Ducati",
    content: "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker."},
    {author: "Author",
     date: "2020.02.10",
     postTitle: "Ducati",
    content: "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker."},
    {author: "Author",
     date: "2020.02.10",
     postTitle: "Ducati",
    content: "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker."},
    {author: "Author",
     date: "2020.02.10",
     postTitle: "Ducati",
    content: "A Lorem Ipsum egy egyszerû szövegrészlete, szövegutánzata a betûszedõ és nyomdaiparnak. A Lorem Ipsum az 1500-as évek óta standard szövegrészletként szolgált az iparban; mikor egy ismeretlen nyomdász összeállította a betûkészletét és egy példa-könyvet vagy szöveget nyomott papírra, ezt használta. Nem csak 5 évszázadot élt túl, de az elektronikus betûkészleteknél is változatlanul megmaradt. Az 1960-as években népszerûsítették a Lorem Ipsum részleteket magukbafoglaló Letraset lapokkal, és legutóbb softwarekkel mint például az Aldus Pagemaker."}
]