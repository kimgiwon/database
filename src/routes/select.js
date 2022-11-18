// Copyright 2021 kms
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import express from "express";
import {selectSql,insertSql,deleteSql} from "../database/sql";

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.user) {
        // TODO 불러온 class 정보 같이 넘겨주기
        const Unsignedclass = await selectSql.getUnsignedClass(req.cookies.ID);
        const Signedclass = await selectSql.getSignedClass(req.cookies.ID);
        
        res.render('select', {
            user: req.cookies.user,
            Unsignedclass,
            Signedclass,
        });
    } else {
        res.render('/')
    }
});

router.post('/delete', async (req, res) => {
    console.log('class router:', req.body.delBtn);
    var Sid = req.cookies.user.ID;
    const data = {
        C_id: req.body.delBtn,
        S_id: Sid 
    };

    await deleteSql.deleteStudentClass(data);
    res.redirect('/sugang');
});

router.post('/insert', async (req, res) => {
    console.log('class router:', req.body.setBtn);
    var Sid = req.cookies.user.ID;
    const data = {
        C_id: req.body.SetBtn,
        S_id: Sid 
    };

    await insertSql.insertStudentClass(data);
    res.redirect('/sugang');
});

module.exports = router;