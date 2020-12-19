const userDB=require("../models/user.js");
const helper=require("../helpers/helperUser.js");

exports.register = async function (req, res) {
  let err=await helper.validUserData(req.body);
  if(Array.isArray(err) && err.length){
   return res.status(422).json([...err]);
  }else{
    let user=new userDB(
      req.body.name,
      req.body.phone,
      req.body.email,
      req.body.password
    );
    await user.save();
    let idUser=await userDB.getUserByEmail(req.body.email);
    idUser={id_user:idUser[0][0].id_user};
    const accessToken = helper.generateAccessToken(idUser);
    res.json({token:accessToken});
  }
};


exports.login = async function (req, res) {
  let user;
  try{
    user=await userDB.getUserValid(req.body.email, req.body.password);
  }catch(e){
    console.log(e)
  }
  if(user){
    const accessToken = helper.generateAccessToken(user.id_user);
    res.status(200).json({token:accessToken});
  }else{
    res
    .status(422)
    .json({
      "field":"password",
      "message":"Wrong email or password"
      },);
  }
};

exports.me = async function (req, res) {
  let user;
  try{
    user=await userDB.getUserById(req.id);
    user=user[0][0];
  }catch(e){
    console.log(e)
  }
  let phone=user.phone ? user.phone : '';
  res.json({
    'id': req.id,
    'phone': phone,
    'name': user.name,
    'email': user.email
  })
};
