import mysql from 'mysql2';

const pool = mysql.createPool(process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    password: '134679kin',
    database: 'week10',
    waitForConnections: 'true',
    queueLimit: 0
});

const promisePool = pool.promise();

export const selectSql = {
    getUser: async () => {
        const sql = `select * from user`;
        const [rows] = await promisePool.query(sql);

        return rows;
    },

    getDepartment: async () => {
        const sql = `select * from department`;
        const [result] = await promisePool.query(sql);

        return result
    }
}

export const deleteSql = {
    deleteDepartment: async (data) => {
        console.log("deleteSql.deleteDepartment: ", data.Dnumber);
        const sql = `delete from department where Dnumber = ${data.Dnumber}`;
        await promisePool.query(sql);
    }
}