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

router.delete("/:id", (req,res) =>{
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                id: req.params.id
            }
        }).then(pet => {
            if (pet.UserId === req.session.user.id) {
                db.Pet.destroy({
                    where: {
                        id:req.params.id
                    }
                }).then(delPet => {
                    res.json(delPet)
                })
            }
            else {
                res.status(401).send("You cannot delete a pet that is not yours")
            }
        })
    }
    else {
        res.status(401).send("not logged in")
    }
});

router.put("/:id", (req,res) =>{
    if (req.session.user) {
        db.Pet.findOne({
            where: {
                id: req.params.id
            }
        }).then(pet => {
            if (!pet) {
                return res.status(404).send("This pet does not exist in the database")
            }
            else if (pet.UserId === req.session.user.id) {
                db.Pet.update({
                    name:req.body.name,
                    gender:req.body.gender,
                    age:req.body.age,
                    color:req.body.color,
                    vaccinated:req.body.vaccinated,
                    hobbies:req.body.hobbies,
                },{
                    where: {
                        id:req.params.id
                    }
                }).then(editPet => {
                    res.json(editPet);
                }).catch(err => {
                    res.status(500).send("ERROR!")
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
        db.User.fineOne({
            where: {
                id:req.params.id
            }
        }).then(user => {
            if (!user) {
                returnres.status(404).send("User does not exist")
            }
            else if (user.UserId === req.session.user.id) {
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
            if (user.UserId === req.session.user.id) {
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

module.exports = router;