# database

##데이터베이스 실습
1. 레포지토리 복사
    > 1. git clone <원격 저장소 주소>
    > 2. 해당 폴더 이동
    > 3. npm install
    > 4. npm run start

2. database/sql/js 파일 내부에서 본인의 데이터베이스 정보 입력  
<pre>
<code>
    const pool = mysql.createPool(
        process.env.JAWSDB_URL ?? {
            host: 'localhost',
            user: 'root',
            database: 'week10',
            password: 'password',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }
    );
    </code>
    </pre>

    <br>
    ##<span style="color:red">**테이블 작성법**</span>

