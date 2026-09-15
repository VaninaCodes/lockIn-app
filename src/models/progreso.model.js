import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const progresoModel = sequelize.define("Progreso", {
    materia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    progreso_por_sesion: { type: DataTypes.FLOAT },
    progreso_acumulado: { type: DataTypes.FLOAT },
});