console.log("linked")

$("#createPetForm").on("submit", event => {
    event.preventDefault();

    console.log("pet submitted")
    const petObj = {
        name: $("#petName").val(),
        gender: $("#petGender").val(),
        age: $("#petAge").val(),
        color: $("#petColor").val(),
        breed: $("#petBreed").val(),
        vaccinated: $("#petVaccinated").val(),
        hobbies: $("#petHobbies").val(),
    };
    console.log(petObj);
    $.ajax({
        method: "POST",
        url: "/api/pets",
        data: petObj
    }).then(apiRes => {
        console.log(apiRes);
        window.location.href = "/myprofile"
    })
});

$(".delPetBtn").on("click", function (event) {
    event.preventDefault();

    const petId = $(this).attr("data-petid");
    console.log(petId);
    $.ajax({
        method: "DELETE",
        url: `/api/pets/${petId}`,
    }).then(data => {
        console.log("Deleted!")
        window.location.reload();
    })
});

$("#editPetForm").on("submit", event => {
    event.preventDefault();

    console.log("pet edited")
    const editPetObj = {
        name: $("#editPetName").val(),
        gender: $("#editPetGender").val(),
        age: $("#editPetAge").val(),
        color: $("#editPetColor").val(),
        breed: $("#editPetBreed").val(),
        vaccinated: $("#editPetVaccinated").val(),
        hobbies: $("#editPetHobbies").val()
    };
    console.log(editPetObj);
    const petId = $("#editPet").val();
    $.ajax({
        method: "PUT",
        url: `/api/pets/${petId}`,
        data: editPetObj
    }).then(apiRes => {
        console.log(apiRes);
        window.location.href = "/myprofile"
    })
});

// Initialize slider on main page with options
$(document).ready(function () {
    $(".slider").slider({
        indicators: false,
        interval: 5000,
        duration: 1500
    });
});

$("#navigation-btn-back").click(function () {
    $(".slider").slider("prev");
});
$("#navigation-btn-forward").click(function () {
    $(".slider").slider("next");
});

$(document).ready(function(){
    $('.carousel').carousel();

// function for next slide
    $('.car-next').click(function(){
        $('.carousel').carousel('next');
    });
});
 
// function to make 


var myWidget = cloudinary.createUploadWidget({
    cloudName: 'mercspring',
    uploadPreset: 'ml_default', folder: 'widgetUpload', cropping: true, sources: ['local', 'url', 'image_search', 'camera', 'google_drive', 'facebook', 'instagram'], googleApiKey: 'AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        $.ajax({
            method: "PUT",
            url: `/api/pets/` + $("#upload_widget").attr("data-petid"),
            data: { profilePic: result.info.secure_url }
        }).then(apiRes => {
            console.log(apiRes);
        })
    }
}
)
$(document).ready(function() {
    $('#modal1').modal();
  });

document.getElementById("upload_widget").addEventListener("click", function (event) {
    event.preventDefault();
    myWidget.open();
}, false);


