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
        // profilePic: parseInt($("#create-widget").attr("data-pic")),
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
        console.log($("#create-widget").attr("data-pic"));
        $.ajax({
            method: "PUT",
            url: "/pics/" + $("#create-widget").attr("data-pic"),
            data: {
                petId: apiRes.id,
            }
        }).then(results => {
            console.log(results);
            window.location.href = "/myprofile";
        })
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

$("#editUserForm").on("submit", event => {
    event.preventDefault();

    console.log("user edited")
    const editUserObj = {
        first_name: $("#editFirstName").val(),
        last_name: $("#editLastNAme").val(),
        email: $("#editEmail").val(),
        password: $("#editPassword").val(),
        zip: $("#editZip").val(),
    };
    console.log(editUserObj);
    const petId = $("#editUser").val();
    $.ajax({
        method: "PUT",
        url: `/${petId}`,
        data: editUserObj
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

    $(".sidenav").sidenav();


});

$("#navigation-btn-back").click(function () {
    $(".slider").slider("prev");
});
$("#navigation-btn-forward").click(function () {
    $(".slider").slider("next");
});

