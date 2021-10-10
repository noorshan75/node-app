
const db = require('../model');
const User = db.users;
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
var fetchUsers = async (req, res) => {

  let data = await User.findAll();

  let response = {
    data: data,
  }
  res.status(200).json(response);

}
var addUser = async (req, res) => {
console.log(req.body)
try {
  const name= req.body.name;
  const email = req.body.email;
  const gender= req.body.gender;
  const password =req.body.password;
  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(password, saltRounds)
  let data = await User.create({
    name: name,
    email: email,
    gender: gender,
    password: hashPass,
  });
  let response = {
    data: data,
    message:"Registration Successfull"
  }
  res.status(200).json(response);
}
 catch{
res.status(500).json({"message":"Registration failed"});
} 
}
var updateById = async (req, res) => {

  const id=req.params.id;
  const name= req.body.name;
  const email = req.body.email;
  const gender= req.body.gender;
  let data = await User.update(
    {
      name:name,
      email:email,
      gender:gender
    },
    {
      where: { id: id }
    }
  );
  let response = {
    data: "data"
  }
  res.status(200).json(response);
}
var fetchUserById = async (req, res) => {
  const id=req.params.id;
  let data = await User.findOne(
    {
      where: { id: id }
    }
  );
  let response = {
    data: data
  }
  res.status(200).json(response);
}
var deleteById = async (req, res) => {
  const id=req.params.id
 await User.destroy(
    {
      where: { id: id }
    }
  );
  let response = {
    data: "ok"
  }
  res.status(200).json(response);
}
var login = async(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;

  let user = await User.findOne(
    {
      // where: { [Op.and]: [{email:email} ,{password:user.password }]}
      where: {email:email}
    }
  );
  const hashPass = bcrypt.compareSync(password, user.password)
  if(user && hashPass){
     var token= jwt.sign({user}, 'hello',{ expiresIn: '1h' });
     return res.status(200).send({
      auth: true,
      accessToken: token,
      message: "Login successful",
    });
  }
  else if( user || hashPass){
      return res.status(401).send({message: "Invalid credential",})
  }
  
}
module.exports = {
  fetchUsers,
  addUser,
  updateById,
  deleteById,
  fetchUserById,
  login,
}