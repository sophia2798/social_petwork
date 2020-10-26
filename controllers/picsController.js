const express = require("express");
const router = express.Router();
const db = require("../models")
const cloudinary = require('cloudinary').v2;

// Get pics for a given pet
// Takes as a parameter a pet id and returns all photos of that pet
router.get("/pets/:id", (req, res) => {
    db.Picture.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        where: {
            petId: req.params.id
        }
    }).then(results => {
        if (results.length === 0) {
            res.status(404).send("Nothing Found")
        } else {
            res.status(200).send(results)
        }
    })
});
// Add a new photo of a pet
// Adds a new photo of a pet. Body should include at least a pictureUrl paramater. But can also include a profilePic flag and a petId.
router.post("/", (req, res) => {

    if (req.session.user) {
        if (req.body.profilePic && req.body.petId) {
            db.Picture.update({
                profilePic: false,
            }, {
                where: {
                    profilePic: true,
                    petId: req.body.petId,
                }
            }).then(result => {
                db.Picture.create(req.body).then(results => {
                    res.status(200).json(results.id)
                }).catch(err => {
                    res.status(500).send("something went wrong")
                })
            })
        } else {
            db.Picture.create(req.body).then(results => {
                res.status(200).json(results.id)
            }).catch(err => {
                res.status(500).send("something went wrong")
            })
        }
    }
})
// Delete a photo of a pet 
// Takes the id of a picture and deletes it
router.delete("/:id", (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (req.session.user) {
        db.Pet.findOne({
            where: {
                UserId: req.session.user.id,
            },
            include: {
                model: db.Picture,
                where: { id: req.params.id }
            }
        }).then(result => {
            if (!result) {
                return res.status(401).send("You can't delete this picture, it's not yours")
            } else {
                db.Picture.destroy({
                    where: {
                        id: req.params.id,
                    }
                }).then(results => {
                    if (results === 0) {
                        res.status(404).send("nothing to delete")
                    } else {
                        cloudinary.uploader.destroy(result.Pictures[0].publicId, (err, result) => {
                            // console.log(err, result);
                        })
                    }
                    res.status(200).json(results)
                }).catch(err => {
                    res.status(500).send("something went wrong")
                })
            }
        })
    } else {
        res.status(401).send("Please log in")
    }
})
// Update a picture entry
// Takes the id of a picture as a parameter and then updates whatever column names are passed to it.
router.put("/:id", (req, res) => {
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                UserId: req.session.id,
            },
            include: {
                model: db.Picture,
                where: { id: req.params.id }
            }
        }).then(result => {
            if (!result) {
                res.status(401).send("You don't own this picture")
            } else {
                db.Picture.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                }).then(results => {
                    console.log(results);
                    res.status(200).json(results);
                }).catch(err => {
                    res.status(500).send("something went wrong");
                    console.log(err);
                })
            }
        })
    } else {
        res.status(401).send("Please log in")
    }
})

// Change profile pic
// Takes as a paramater a pets id and expects a body with the id of another pic of that pet. It then sets the profilePic flag to true for that picture and false for all other pictures of that pet.
router.put("/pets/profilepic/:id", (req, res) => {
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                UserId: req.session.id,
            },
            include: {
                model: db.Picture,
                where: { id: req.params.id }
            }
        }).then(result => {
            db.Picture.update({
                profilePic: false,
            }, {
                where: {
                    profilePic: true,
                    petId: req.params.id,
                }
            }).then(result => {
                if (!result) {
                    res.status(401).send("This isn't your photo")
                } else {
                    db.Picture.update({
                        profilePic: true,
                    }, {
                        where: {
                            id: req.body.id,
                            petId: req.params.id,
                        }
                    }).then(results => {
                        console.log(results);
                        res.status(200).json(results);
                    }).catch(err => {
                        res.status(500).json(req.body);
                        console.log(err);
                    })
                }
            })
        })

    } else {
        res.status(401).send("Please log in")
    }
})

// Get profile pic
// Takes as a parameter the pets id and returns the infromation about their profile pic
router.get("/pets/profilepic/:id", (req, res) => {
    db.Picture.findOne({
        where: {
            petId: req.params.id,
            profilePic: true,
        }
    }).then(results => {
        if (!results) {
            res.status(404).send("Nothing Found")
        } else {
            res.status(200).send(results)
        }
    });
});

module.exports = router;