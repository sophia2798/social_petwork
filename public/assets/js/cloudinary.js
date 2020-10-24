var widget = cloudinary.createUploadWidget({
    cloudName: 'mercspring',
    uploadPreset: 'ml_default', folder: 'widgetUpload', cropping: true, sources: ['local', 'url', 'image_search', 'camera', 'google_drive', 'facebook', 'instagram'], googleApiKey: 'AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        if ($(".upload-widget").attr("id") === "edit-widget") {
            $.ajax({
                method: "POST",
                url: `/pics/`,
                data: { 
                    pictureUrl: result.info.secure_url,
                    profilePic: true,
                    petId: $(".upload-widget").attr("data-petid"),
                },
            }).then(apiRes => {
                console.log(apiRes);
            })
        } else {
            $.ajax({
                method: "POST",
                url: "/pics",
                data: {
                    pictureUrl: result.info.secure_url,
                    profilePic: true,
                }
            }).then(results => {
                console.log(results)
                $(".upload-widget").attr("data-pic", results)
            })
        }
    }
}
)

document.querySelector(".upload-widget").addEventListener("click", function (event) {
    event.preventDefault();
    widget.open();
});