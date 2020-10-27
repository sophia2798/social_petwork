const express = require("express");
const router = express.Router();
const db = require("../models")

// Check for pet favorite by user
router.get("/user/", (req, res) => {
    if (req.session.user.id) {
        db.User.findByPk(req.session.user.id, {
            include: {
                model: db.Pet,
                as: "favorite_pets",
                required: false,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        }).then(result => {
            res.json(result.favorite_pets)
        })
    } else {
        res.status(401).send("Please sign in");
    }
});
// Check for users by favortie pet
router.get("/pet/:id", (req, res) => {
    db.Pet.findByPk(req.params.id, {
        include: {
            model: db.User,
            as: "users",
            required: false,
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        }
    }).then(result => {
        res.json(result.users)
    })
});
// Add a favorite when a user favorites something
router.post("/pet", (req, res) => {
    if (req.session.user) {
            db.Favorite.create({
                userId: req.session.user.id,
                petId: req.body.petId,
            }).then(result => {
                res.status(200).json(result.id)
            })
    } else {
        res.status(401).send("please sign in")
    }
})

// Delete a favorite when a user deletes a favorite; takes a petid and deletes the favorite if the user has favorited that pet
router.delete("/:id", (req, res) => {
    if (req.session.user) {
        db.Favorite.findOne({
            where: {
                userId: req.session.user.id,
                petId: req.params.id
            }
        }).then(fav => {
            if (fav) {
                db.Favorite.destroy(
                    {
                        where: {
                            petId: req.params.id,
                            userId: req.session.user.id
                        }
                    }
                ).then(result => {
                    res.status(200).json(result)
                })
            } else {
                res.status(401).send("favorite doesn't exist")
            }
        }).catch(err => {
            res.status(500).send("something went wrong")
        })

    } else {
        res.status(401).send("please sign in")
    }
})

module.exports = router;