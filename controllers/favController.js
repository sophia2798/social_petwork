const express = require("express");
const router = express.Router();
const db = require("../models")

// Check for pet favorite by user
router.get("/user/:id", (req, res) => {
    db.User.findByPk(req.params.id, {
        include: {
            model: db.Pet,
            as: "favorite_pets",
            required: false,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
    }).then(result => {
        res.json(result.favorite_pets)
    })
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
        if (req.session.user.id === req.body.userId) {
            db.Favorite.create({
                userId: req.body.userId,
                petId: req.body.petId,
            }).then(result => {
                res.status(200).json(result.id)
            })
        } else {
            res.status(401).send("Not your Favorite")
        }
    } else {
        res.status(401).send("please sign in")
    }
})

// Delete a favorite when a user deletes a favorite
router.delete("/:id", (req, res) => {
    if (req.session.user) {
        db.Favorite.findByPk(req.params.id).then(fav => {
            if (fav.userId === req.session.user.id) {
                db.Favorite.destroy(
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                ).then(result => {
                    res.status(200).json(result)
                })
            } else {
                res.status(401).send("Not your favorite to delete")
            }
        }).catch(err => {
            res.status(500).send("something went wrong")
        })

    } else {
        res.status(401).send("please sign in")
    }
})

module.exports = router;