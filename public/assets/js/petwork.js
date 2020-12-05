
window.addEventListener('load', function () {
    $(document).on("click", ".remove-btn", function (event) {
        $.ajax({
            method: "DELETE",
            url: "/fav/" + $(this).attr("data-pet-id")
        }).then((result) => {
            console.log(result);
            $(this).removeClass("remove-btn").addClass("add-btn");
            $(this).text("Favorite")
        })
    });

    $(document).on("click", ".add-btn", function (event) {
        $.ajax({
            method: "POST",
            data: { petId: $(this).attr("data-pet-id") },
            url: "/fav/pet"
        }).then((result) => {
            console.log(result);
            $(this).removeClass("add-btn").addClass("remove-btn");
            $(this).text("Remove Favorite");
        })
    });

    $.ajax({
        method: "GET",
        url: "/fav/user/"
    }).then(function (result) {
        console.log(result);
        $(".favorite-btn").each(function () {
            const currentPetId = parseInt($(this).attr("data-pet-id"));
            result.forEach((elm)=>{
                if (elm.id === currentPetId) {
                    console.log((elm.id === currentPetId))
                    console.log("add favorite", elm.id, currentPetId)
                    $(this).removeClass("add-btn").addClass("remove-btn");
                    $(this).text("Remove Favorite");
                } 
            })
        })
    })
})