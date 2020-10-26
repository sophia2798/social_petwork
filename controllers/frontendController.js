const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req, res) => {
    const hbsObj = { user: req.session.user }
    res.render("index", hbsObj);
});

router.get("/login", (req, res) => {
    res.render("login", { user: req.session.user })
});

router.get("/signup", (req, res) => {
    res.render("signup", { user: req.session.user })
});

router.get("/favorites", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.session.user.id
            },
            include: {
                model: db.Pet,
                as: "favorite_pets",
                required: false,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{ model: db.User, through: "Favorite", as: "users" }, { model: db.Picture, where: { profilePic: 1 } }]
            }
        }).then(result => {
            const resultJSON = result.toJSON();
            console.log(resultJSON.favorite_pets)
            res.render("favorites", { favorites: resultJSON, user: req.session.user })
        })
    }
    else {
        res.redirect("/login")
    }
})

router.get("/petwork", function (req, res) {
    if (req.session.user) {
        db.User.findAll({
            where: {
                zip: req.session.user.zip
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                model: db.Pet,
                include: {
                    model: db.Picture,
                }
            },
        }).then(result => {
    //    console.log(result[0].dataValues.id) 
    // const resultJSON = result.toJSON()
    let pets = [];
    for (let i= 0; i < result.length; i++ ){
        for ( let j = 0; j < result[i].dataValues.Pets.length; j++){
            pets.push({pet:result[i].dataValues.Pets[j].dataValues,user:result[i].dataValues})
        }
    }
    
    console.log(pets[1].pet.Pictures);
            res.render("petwork", { localPet: pets, user: req.session.user })
        })
    }
    else {
        res.redirect("/login")
    }
});

router.get("/myprofile", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.session.user.id
            },
            include: { model: db.Pet, include: { model: db.Picture } }
        }).then(userData => {
            console.log(JSON.stringify(userData, null, 2));
            const userDataJSON = userData.toJSON();
            // console.log(userDataJSON);
            res.render("profile", { user: userDataJSON })
        })
    }
    else {
        res.redirect("/login")
    }
});

router.get("/newpet", (req, res) => {
    if (req.session.user) {
        res.render("createPet", { user: req.session.user });
    }
    else {
        res.redirect("/login")
    }
});

router.get("/pets/edit/:id", (req, res) => {
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.Picture,
            }]
        }).then(pet => {
            if (!pet) {
                res.send("This pet does not exist in that database!")
            }
            else if (pet.UserId === req.session.user.id) {

                const petJSON = pet.toJSON();
                console.log(petJSON);
                res.render("editPet", {
                    user: req.session.user,
                    pet: petJSON,
                    helpers: {
                        gallery: function (context, options) {
                            let out = "", subcontext = [], i;
                            if (context && context.length > 0) {
                                for (i = 0; i < context.length; i++) {
                                    if (i > 0 && i % 4 === 0) {
                                        out += options.fn(subcontext);
                                        subcontext = [];
                                    }
                                    subcontext.push(context[i]);
                                }
                                out += options.fn(subcontext);
                            }
                            return out;
                        }
                    }
                })

            }
            else {
                res.status(401).send("You cannot edit a pet that is not yours")
            }
        })
    }
    else {
        // res.status(401).send("not logged in")
        res.redirect("/login")
    }
});

// User update section
router.put("/:id", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send("User does not exist")
            }
            else if (user.id === req.session.user.id) {
                db.User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    bio: req.body.bio,
                    email: req.body.email,
                    password: req.body.password,
                    zip: req.body.zip

                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(editUser => {
                    res.json(editUser);
                }).catch(err => {
                    res.status(500).send("Error! Could not update")
                })
            } else {
                res.status(401).send('incorrect account info')
            }
        })
    } else {
        res.status(401).send("Please log in.")
    }
})

// User delete section
router.delete("/:id", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (user.id === req.session.user.id) {
                db.User.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(delUser => {
                    res.json(delUser)
                })
            }
            else {
                res.status(401).send("You do not have permission to delete this account.")
            }
        })
    }
    else {
        res.status(401).send("not logged in")
    }
});

router.get("/:id", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(editUser => {
            if (!editUser) {
                res.send("User does not exist")
            }
            else if (editUser.id === req.session.user.id) {
                const editUserJSON = editUser.toJSON();
                res.render("editUser", {
                    user: req.session.user,
                    editUser: editUserJSON
                })
            }
            else {
                res.status(401).send("Not your account")
            }
        })
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;