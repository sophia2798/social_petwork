const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "mercspring",
    api_key: "693656375378325",
    api_secret: "19_-dWqyl-8hHWpGLC2kHCj-I18",
});

cloudinary.uploader.destroy("widgetUpload/breed_profile_husky_1118000_hero_690-0158e427a4734e0fae59e2e91a7fe6e4_e85whoi", (err, result)=>{
    console.log(err,result);
})