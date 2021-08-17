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

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index')
});


app.post('/greet', function (req, res) {
    var langauge = req.body.langauge
    console.log(req.body.username)
    var mesg;

    if (langauge === 'IsiXhosa') {
        mesg = 'Molo, ' + req.body.username
    }
    else if (langauge === 'Spanish') {
        mesg = 'Hola, ' + req.body.username
    }
    else if (langauge === 'French') {
        mesg = 'Bonjour, ' + req.body.username
    }
    console.log(mesg)

    res.render('index', {mesg})

});

app.post('/action', function (req, res) {
});

app.get('/actions', function (req, res) {
});

app.get('/actions/:type', function (req, res) {
});

let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
