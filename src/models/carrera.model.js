import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { userModel } from "../user.model.js";

export const carreraModel = sequelize.define("Carrera", {
    nombre: {type: DataTypes.STRING(50)},
    institucion: {type: DataTypes.STRING(50)},
    periodo: {
        type: DataTypes.ENUM("quarter", "semester"),
        defaultValue: "quarter",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});