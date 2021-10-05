const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greetings-factory-function');

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greet';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });
  
const app = express();
const greetingsApp = Greetings(pool)

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

app.get('/', async function (req, res) {
    var count = await greetingsApp.length()
    res.render('index', { count })
});


app.post('/greet', async function (req, res) {
var count = await greetingsApp.length()
    var language = req.body.language
    var name = req.body.username
    if (name && language) {
        if ((/^([A-Za-z])+$/g).test(name) === false) {
            
            req.flash('error', 'Please enter a valid name')
        } else  {
            var mesg = await greetingsApp.nameLanguage(name, language)
            await greetingsApp.addNames(name)
            var count = await greetingsApp.length()
            console.log(greetingsApp.length())
            await greetingsApp.getStoredName();
        }
    }

     if (!name && language) {
        req.flash('error', 'Please enter a name')
    }

    else if (!name && !language) {
        req.flash('error', "Please enter name and select a language")
    }
    res.render('index', { mesg, count })

    
});

app.post('/reset', async function(req, res) {
    await greetingsApp.resetButton()
    req.flash('info', 'The Greeting App has successfully reset!')
    res.redirect('/')
    
});

app.get('/greeted', async function(req, res) {

    var name = await greetingsApp.getStoredName()
    console.log(name);
    res.render('greetings', { name })
});


// app.get('/actions', async function (req, res) {
// });

app.get('/counter/:username', async function (req, res) {
    const name = req.params.username;
    var num = await greetingsApp.userCounter(name)
    console.log(num.counter + " num");
    res.render("counter", {
        name, num
    })
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
