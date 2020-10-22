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
            profilePic:req.body.profilePic,
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
                    profilePic:req.body.profilePic,
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

router.get("/zip/:zip", function (req, res) {
    db.User.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            model: db.Pet,
            include: [{
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                model: db.type,
            }, {

                attributes: { exclude: ['createdAt', 'updatedAt'] },
                model: db.breed
            }]
        },
        ],
        where: {
            zip: req.params.zip
        }
    }).then(result => {
        res.send(result)
    })
})

router.get("/type", function (req, res) {
    db.type.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }}).then(function (dbTypes) {
        res.json(dbTypes);
    });
});

router.get("/breed", function (req, res) {
    db.breed.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }}).then(function (dbBreeds) {
        res.json(dbBreeds);
    });
})

module.exports = router;