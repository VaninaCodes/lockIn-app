import { userModel } from "../models/user.models.js";

export const getAllUsers = async (req, res) => {
    try{
        const user = await userModel.findAll({
        });

        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const getUserById = async (req, res) => {
    try{
        const user = await userModel.findByPk(req.params.id, {
        });
        //validacion
        if (user) res.json(user);
        else res.status(404).json({message: "User no encontrado"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const createUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        // validacion
        if (!name || !email || !password){
            return res.status(400).json({message: "Debe completar todos los campos"})
        }
        const newUser = await userModel.create({
            name,
            email,
            password,
        });

        res.status(201).json({message: "User creado!", newUser});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    }
};

export const updateUser = async (req, res) => {
    try{
        const updated = await userModel.update(req.body, {
            where: { id: req.params.id},
        });
        //validaciones
        if (updated){
            const updateUser = await userModel.findByPk(req.params.id);
            res.json(updateUser);
        }
        else{
            res.status(404).json({message: "User no encontrado"});
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try{
        const deleted = await userModel.destroy({where: { id: req.params.id}});
       //validacion
       if (deleted) res.json({message: "User eliminado!"});
       else res.status(404).json({message: "User no encontrado"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};