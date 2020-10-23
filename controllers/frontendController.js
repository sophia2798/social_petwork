const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req, res) => {
    const hbsObj = {user: req.session.user}
    res.render("index",hbsObj);
});

router.get("/login",(req,res) => {
    res.render("login",{user:req.session.user})
});

router.get("/signup",(req,res) => {
    res.render("signup",{user:req.session.user})
});

router.get("/favorites",(req,res) => {
    res.render("favorites",{user:req.session.user})
});

router.get("/petwork",(req,res) => {
    res.render("petwork",{user:req.session.user})
});

router.get("/myprofile",(req,res)=> {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [db.Pet]
        }).then(userData=> {
            const userDataJSON = userData.toJSON();
            res.render("profile",{user:userDataJSON})
        })
    }
    else {
        res.redirect("/login")
    }
});

router.get("/newpet", (req,res) => {
    if (req.session.user) {
        res.render("createPet", {user: req.session.user});
    }
    else {
        res.redirect("/login")
    }
});

router.get("/pets/edit/:id", (req,res) => {
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                id: req.params.id
            }
        }).then(pet => {
            if (!pet) {
                res.send("This pet does not exist in that database!")
            }
            else if (pet.UserId === req.session.user.id) {
                const petJSON = pet.toJSON();
                res.render("editPet", {
                    user: req.session.user,
                    pet: petJSON
                })
            }
            else {
                res.status(401).send("You cannot edit a pet that is not yours")
            }
        })
    }
    else {
        res.status(401).send("not logged in")
    }
});

// User update section
router.put("/:id", (req, res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id:req.params.id
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send("User does not exist")
            }
            else if (user.id === req.session.user.id) {
                db.User.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    zip: req.body.zip

                }, {
                        where: {
                        id:req.params.id
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
router.delete("/:id", (req,res) =>{
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(user => {
            if (user.id === req.session.user.id) {
                db.User.destroy({
                    where: {
                        id:req.params.id
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

router.get("/:id", (req,res) => {
    if (req.session.user) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(editUser => {
            if(!editUser) {
                res.send("User does not exist")
            }
            else if (editUser.UserId === req.session.user.id) {
                const editUserJSON = editUser.toJSON();
                res.render("editUser", {
                    user: req.session.user,
                    editUser = editUserJSON
                })
            }
            else {
                res.status(401).send("Not your account")
            }
        })
    }
    else {
        res.status(401).send("You are not logged in")
    }
});

module.exports = router;