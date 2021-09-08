const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greetings-factory-function');

const app = express();
const greetingsApp = Greetings()

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function (req, res) {
    var count = greetingsApp.lengthName()
    res.render('index', { count })
});


app.post('/greet', function (req, res) {

    var language = req.body.language
    var name = req.body.username
    
    if (name && language) {
        if ((/^([A-Za-z])+$/g).test(name) === false) {
            var count = greetingsApp.lengthName()
            req.flash('error', 'Please enter a valid name')
        } else {
            var mesg = greetingsApp.nameLanguage(name, language)
            var count = greetingsApp.lengthName()
            greetingsApp.getStoredName()
        }
    }
    else if (!name && language) {
        req.flash('error', 'Please enter a name')
    }
    else if (!name && !language) {
        req.flash('error', "Please enter name and select a language")
    }
    res.render('index', { mesg, count })

});

app.get('/greeted', function (req, res) {

    var name = greetingsApp.getStoredName()
    res.render('greetings', { name })
});


app.get('/actions', function (req, res) {
});

app.get('/counter/:username', function (req, res) {
    const name = req.params.username;
    var num = greetingsApp.userCounter(name)
    res.render("counter", {
        name, num
    })
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
