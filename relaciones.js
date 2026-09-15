import { userModel } from "./user.model.js";
import { profileModel } from "./profile.model.js";
import { carreraModel } from "./carrera.model.js";
import { materiaModel } from "./materia.model.js";
import { progresoModel } from "./progreso.model.js";
import { tareaModel } from "./tarea.model.js";

// user 1:1 profile
userModel.hasOne(profileModel, { foreignKey: "user_id" });
profileModel.belongsTo(userModel, { foreignKey: "user_id" });

// user 1:N carrera
userModel.hasMany(carreraModel, { foreignKey: "user_id" });
carreraModel.belongsTo(userModel, { foreignKey: "user_id" });

// carrera 1:N materia
carreraModel.hasMany(materiaModel, { foreignKey: "carrera_id" });
materiaModel.belongsTo(carreraModel, { foreignKey: "carrera_id" });

// materia 1:1 progreso
materiaModel.hasOne(progresoModel, { foreignKey: "materia_id" });
progresoModel.belongsTo(materiaModel, { foreignKey: "materia_id" });

// materia 1:N tarea
materiaModel.hasMany(tareaModel, { foreignKey: "materia_id" });
tareaModel.belongsTo(materiaModel, { foreignKey: "materia_id" });

export {
    userModel,
    profileModel,
    carreraModel,
    materiaModel,
    progresoModel,
    tareaModel,
};