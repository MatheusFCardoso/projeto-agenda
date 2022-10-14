require('dotenv').config()
const express = require('express')
const app = express(); 
const mongoose = require('mongoose')
const { checkCsrfError , csrfMiddleware , middlewareGlobal } = require('./src/middlewares/middleware')
mongoose.connect( process.env.CONNECTION_STRING , {useNewUrlParser: true , useUnifiedTopology : true })
    .then( () => {
        console.log('\nconectado com a base de dados')
        app.emit('pronto');
    }).catch( (err) => console.log(err) );

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')

app.use(helmet());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static( path.resolve(__dirname, 'public') ));

const sessionOptions = session({
    secret : 'sdasfsslkdslkdflkdflkdfdslfkfdldfdkl',
    store: MongoStore.create({ mongoUrl : process.env.CONNECTION_STRING }),
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash())

app.set('views' , path.resolve(__dirname , 'src' , 'views' ) );
app.set('view engine' , 'ejs' );

app.use(csrf())
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(middlewareGlobal)

app.use(routes);

app.on('pronto' , ()=>{
    app.listen(8080, () => {
        console.log('Acessar http://localhost:8080');
        console.log('Servidor rodando na porta 8080')
    });
})

