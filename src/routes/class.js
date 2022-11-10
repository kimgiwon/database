import express from 'express';
import {selectSql, updateSql,deleteSql,insertSql} from '../database/sql';

const router = express.Router();

router.get('/', async (req, res) => {
    const clas = await selectSql.getClassRaw();
    res.render('class', {
        title: "Class",
        clas
    })
});

router.post('/delete', async (req, res) => {
    console.log('class router:', req.body.delBtn);

    const data = {
        ID: req.body.delBtn
    };

    await deleteSql.deleteClass(data);
    res.redirect('/select1');
});

router.post('/update', async (req, res) => {
    console.log('class router:', req.body.upBtn);
    const vars = req.body;
    const data = {
        ID: vars.ID,
        Name: vars.Name,
        Participants: vars.Participants,
        Professor: vars.Professor,
        Did: vars.Did,
        Rid: vars.Rid
    };

    await updateSql.updateClass(data);
    res.redirect('/select1');
});

router.post('/insert', async (req, res) => {
    console.log('class router:', req.body.upBtn);
    const vars = req.body;
    const data = {
        Name: vars.Name,
        Participants: vars.Participants,
        Professor: vars.Professor,
        Did: vars.Did,
        Rid: vars.Rid
    };

    await insertSql.setClass(data);
    res.redirect('/select1');
});

module.exports = router;