import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'school_week10',
    password: '134679kin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// selec query
export const selectSql = {
  getUsers: async () => {
    const [rows] = await promisePool.query(`select student.Name, member.ID, member.Password,student.id as Sid from member, student where student.id = member.sid`);
    
    return rows
  },
  getUnsignedClass: async (my_id) => {
    const [rows] = await promisePool.query(`
    select c.id as ID, c.name as Name, c.participants as Participants, c.professor as Professor,
    d.Name as D_Name, b.Name as B_Name, r.name as R_Name, 
    (Participants - tmp.extra_seat) as E_Seat

    from class as c, department as d, building as b, room as r,
    (select cid,count(*) as extra_seat from student_has_class group by cid) as tmp

    where c.did = d.id and c.rid = r.id and r.bid = b.id and tmp.cid = c.id 
    and c.id not in (select cid from student_has_class where sid = "${my_id}")
    `);

    return rows
  },
  getSignedClass: async (my_id) => {
    const [rows] = await promisePool.query(`
    select c.id as ID, c.name as Name, c.participants as Participants, c.professor as Professor,
    d.Name as D_Name, b.Name as B_Name, r.name as R_Name

    from class as c, department as d, building as b, room as r

    where c.did = d.id and c.rid = r.id and r.bid = b.id 
    and c.id in (select cid from student_has_class where sid = "${my_id}")
    `);

    return rows
  },
}

export const insertSql = {
  insertStudentClass: async (data) => {
    const [rows] = await promisePool.query(`
    insert into student_has_class values ("${data.S_id}","${data.C_id}")
    `);

    return rows
  },
}

export const deleteSql = {
  deleteStudentClass: async (data) => {
    const [rows] = await promisePool.query(`
    delete from student_has_class where cid = "${data.C_id}" and sid = "${data.S_id}" 
    `);

    return rows
  },
}
