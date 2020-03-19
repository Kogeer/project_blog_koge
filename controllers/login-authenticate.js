class Authenticate {
    constructor() {
        this.session = {};
        this.AUTH_COOKIE = 'authcookie';
    }

    registrateSession(user) {
        const session = {id:user}
        this.session = session;
        return this.session;
    }
    
    cookieAuthentication(req,res,next) {
        console.log(`Cookie auth`);
        // const authCookie = req.cookies[this.AUTH_COOKIE];
        console.log(this.session);
        const newSession = this.session.id;
        if(!newSession) {
            res.send('Login required');
            return;
        }

        req.session = newSession;
        next();
    }

}

module.exports = Authenticate;