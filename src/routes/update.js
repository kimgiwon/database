import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    const student = await selectSql.getStudent();
    res.render('updateStudent', {
        title: '학생 테이블 갱신',
        student,
    });
});

router.post('/update', async (req, res) => {
    const vars = req.body;
    console.log(vars.Name);

    const data = {
        Id: vars.Id,
        Name: vars.Name,
        Email: vars.Email,
        Phone: vars.Phone,
        Major: vars.Major,
        Did: vars.Did
    };
    await updateSql.updateStudent(data);
    res.redirect('/');
});

module.exports = router;