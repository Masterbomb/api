![img](/docs/img/masterbomb-dd.png)

## Resources
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04

## Notes
```sql
CREATE DATABASE IF NOT EXISTS test;

CREATE TABLE test.contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email VARCHAR(100)
) ENGINE=InnoDB;

CREATE USER 'connpy_test'@'localhost' IDENTIFIED BY 'passwd';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP ON test.contacts TO 'connpy_test'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE, DROP ON test.contacts TO 'connpy_test'@'localhost';
```

```bash
% mysqlshow test
+----------+
|  Tables  |
+----------+
| contacts |
+----------+
```

```bash
% mysqlshow test contacts
Database: test  Table: contacts
+------------+--------------+-------------------+------+-----+---------+----------------+---------------------------------+---------+
| Field      | Type         | Collation         | Null | Key | Default | Extra          | Privileges                      | Comment |
+------------+--------------+-------------------+------+-----+---------+----------------+---------------------------------+---------+
| id         | int(11)      |                   | NO   | PRI |         | auto_increment | select,insert,update,references |         |
| first_name | varchar(25)  | latin1_swedish_ci | YES  |     |         |                | select,insert,update,references |         |
| last_name  | varchar(25)  | latin1_swedish_ci | YES  |     |         |                | select,insert,update,references |         |
| email      | varchar(100) | latin1_swedish_ci | YES  |     |         |                | select,insert,update,references |         |
+------------+--------------+-------------------+------+-----+---------+----------------+---------------------------------+---------+
```

```bash
% mysqlshow test contacts 0
Database: test  Table: contacts  Wildcard: 0
+-------+------+-----------+------+-----+---------+-------+------------+---------+
| Field | Type | Collation | Null | Key | Default | Extra | Privileges | Comment |
+-------+------+-----------+------+-----+---------+-------+------------+---------+
+-------+------+-----------+------+-----+---------+-------+------------+---------+
```


