const express=require("express");
const app= express();
const bodyparser=require("body-parser");
const { registerUser } = require("./registerUser");

app.use(bodyparser.json());

app.listen(4000,()=>{
    console.log("server started");
})

app.post("/register", (req,res)=>{
    try{
        let orgMSP=req.body.orgMSP;
        let userId=req.body.userId;
        let result =await registerUser({orgMSP:orgMSP,userId:userId});
        res.send(result);
    }catch(error){
        res.send(error)
    }
})

app.post("/tx",async(req,res)=>{
try{
    var request={
        chaincodeName:req.body.chaincodeName,
        channelName:req.body.channelName,
        userId:req.body.userId,
        org:req.user.orgMSP,
        data:req.body.data
    };
    let result = await tx(request);
    res.send(result)
}catch(error){
    res.send(error)
}

})

app.post("/query",async(req,res)=>{
    try{
        var request={
            chaincodeName:req.body.chaincodeName,
            channelName:req.body.channelName,
            userId:req.body.userId,
            org:req.body.orgMSP,
            data:req.body.data
        }
        let result=await query(request);
        res.send(JSON.parse(result.toString()));
    }catch(error){
        res.send(error)
    }
})