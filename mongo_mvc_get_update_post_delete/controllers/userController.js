import User from '../model/userModel.js';
//post all data
export  const create = async(req ,res) => {
    try{
        const newUser = new User(req.body);
        const {email} = newUser;
        const exsistUser = await User.findOne({email});
        if (exsistUser){
            return res.status(400).json({message: "user alreay exsist"});
        }
        const saveData = await newUser.save();
        res.status(200).json(saveData);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
//get all users
export const getAllUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};
//GET ID USER BY ONE
export const getUserById = async(req , res)=>{
    try{
        const{id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:"Invalid Id Format"});
    }
};
//UPDATE USER BY ID
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, req.body, { new: true }
    );
    res.status(200).json({
      message: "User updated successfully", user: updatedUser }); }
     catch (error) {
    res.status(500).json({message: "Update failed", error: error.message
    });
  }
};
//Delete all user data
export const deleteUser = async (req , res) =>{
    try{
        const{id} = req.params;
         const user = await User.findByIdAndDelete(id);
         if(!user){
           return res.status(404).json({message: "User not found"});
         }
         res.status(200).json({message: "User Deleted Successfully"});
    }catch(error){
        res.status(500).json({message: "User Not found Error"});
    };
};
