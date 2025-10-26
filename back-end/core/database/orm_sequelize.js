// ORM数据库模型查询 sequelize

import { Sequelize } from "sequelize";
import config from "../../config.js";

const sqllize = new Sequelize(
    config.DATABASE_mysql.database,
    config.DATABASE_mysql.user,
    config.DATABASE_mysql.password,
    config.DATABASE_sequelize,
);

export default sqllize;
