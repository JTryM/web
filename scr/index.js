
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//Initalizations
const app = express();
require('./database');
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layautsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');/**configurar en motor de plantillas **/
//Middlewares (funciones a ejecutar antes del servidor)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));/** agrega Otros metodos como put y delete**/
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized: true
}));/** guardar sesion de los usuarios**/
//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static Files ()
app.use(express.static(path.join(_dirname,'public')));
//Server is listenning
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
