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


module.exports = router;