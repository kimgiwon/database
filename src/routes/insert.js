import express from 'express';
import {insertSql} from '../database/sql';

const router = express.Router();

router.get('/', (_req, res) => {
    res.render('insert');
})

router.post('/', (req, res) => {
    const vars = req.body;
    console.log(vars.Name);

    const data = {
        Name: vars.Name,
        Email: vars.Email,
        Phone: vars.Phone,
        Major: vars.Major,
        Did: vars.Did
    };
    insertSql.setStudent(data);
    res.redirect('/');
})

module.exports = router;