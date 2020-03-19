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

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const loginModule = require('./controllers/login-controller.js');
const loginController = new loginModule();

app.get('/', loginController.indexPage);

app.get('/login', loginController.loginPage);

app.post('/login', loginController.userLogin.bind(loginController));

app.get('/admin', loginController.cookieAuthentication.bind(loginController), loginController.adminPage);

app.get('/logout', loginController.logout.bind(loginController));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));