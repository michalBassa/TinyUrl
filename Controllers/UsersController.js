import userModel from "../Models/userModel.js";
const UsersController={
    getList : async (req, res) => {
        try {
          const users = await userModel.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }},

        getById : async (req, res) => {
            try {
              const user = await userModel.findById(req.params.id);
              if (user) {
                res.status(200).json(user);
              } else {
                res.status(404).json({ message: 'User not found' });
              }
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
},
     add : async (req, res) => {
       const user = req.body;
    try {
      const newUser = await userModel.create(user)
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }},
      
 update : async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate({id}, { name, email, password }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }},
  
 delete : async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findByIdAndDelete(id);
      res.json(deleted);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }}
};

  export default UsersController;

