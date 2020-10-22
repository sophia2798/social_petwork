const express = require("express");
const router = express.Router();
const db = require("../models");

router.get('/', (req, res) => {
    db.Pet.findAll({
        include:[db.User]
    }).then(pets=>{
        const petsJSON = pets.map(turtObj => {
            return turtObj.toJSON();
        })
        const hbsObj = {
            user: req.session.user,
            pets:petsJSON
        }
        res.render("index",hbsObj);
    })
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

module.exports = router;