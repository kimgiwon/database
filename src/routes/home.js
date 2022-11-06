import express from 'express';
import {selectSql} from '../database/sql';

const router = express.Router();

router.get('/', async (_req, res) => {
    const building = await selectSql.getBluiding();
    const room = await selectSql.getRoom();
    const department = await selectSql.getDepartment();
    const employee = await selectSql.getEmployee();
    const clas = await selectSql.getClass();
    const club = await selectSql.getClub();
    const student = await selectSql.getStudent();
    const student_has_class = await selectSql.getStudenthasclass();
    const student_has_club = await selectSql.getStudenthasclub();
    
    res.render('home', {
        title: 'Building table',
        title2: 'Room table',
        title3: 'Department table',
        title4: 'Employee table',
        title5: 'Class table',
        title6: 'Club table',
        title7: 'Student table',
        title8: 'Student-class table',
        title9: 'Student-club table',
        building,
        room,
        department,
        employee,
        clas,
        club,
        student,
        student_has_class,
        student_has_club,
    })
})

module.exports = router;