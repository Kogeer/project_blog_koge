const dbservice = require('./dbservice');

class DataBaseConnection {
    static dbPathPage(req,res) {
        const {error} = req.query;
        res.render('dbconnect', {
            mainTitle: 'of Motors',
            error:error
        });
    }

    static changePath(req,res) {
        const {dbpath} = req.body;
        console.log(dbpath);
        if(dbservice.changePath(dbpath)) {
            res.redirect('/admin');
            return;
        };

        res.redirect('/dbpath?error=invalidpath');
    }
}

module.exports = DataBaseConnection;