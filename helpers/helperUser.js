require('dotenv').config();
const jwt=require("jsonwebtoken");
const userDB=require("../models/user.js");

exports.validUserData=async function(obj){
  let err=[];
  if(!obj.name || (obj.name && obj.name.length<2)){
    err.push({
      "field":"current_name",
      "message":"Wrong current name"
    })
  }
  if(!obj.email || (obj.email && obj.email.length<2)){
    err.push({
      "field":"current_email",
      "message":"Wrong current email"
    })
  }
  if(!obj.password || (obj.password && obj.password.length<2)){
    err.push({
      "field":"current_password",
      "message":"Wrong current password"
    })
  }
  let user=obj.email ? await userDB.getUserByEmail(obj.email):[''];
  user=user[0];
  if(user && user.length>0){
     err.push({
      "field":"current_email",
      "message":"This email has already been registered"
    })
  }
  return err;
}


exports.generateAccessToken=function(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


exports.validItemData=function(obj){
  let err=[];
  if(!obj.title || (obj.title && obj.title.length<1)){
    err.push({
      "field":"title",
      "message":"Title is required"
    })
  }
  if(!obj.price || (obj.price && obj.price.length<1)){
    err.push({
      "field":"price",
      "message":"Price is required"
    })
  }
  return err;
}

exports.validItemDataUpdate=function(obj){
  let err=[];
  if(obj.title && obj.title.length<3){
    err.push({
      "field":"title",
      "message":"Title should contain at least 3 characters"
    })
  }
  return err;
}


exports.createItemObject=function(obj){
  let objectItem={
    id: obj.id_product,
    created_at: obj.timestamp, 
    title: obj.title, 
    price:  obj.price,
    image: obj.image_link,
    user_id: obj.id_user,
    user:{
      id: obj.id_user,
      phone: obj.phone,
      email: obj.email,
    } 
  };
  return objectItem;
}

