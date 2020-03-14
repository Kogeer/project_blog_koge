const express = require('express');
const app = express();
const port = 3000;

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const loginModules = require('./controllers/LoginController.js');
const loginController = new loginModules();


app.get('/', loginController.indexPage);

app.get('/login', loginController.login);

app.get('/admin', loginController.admin);

app.post('/login', loginController.userLogin.bind(loginController));

app.get('/logout', loginController.logout);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));