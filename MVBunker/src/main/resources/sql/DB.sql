CREATE TABLE t_user (
        i_user INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        uid VARCHAR(20) UNIQUE,
        ex_key VARCHAR(50),
        provider VARCHAR(15) NOT NULL DEFAULT 'local',
        upw VARCHAR(40),
        unm VARCHAR(10) NOT NULL,
        gender INT NOT NULL CHECK ( gender IN (0, 1)),
        age INT(3),
        unn VARCHAR(20),
        profileImg VARCHAR(40),
        regdt DATETIME DEFAULT NOW(),
        auth VARCHAR(10),
        UNIQUE KEY UK_social (ex_key,provider)
);