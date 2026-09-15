import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const materiaModel = sequelize.define("Materia", {
    nombre: { type: DataTypes.STRING(100) },
    estado: {
        type: DataTypes.ENUM("activo", "inactivo"),
        defaultValue: "activo",
    },
    carrera_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});