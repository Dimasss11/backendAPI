const itemDB=require("../models/item.js");

exports.validOwnItem=async function(req, res, next) {
  let idItem=parseInt(req.params["productId"]);
  let item;
  if(isNaN(idItem)) return res.sendStatus(404);
  try{
    item=await itemDB.getItemById(idItem);
  }catch(e){
    console.log(e)
  }
  item=item[0][0];
  if(typeof item ==='undefined'){
    return res.sendStatus(404);
  }
  if(item.id_user != req.id){
    return res.sendStatus(403);
  }
  next();
}


exports.headerContent=async function(req, res, next) {
  if (!req.is('multipart/form-data')){
     return res.sendStatus(404)
  }
  next();
}

