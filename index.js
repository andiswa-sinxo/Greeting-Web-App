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
    var count = greetingsApp.lengthName()
    res.render('index', {count})
});


app.post('/greet', function (req, res) {
    var language = req.body.language
    var name = req.body.username
    
    var mesg = greetingsApp.nameLanguage(name, language)
    var count = greetingsApp.lengthName()
    res.render('index', { mesg, count })

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
