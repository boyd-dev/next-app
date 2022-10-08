
// 로그인 할때 취득한 정보를 저장
// T_USER
// Field          Type           Collation        Null    Key     Default
// -------------  -------------  ---------------  ------  ------  -------
// ID             varchar(100)   utf8_unicode_ci  NO      PRI     (NULL)
// EMAIL          varchar(100)   utf8_unicode_ci  NO              (NULL)
// NAME           varchar(200)   utf8_unicode_ci  YES             (NULL)
// ACCESS_TOKEN   varchar(2048)  utf8_unicode_ci  YES             (NULL)
// REFRESH_TOKEN  varchar(1024)  utf8_unicode_ci  YES             (NULL)
// INS_DT         timestamp      (NULL)           NO              (NULL)
// UPD_DT         timestamp      (NULL)           NO              (NULL)
// NICKNAME       varchar(255)   utf8_unicode_ci  YES             (NULL)
// LAST_LOGIN_DT  timestamp      (NULL)           YES             (NULL)

export const insertUserSql = "INSERT INTO T_USER(" +
       " ID" +
       ",EMAIL" +
       ",NAME" +
       ",ACCESS_TOKEN" +
       ",REFRESH_TOKEN" +
       ",INS_DT" +
       ",UPD_DT" +
    ") VALUES (" +
       " ?" +
       ",?" +
       ",?" +
       ",?" +
       ",?" +
       ",NOW()" +
       ",NOW()" +
    ") " +
    "ON DUPLICATE KEY " +
    "UPDATE " +
       " ACCESS_TOKEN = ?" +
       ",REFRESH_TOKEN = IFNULL(?, REFRESH_TOKEN)" +
       ",UPD_DT = NOW()";
