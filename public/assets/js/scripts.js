// console.log("linked")

// $("#createPetForm").on("submit", event => {
//     event.preventDefault();

//     console.log("pet submitted")
//     const petObj = {
//         name: $("#petName").val(),
//         gender: $("#petGender").val(),
//         age: $("#petAge").val(),
//         color: $("#petColor").val(),
//         breed: $("#petBreed").val(),
//         vaccinated: $("#petVaccinated").val(),
//         hobbies: $("#petHobbies").val(),
//     };
//     console.log(petObj);
//     $.ajax({
//         method: "POST",
//         url: "/api/pets",
//         data: petObj
//     }).then(apiRes => {
//         console.log(apiRes);
//         if ($("#create-widget").attr("data-pic")) {
//             $.ajax({
//                 method: "POST",
//                 url: "/pics/",
//                 data: {
//                     pictureUrl: $("#create-widget").attr("data-pic"),
//                     petId: apiRes.id,
//                     profilePic: true,
//                     publicId: $("#create-widget").attr("data-public-id"),
//                 }
//             }).then(results => {
//                 window.location.href = "/myprofile";
//             })
//         }
//     })
// });

// $(".delPetBtn").on("click", function (event) {
//     event.preventDefault();

//     const petId = $(this).attr("data-petid");
//     console.log(petId);
//     $.ajax({
//         method: "DELETE",
//         url: `/api/pets/${petId}`,
//     }).then(data => {
//         console.log("Deleted!")
//         window.location.reload();
//     })
// });

// $("#editPetForm").on("submit", event => {
//     event.preventDefault();

//     console.log("pet edited")
//     const editPetObj = {
//         name: $("#editPetName").val(),
//         gender: $("#editPetGender").val(),
//         age: $("#editPetAge").val(),
//         color: $("#editPetColor").val(),
//         breed: $("#editPetBreed").val(),
//         vaccinated: $("#editPetVaccinated").val(),
//         hobbies: $("#editPetHobbies").val()
//     };
//     console.log(editPetObj);
//     const petId = $("#editPet").val();
//     $.ajax({
//         method: "PUT",
//         url: `/api/pets/${petId}`,
//         data: editPetObj
//     }).then(apiRes => {
//         console.log(apiRes);
//         window.location.href = "/myprofile"
//     })
// });

// $("#editUserForm").on("submit", event => {
//     event.preventDefault();

//     console.log("user edited")
//     const editUserObj = {
//         first_name: $("#editFirstName").val(),
//         last_name: $("#editLastNAme").val(),
//         email: $("#editEmail").val(),
//         bio: $("#editUserBio").val(),
//         // password: $("#editPassword").val(),
//         zip: $("#editZip").val(),
//     };
//     console.log(editUserObj);
//     const petId = $("#editUser").val();
//     $.ajax({
//         method: "PUT",
//         url: `/${petId}`,
//         data: editUserObj
//     }).then(apiRes => {
//         console.log(apiRes);
//         window.location.href = "/myprofile"
//     })
// });



// // // Initialize slider on profile page

// // $(document).ready(function() {
// //     $.ajax({
// //         method: "GET",
// //         url: "/myprofile"
// //     }).then(myPets => {
// //         console.log(myPets)
// //     })
// // })

// // Initialize slider on main page with options
// $(document).ready(function () {
//     $(".slider").slider({
//         indicators: false,
//         interval: 5000,
//         duration: 1500
//     });
    
//     $(".profile-slider").slider({
//         indicators: true,
//         interval: 8000,
//         duration: 300
//     });

//     $(".sidenav").sidenav();
//     $('.carousel').carousel();
// });

// $("#navigation-btn-back").click(function () {
//     $(".slider").slider("prev");
// });
// $("#navigation-btn-forward").click(function () {
//     $(".slider").slider("next");
// });

// $(document).ready(function () {
//     $('.carousel').carousel();

//     // function for next slide
//     $('.car-next').click(function () {
//         $('.carousel').carousel('next');
//     });
// });

// $(document).ready(function () {
//     $('#modal1').modal();
// });

console.log("linked"),$("#createPetForm").on("submit",a=>{a.preventDefault(),console.log("pet submitted");const b={name:$("#petName").val(),gender:$("#petGender").val(),age:$("#petAge").val(),color:$("#petColor").val(),breed:$("#petBreed").val(),vaccinated:$("#petVaccinated").val(),hobbies:$("#petHobbies").val()};console.log(b),$.ajax({method:"POST",url:"/api/pets",data:b}).then(a=>{console.log(a),$("#create-widget").attr("data-pic")&&$.ajax({method:"POST",url:"/pics/",data:{pictureUrl:$("#create-widget").attr("data-pic"),petId:a.id,profilePic:!0,publicId:$("#create-widget").attr("data-public-id")}}).then(()=>{window.location.href="/myprofile"})})}),$(".delPetBtn").on("click",function(a){a.preventDefault();const b=$(this).attr("data-petid");console.log(b),$.ajax({method:"DELETE",url:`/api/pets/${b}`}).then(()=>{console.log("Deleted!"),window.location.reload()})}),$("#editPetForm").on("submit",a=>{a.preventDefault(),console.log("pet edited");const b={name:$("#editPetName").val(),gender:$("#editPetGender").val(),age:$("#editPetAge").val(),color:$("#editPetColor").val(),breed:$("#editPetBreed").val(),vaccinated:$("#editPetVaccinated").val(),hobbies:$("#editPetHobbies").val()};console.log(b);const c=$("#editPet").val();$.ajax({method:"PUT",url:`/api/pets/${c}`,data:b}).then(a=>{console.log(a),window.location.href="/myprofile"})}),$("#editUserForm").on("submit",a=>{a.preventDefault(),console.log("user edited");const b={first_name:$("#editFirstName").val(),last_name:$("#editLastNAme").val(),email:$("#editEmail").val(),bio:$("#editUserBio").val(),zip:$("#editZip").val()};console.log(b);const c=$("#editUser").val();$.ajax({method:"PUT",url:`/${c}`,data:b}).then(a=>{console.log(a),window.location.href="/myprofile"})}),$(document).ready(function(){$(".slider").slider({indicators:!1,interval:5e3,duration:1500}),$(".profile-slider").slider({indicators:!0,interval:8e3,duration:300}),$(".sidenav").sidenav(),$(".carousel").carousel()}),$("#navigation-btn-back").click(function(){$(".slider").slider("prev")}),$("#navigation-btn-forward").click(function(){$(".slider").slider("next")}),$(document).ready(function(){$(".carousel").carousel(),$(".car-next").click(function(){$(".carousel").carousel("next")})}),$(document).ready(function(){$("#modal1").modal()});