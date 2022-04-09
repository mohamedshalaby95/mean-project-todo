const { model, Schema } = require("mongoose");

// const User=require('../models/user')
const toDoSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,ref:"User"

  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  discription: { type: String, required: true, minlength: 10 },
},
{ timestamps: true }

);
const toDoModel = model("todo", toDoSchema);

module.exports = toDoModel;
