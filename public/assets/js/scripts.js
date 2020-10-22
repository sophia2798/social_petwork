console.log("linked")

$("#createPetForm").on("submit", event => {
    event.preventDefault();

    console.log("pet submitted")
    const petObj = {
        name:$("#petName").val(),
        gender:$("#petGender").val(),
        age:$("#petAge").val(),
        color:$("#petColor").val(),
        vaccinated:$("#petVaccinated").val(),
        hobbies:$("#petHobbies").val(),
    };
    console.log(petObj);
    $.ajax({
        method:"POST",
        url:"/api/pets",
        data:petObj
    }).then(apiRes => {
        console.log(apiRes);
        window.location.href="/myprofile"
    })
});