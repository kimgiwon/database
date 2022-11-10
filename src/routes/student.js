import express from 'express';
import {selectSql, deleteSql} from '../database/sql';


const router = express.Router();

router.get('/', async (req, res) => {    
    var Sid = req.session.tmp;
    console.log(Sid);
    const clas = await selectSql.getMyClass(Sid);
    const student = await selectSql.getMyInfo(Sid);
    console.log(student);
    res.render('student', {
        title: "Information",
        title2: "Class",
        student,
        clas
    })
});

router.post('/delete', async (req, res) => {
    console.log('class router:', req.body.delBtn);
    var Sid = req.session.tmp;
    const data = {
        C_id: req.body.delBtn,
        S_id: Sid 
    };

    await deleteSql.deleteStudentClass(data);
    res.redirect('/select2');
});

module.exports = router;