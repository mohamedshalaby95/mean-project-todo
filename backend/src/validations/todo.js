const Joi = require("joi");

module.exports = (body) => {
  const Schema = Joi.object({
   name: Joi.string().min(3).max(30).required(),
   title: Joi.string().min(3).max(30).required(),
   discription: Joi.string().min(10).max(50).required(),
   user:Joi.string()

  

  
  });
  return Schema.validate(body);
};