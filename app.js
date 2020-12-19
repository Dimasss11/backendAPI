const express = require('express');
const app=express();
const bodyParser = require('body-parser');

const PORT=process.env.PORT || 3000;

const itemsRouter=require("./routes/itemsRouter.js");
const userRouter = require("./routes/userRouter.js");


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRouter);
app.use("/api/items", itemsRouter);

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});