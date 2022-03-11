const userValidation = require("../validations/user");
const userModel = require("../models/user");
const _ = require("lodash");

async function addUser(req, res, next) {
  
  const { error } = userValidation(req.body);

  if (error) {
 
    res.status(401);
    throw new Error(`${error.details[0].message}`);
    
  }

  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
   
    res.status(401);
    throw new Error(`This Email is Registed`);
    
  }

  user = new userModel(
    _.pick(req.body, ["fristname", "lastname", "email", "password"])
  );
  user = await user.save();
  
  res.send(_.pick(user, ["id","fristname","lastname","email"]));


}

async function updateUser(req, res) {
 

  const { error } = userValidation(req.body);

  if (error) {
    

    throw new Error(`${error.details[0].message}`);
    
  }

  let user = await userModel.findOne({ email: req.body.email });

  if (user && user._id != req.params.id) {
    res.status(401);
    throw new Error(`This Email is Registed`);
  
  }

  console.log(req.params.id);
  user = await userModel.findByIdAndUpdate(req.params.id, {
    $set: {
      fristname: req.body.fristname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    },
  });
  user = await user.save();
  res.send(_.pick(user, ["id"]));
}
module.exports = { addUser, updateUser };
