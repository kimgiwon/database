import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '134679kin',
    database: 'school',
});

const promisePool = pool.promise();

export const selectSql = {
    getEmployee: async () => {
        const sql = `select e.id as ID, e.name as Name, e.position as Position, d.name as D_Name from employee as e, department as d where e.did = d.id`;
        const [result] = await promisePool.query(sql);

        return result;
    },

    getStudent: async () => {
        const sql = `select id as ID, name as Name, email as Email, phone as Phone, major as Major, did as D_id from  student`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getBluiding: async () => {
        const sql = `select id as ID, name as Name from building`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getRoom: async () => {
        const sql = `select building.name as B_Name, room.id as ID, room.name as Name, room.capacity as Capacity from building, room where room.bid = building.id order by building.id`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getClass: async () => {
        const sql = `select class.id as ID, class.name as Name, class.participants as Participants, class. professor as Professor, building.name as B_Name, room.name as R_Name, department.name as D_Name from class, building, room,department where room.bid = building.id and class.rid = room.id and class.did = department.id order by class.id`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getClub: async () => {
        const sql = `select id as ID, name as Name from club`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getDepartment: async () => {
        const sql = `select * from department`;
        const [result] = await promisePool.query(sql);

        return result
    },
    getStudenthasclass: async () => {
        const sql = `select student.id as ID, student.name as Name, class.name as C_Name from student, class, student_has_class where student_has_class.sid = student.id and student_has_class.cid = class.id order by student.id`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getStudenthasclub: async () => {
        const sql = `select student.id as ID, student.name as Name, club.name as C_Name from student, club, student_has_club where student_has_club.sid = student.id and student_has_club.clid = club.id order by student.id;`;
        const [result] = await promisePool.query(sql);

        return result;
    }
}

export const insertSql = {
    setStudent: async (data) => {
        const sql = `insert into student (name, Email, phone, major, did) values (
            "${data.Name}", "${data.Email}", "${data.Phone}", "${data.Major}", "${data.Did}"
            )`

        await promisePool.query(sql);
    },

    setDepartment: async (data) => {
        const sql = `insert into department (name, email, phone) values (
            "${data.Name}", "${data.Email}", "${data.Phone}"
        )`

        await promisePool.query(sql);
    }
};

export const updateSql = {
    updateStudent: async (data) => {
        console.log(data);
        const sql = `update student set name = "${data.Name}",email = "${data.Email}",phone = "${data.Phone}", major = "${data.Major}", did = "${data.D_id}" where id="${data.Id}"`;
        console.log(sql);
        await promisePool.query(sql);
    }
}