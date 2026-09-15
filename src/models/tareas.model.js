import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const tareaModel = sequelize.define("Tarea", {
    materia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: { type: DataTypes.STRING(100) },
    estado: {
        type: DataTypes.ENUM("en_curso", "terminado"),
        defaultValue: "en_curso",
    },
});