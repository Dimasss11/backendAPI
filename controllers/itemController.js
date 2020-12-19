const itemDB=require("../models/item.js");
const helper=require("../helpers/helperUser.js");

exports.createItem = async function (req, res) {
 let err=helper.validItemData(req.body)
 if(Array.isArray(err) && err.length){
  res
  .status(422)
  .json([...err]);    
 }else{
  let item=new itemDB(
    req.body.title,
    req.body.price,
    req.body.image,
    req.id
  );
  await item.save();
  let result;
  try{
    result=await itemDB.getLastItemByIdUser(req.id);
    result=result[0][0];
  }catch(e){
    console.log(e)
  }
  let obj=helper.createItemObject(result);
  res.json(obj);
 }
};

exports.getListItems = async function (req, res) {
  let result;
  try{
    result=await itemDB.getListItems();
    result=result[0];
  }catch(e){
    console.log(e)
  }
  let arr=[];
  result.forEach((el)=>{
    arr.push(helper.createItemObject(el));
  })
  res.json(arr);
}



exports.getItemById = async function (req, res) {
  let idItem=parseInt(req.params["productId"]);
  if(isNaN(idItem)) return res.sendStatus(404);
  let result;
  try{
    result=await itemDB.getItemById(idItem);
    result=result[0][0];
  }catch(e){
    console.log(e)
  }
 if(!result){
  return res.sendStatus(404);
 }
 let obj=helper.createItemObject(result);
  res.json(obj);
}


exports.updateItemById = async function (req, res) {
  let newItem;
  let idItem=parseInt(req.params["productId"]);
  let err=helper.validItemDataUpdate(req.body);
  if(Array.isArray(err) && err.length){
    return res.status(422).json([...err]); 
  }
  let query=new itemDB(
    req.body.title,
    req.body.price,
    req.body.image,
  );
  try{
    await query.updateItemById(idItem);
    newItem=await itemDB.getItemById(idItem);
    newItem=newItem[0][0];
  }catch(e){
    console.log(e)
  }
  let obj=helper.createItemObject(newItem);
  res.json(obj);
}


exports.deleteItemById = async function (req, res) {
  let idItem=parseInt(req.params["productId"]);
  try{
    await itemDB.deleteItemById(idItem);
  }catch(e){
    console.log(e)
  }
  res.sendStatus(200);
}


exports.uploadImg = async function (req, res) {
  let idItem=parseInt(req.params["productId"]);
  let result;
  try{
    result=await itemDB.getItemById(idItem);
    result=result[0][0];
  }catch(e){
    console.log(e)
  }
  let obj=helper.createItemObject(result);
  res.json(obj);
}
