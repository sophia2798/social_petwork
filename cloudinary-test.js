const cloudinary = require('cloudinary').v2;
require("dotenv").config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.CLOUDINARY_API_SECRET, process.env.CLOUDINARY_API_KEY)
cloudinary.uploader.destroy("widgeMG_5492_copy_ayfnlx", (err, result)=>{
    console.log(err,result);
})
// v1603567243/widgetUpload/breed_profile_husky_1118000_hero_690-0158e427a4734e0fae59e2e91a7fe6e4_e85who.jpg