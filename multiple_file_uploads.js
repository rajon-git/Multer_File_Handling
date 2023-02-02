const express=require("express")
const app=express()
const helmet=require("helmet")
const multer=require("multer")


app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload=multer({storage}).array("photos",5);
app.post("/multiple",(req,res)=>{
    upload(req,res,(error)=>{
        if(error){
            res.send("image upload failed");
        }else{
            res.send("image upload success");
        }
    })
})

app.listen(8000);
console.log("server run success");