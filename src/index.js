import express from 'express';
import logger from 'morgan';
import path from 'path';

import loginRouter from './routes/login';
import select1Router from './routes/select1';
import select2Router from './routes/select2';
import studentRouter from './routes/student';
import classRouter from './routes/class';
const PORT = 3000;
const session = require('express-session');
const app = express();

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.static(path.join(__dirname, '/src')));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use('/', loginRouter);
app.use('/student', studentRouter);
app.use('/select1', select1Router);
app.use('/select2', select2Router);
app.use('/class', classRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
});