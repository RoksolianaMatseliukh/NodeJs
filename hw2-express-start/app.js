const path = require('path');
const fs = require('fs');
const express = require('express');
const expressBar = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', expressBar({
    defaultLayout: false
}));

let loginMsg = '';
let registrationMsg = '';
let loginPermission = false;
let registeredUser = {};

const registeredUsersFolderPath = path.join(process.cwd(), 'data');
const registeredUsersFilePath = path.join(registeredUsersFolderPath, 'users.json');

fs.access(registeredUsersFolderPath, err => {
    if (err) {
        fs.mkdir(registeredUsersFolderPath, err => err && console.log(err));
        const writeUsers = fs.createWriteStream(registeredUsersFilePath);
        writeUsers.write(JSON.stringify([]));
    }
});

app.get('/', (req, res) => res.render('main'));

app.get('/registration', (req, res) => res.render('registration'));

app.get('/login', (req, res) => res.render('login'));

app.get('/user_page', (req, res) => res.render('user_page', { ...registeredUser}));

app.post('/registration', (req, res) => {

    const {name, age, login, password} = req.body;
    if (!name || !age || !login || !password) {
        registrationMsg = 'fill all fields!';
        loginPermission = false;
        res.render('registration', {registrationMsg, loginPermission, ...req.body});
        return;
    }

    const readStream = fs.createReadStream(registeredUsersFilePath);
    readStream.on('data', chunk => {
        const users = JSON.parse(chunk.toString());
        const foundUser = users.find(user => user.login === login);

        if (foundUser) {
            registrationMsg = 'user with the same login already exists!';
            loginPermission = false;
            // res.redirect('/registration');

            //or
            res.render('registration', {registrationMsg, loginPermission, ...req.body, login: ''});
            return;
        }

        users.push(req.body);

        const writeUsers = fs.createWriteStream(registeredUsersFilePath);
        writeUsers.write(JSON.stringify(users));

        registrationMsg = 'successful registration, you can login!';
        loginPermission = true;
        registeredUser = req.body;
        // res.redirect('/registration');

        //or
        res.render('registration', {registrationMsg, loginPermission, ...req.body});
    });
});

app.post('/login', (req, res) => {

    const {login, password} = req.body;

    if (!login || !password) {
        loginMsg = 'fill all fields!';
        res.render('login', {loginMsg, ...req.body});
        return;
    }

    const readStream = fs.createReadStream(registeredUsersFilePath);
    readStream.on('data', chunk => {
        const users = JSON.parse(chunk.toString());
        const foundUser = users.find(user => user.login === login && user.password === password);

        if (!foundUser) {
            loginMsg = 'no user with this login or password';
            res.render('login', {loginMsg})
            return;
        }

        res.render('user_page', { ...foundUser});
    });
});


app.listen(5000, err => err ? console.log(err) : console.log('app 5000 in process'));
