import mysql from 'mysql2';

const pool = mysql.createPool(
    {host: 'localhost', port: 3306, user: 'root', password: '134679kin', database: 'school_week10'}
);

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
    getMyInfo: async (my_id) => {
        const sql = `select member.id as S_ID, name as S_Name, email as Email, phone as Phone, major as Major, did as D_id from  student, member where student.id = "${my_id}" and member.sid = student.id`;
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
    getClassRaw: async () => {
        const sql = `select id as ID, name as Name, participants as Participants, professor as Professor, did as Did, rid as Rid from class`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getMyClass: async (my_id) => {
        const sql = 
        `select class.id as C_ID, class.name as C_Name, class.participants as Participants, class. professor as Professor, building.name as B_Name, room.name as R_Name, department.name as D_Name 
        from class, building, room,department, student_has_class
        where student_has_class.sid = "${my_id}" and class.id = student_has_class.cid and room.bid = building.id and class.rid = room.id and class.did = department.id`;
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

        return result;
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
    },
    getMember: async () => {
        const sql = `select * from member`;
        const [result] = await promisePool.query(sql);

        return result;
    }
}

export const insertSql = {
    setClass: async (data) => {
        const sql = `insert into class (name, participants, professor, did, rid) values (
            "${data.Name}","${data.Participants}","${data.Professor}","${data.Did}","${data.Rid}"
            )`;
        await promisePool.query(sql);
    }
};

export const updateSql = {
    updateClass: async (data) => {
        console.log(data);
        const sql = `update class set 
        name = "${data.Name}",participants = "${data.Participants}",
        professor = "${data.Professor}", did = "${data.Did}", rid = "${data.Rid}" where id="${data.ID}"`;
        console.log(sql);
        await promisePool.query(sql);
    }
};
export const deleteSql = {
    deleteStudentClass: async (data) => {
        console.log(data);
        const sql = `delete from student_has_class where Cid="${data.C_id}"and Sid ="${data.S_id}"`;
        console.log(sql);
        await promisePool.query(sql);
    },
    deleteClass: async (data) => {
        console.log(data);
        const sql = `delete from class where id="${data.ID}"`;
        console.log(sql);
        await promisePool.query(sql);
    }
};