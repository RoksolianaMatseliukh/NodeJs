const path = require('path');
const fs = require('fs');
const express = require('express');
const expressBar = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressBar({
    defaultLayout: false
}));

app.set('views', path.join(process.cwd(), 'views'));


const registeredUsersFolderPath = path.join(process.cwd(), 'data');
const registeredUsersFilePath = path.join(registeredUsersFolderPath, 'users.json');

fs.access(registeredUsersFolderPath, err => {
    if (err) {
        fs.mkdir(registeredUsersFolderPath, err => err && console.log(err));
        const writeUsers = fs.createWriteStream(registeredUsersFilePath);
        writeUsers.write(JSON.stringify([]));
    }
});


let isLoggedIn = false;
let error = '';
let registeredUser = {};

app.get('/', (req, res) => res.render('main'));

app.get('/registration', (req, res) => res.render('registration'));

app.get('/login', (req, res) => {
    isLoggedIn = false;
    res.render('login');
});

app.get('/error', (req, res) => res.render('error', {error}));

app.get('/users/:name', (req, res) => {
    const readStream = fs.createReadStream(registeredUsersFilePath);
    readStream.on('data', chunk => {
        const users = JSON.parse(chunk.toString());

        res.render('user_page', {isLoggedIn, ...registeredUser, users});
    });
});

app.post('/registration', (req, res) => {
    const {name, age, login, password} = req.body;

    if (!name || !age || !login || !password) {
        res.render('registration', {registrationMsg: 'fill all fields!', loginPermission: false, ...req.body});
        return;
    }

    const readStream = fs.createReadStream(registeredUsersFilePath);
    readStream.on('data', chunk => {
        const users = JSON.parse(chunk.toString());
        const foundUser = users.find(user => user.login === login);

        if (foundUser) {
            error = 'user with the same login already exists!';
            res.redirect('/error');
            return;
        }

        users.push(req.body);

        const writeUsers = fs.createWriteStream(registeredUsersFilePath);
        writeUsers.write(JSON.stringify(users));

        isLoggedIn = true;
        registeredUser = req.body;
        res.render('registration', {registrationMsg: 'successful registration, you can login!', loginPermission: true, ...req.body});
    });
});

app.post('/login', (req, res) => {
    const {login, password} = req.body;

    if (!login || !password) {
        res.render('login', {loginMsg: 'fill all fields!', ...req.body});
        return;
    }

    const readStream = fs.createReadStream(registeredUsersFilePath);
    readStream.on('data', chunk => {
        const users = JSON.parse(chunk.toString());
        const foundUser = users.find(user => user.login === login && user.password === password);

        if (!foundUser) {
            error = 'no user with this login and password';
            res.redirect('/error');
            return;

        }

        isLoggedIn = true;
        registeredUser = foundUser;
        res.redirect(`/users/${foundUser.name}`);
    });
});

app.get('*', (req, res) => {
    error = 'error 404, page not found';
    res.render('error', {error});
});


app.listen(5000, err => err ? console.log(err) : console.log('app 5000 in process'));
