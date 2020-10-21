const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/', (req,res) => {
    if (req.session.user) {
        db.Pet.create({
            name:req.body.name,
            gender:req.body.gender,
            age:req.body.age,
            color:req.body.color,
            vaccinated:req.body.vaccinated,
            hobbies:req.body.hobbies,
            UserId:req.session.user.id
        }).then(newPet=>{
            res.json(newPet)
        }).catch(err=>{
            console.log(err);
            res.status(500).end();
        })
    }
    else {
        res.status(401).send("login first!")
    }
});

router.get("/", (req,res) => {
    db.Pet.findAll().then(pets => {
        res.json(pets)
    })
});

module.exports = router;