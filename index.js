const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greetings-factory-function'); 
const router = require('./routes/greetings-routes')
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
    ssl :  {
    rejectUnauthorized: false
    }
  });
  
const app = express();
//factory insta
const greetingsApp = Greetings(pool)
//routes inst
const Routes = router(greetingsApp)

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

app.use(flash())
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', Routes.home);
app.post('/greet', Routes.hello);
app.post('/reset', Routes.refresh);
app.get('/greeted', Routes.person);
app.get('/counter/:username', Routes.many)


let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})
