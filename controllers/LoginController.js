class LoginControlling {
    constructor() {
        this.adminUser = { username: "admin", password: "admin" }
    }

    indexPage(req, res) {
        res.render('index',{
            mainTitle: "of Motors",
            posts: posts
        });
    }

    login(req, res) {
        const {error} = req.query;
        res.render('login', {
            mainTitle: "of Motors",
            error: error
        });
    }

    admin(req, res) {
        res.render('admin', {
            mainTitle: "of Motors"
        });
    }

    userLogin(req, res) {
        const admin = this.adminUser.username;
        const pw = this.adminUser.password;
        const { username, password } = req.body;
        if (username === admin && password === pw) {
            console.log('succesfull login');
            res.redirect('/admin');
            return;
        }
        res.redirect('/login?error=credentials');
    }

    logout(req,res) {
        res.redirect('/login');
    }
}

module.exports = LoginControlling;

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