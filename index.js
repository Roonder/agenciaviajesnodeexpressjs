import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then( () => console.log('AJA'))
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el year actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

// Agregar Body Parser para leer form
app.use(express.urlencoded({extended: true}));

// Definir la carpeta unica
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor funciona en el puerto ${port}`);
})