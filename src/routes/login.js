import express from 'express';
import {selectSql} from '../database/sql';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getMember();
    let whoAmI = '';
    let checkLogin = false;
    let Sid = 0;
    users.map((user) => {
        console.log(user.ID);
        if (vars.id == user.ID && vars.password == user.Password) {
            console.log('login success!');
            checkLogin = true;
            if (vars.id == 'admin') {
                whoAmI = 'admin';
            } else {
                whoAmI = 'Student';
                Sid = user.Sid;
            }
        }
    })

    if (checkLogin && whoAmI == 'admin') {
        res.redirect('/class');
    } else if (checkLogin && whoAmI == 'Student') {
        req.session.tmp = Sid;
        res.redirect('/student');
    } else {
        console.log('login falied!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/'; </script>");
    }
})

module.exports = router;