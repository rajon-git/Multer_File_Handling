const express=require("express")
const app=express()
const multer=require("multer");
const helmet=require("helmet");

//implement
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("uploads"));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }});

    app.post("/filtering",async(req,res)=>{
        try{
            const maxSize=5*1024*1024;
            const upload=multer({
                storage,
                fileFilter:(req,file,cb)=>{
                    if(file.mimetype==="image/jpg"||
                    file.mimetype==="image/jpeg"||
                    file.mimetype==="image/png"||
                    file.mimetype==="image/webp"||
                    file.mimetype==="video/mp4"){
                        cb(null,true)
                    }else{
                        cb(null,false);
                        return cb(new Error("only jpg,png,jpeg,webp,mp4 are allowed"));
                    }
                },
            limits:{fileSize:maxSize}
        }).array("file",10);
        upload(req,res,(error)=>{
            console.log(req.files);
            if(error instanceof multer.MulterError){
                res.status(400).json({
                    status:"Fail",
                    message:error.message
                })
            }else if(error){
                res.status(400).json({
                    status:"Fail",
                    message:error.message
                })
            }
            res.status(200).json({message:"file upload success"});
        })
        }catch(err){
            console.log(err)
        }
    })
    app.listen(8000);
    console.log("server run success");