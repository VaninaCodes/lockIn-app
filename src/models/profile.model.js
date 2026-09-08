import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const profileModel = sequelize.define( "Profile", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    first_name: { type: DataTypes.STRING(50)},
    last_name: { type: DataTypes.STRING(50) },
    pronouns: { type: DataTypes.STRING(10) },
    biography: { type: DataTypes.TEXT },
    avatar_url: { type: DataTypes.STRING(255) },
    birth_date: { type: DataTypes.DATEONLY },
});