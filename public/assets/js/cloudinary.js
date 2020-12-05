// window.addEventListener('load', function () {
//     var widget = cloudinary.createUploadWidget({
//         cloudName: 'mercspring',
//         uploadPreset: 'ml_default', folder: 'widgetUpload', cropping: true, sources: ['local', 'url', 'image_search', 'camera', 'google_drive', 'facebook', 'instagram'], googleApiKey: 'AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E'
//     }, (error, result) => {
//         if (!error && result && result.event === "success") {
//             console.log('Done! Here is the image info: ', result.info);
//             if ($(".upload-widget").attr("id") === "edit-widget") {
//                 $.ajax({
//                     method: "POST",
//                     url: `/pics/`,
//                     data: {
//                         pictureUrl: result.info.secure_url,
//                         profilePic: true,
//                         petId: $(".upload-widget").attr("data-petid"),
//                         publicId: result.info.public_id,
//                     },
//                 }).then(apiRes => {
//                     console.log(apiRes);
//                     window.location.reload();
//                 })
//             } else {
//                 $("#create-widget").attr("data-pic", result.info.secure_url);
//                 $("#create-widget").attr("data-public-id", result.info.public_id);
//             }
//         }
//     }
//     );

//     document.querySelector(".upload-widget").addEventListener("click", function (event) {
//         event.preventDefault();
//         widget.open();
//     });



//     $(".set-profile-pic").on("click", function (event) {
//         event.preventDefault();
//         console.log($(this).attr("class"))
//         $.ajax({
//             method: "PUT",
//             url: "/pics/pets/profilepic/" + $(this).attr("data-petId"),
//             data: {
//                 id: $(this).attr("data-id")
//             }
//         }).then(result => {
//             window.location.reload()
//         })
//     })

//     $(".delete-pic").on("click", function (event) {
//         event.preventDefault();
//         console.log($(this).attr("class"))
//         $.ajax({
//             method: "DELETE",
//             url: "/pics/" + $(this).attr("data-id"),
//         }).then(result => {
//             window.location.reload()
//         })
//     })
// })

window.addEventListener("load",function(){var a=cloudinary.createUploadWidget({cloudName:"mercspring",uploadPreset:"ml_default",folder:"widgetUpload",cropping:!0,sources:["local","url","image_search","camera","google_drive","facebook","instagram"],googleApiKey:"AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E"},(a,b)=>{!a&&b&&"success"===b.event&&(console.log("Done! Here is the image info: ",b.info),"edit-widget"===$(".upload-widget").attr("id")?$.ajax({method:"POST",url:`/pics/`,data:{pictureUrl:b.info.secure_url,profilePic:!0,petId:$(".upload-widget").attr("data-petid"),publicId:b.info.public_id}}).then(a=>{console.log(a),window.location.reload()}):($("#create-widget").attr("data-pic",b.info.secure_url),$("#create-widget").attr("data-public-id",b.info.public_id)))});document.querySelector(".upload-widget").addEventListener("click",function(b){b.preventDefault(),a.open()}),$(".set-profile-pic").on("click",function(a){a.preventDefault(),console.log($(this).attr("class")),$.ajax({method:"PUT",url:"/pics/pets/profilepic/"+$(this).attr("data-petId"),data:{id:$(this).attr("data-id")}}).then(()=>{window.location.reload()})}),$(".delete-pic").on("click",function(a){a.preventDefault(),console.log($(this).attr("class")),$.ajax({method:"DELETE",url:"/pics/"+$(this).attr("data-id")}).then(()=>{window.location.reload()})})});