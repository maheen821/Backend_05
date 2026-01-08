import express from 'express';
import { create , getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'; 
const route = express.Router();
//CREATE POST
route.post("/user", create); 
// GET BY ALL ID
route.get("/user" , getAllUsers);
//GET BY ONLY ONE ID
route.get("/user/:id" , getUserById);
//UPDATE ALL USER BY ID
route.put("/user/:id" , updateUser);
//DELETE ALL DATA
route.delete("/user/:id" , deleteUser);
export default route;
