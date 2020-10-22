// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/dummydata", function (req, res) {
        db.User.create({
            first_name: "Hack",
            last_name: "Saw",
            email: "hack@saw.com",
            zip: 98204,
            password: "password"


        }).then(result => {

            db.type.create({
                type: "Dog"
            })
            db.breed.create({
                breed: "German Shepard",
                typeId: 1,
            })
            db.Pet.create({
                UserId: 1,
                name: "Dog",
                gender: "male",
                age: 7,
                breedId: 1,
                typeId: 1,
                color: "black",
                vacinated: true,
                hobbies: "barking at the neighbors dogs",
            })
            res.send()
            db.User.create({
                first_name: "Lay",
                last_name: "Down",
                email: "lay@down.com",
                zip: 98204,
                password: "password"
    
    
            }).then(result => {
    
                db.type.create({
                    type: "Cat"
                })
                db.breed.create({
                    breed: "Poodle",
                    typeId: 2,
                })
                db.Pet.create({
                    UserId: 2,
                    name: "Dog",
                    gender: "male",
                    age: 8,
                    breedId: 2,
                    typeId: 1,
                    color: "white",
                    vacinated: true,
                    hobbies: "eating",
                })
                res.send()
            })
        })
    });
    // GET /api/user/:user_id
    // GET /api/user/:user_id/pet
    // GET /api/type/
    // app.get("/api/type", function (req, res) {
    //     db.type.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }}).then(function (dbTypes) {
    //         res.json(dbTypes);
    //     });
    // });
    // // GET /api/breed/
    // app.get("/api/breed", function (req, res) {
    //     db.breed.findAll({attributes: { exclude: ['createdAt', 'updatedAt'] }}).then(function (dbBreeds) {
    //         res.json(dbBreeds);
    //     });
    // })
    // /*******************************/
    // GET /api/zip/:zip
    // app.get("/api/zip/:zip", function (req, res) {
    //     db.User.findAll({
    //         attributes: { exclude: ['createdAt', 'updatedAt'] },
    //         include: [{
    //             attributes: { exclude: ['createdAt', 'updatedAt'] },
    //             model: db.Pet,
    //             include: [{
    //                 attributes: { exclude: ['createdAt', 'updatedAt'] },
    //                 model: db.type,
    //             }, {

    //                 attributes: { exclude: ['createdAt', 'updatedAt'] },
    //                 model: db.breed
    //             }]
    //         },
    //         ],
    //         where: {
    //             zip: req.params.zip
    //         }
    //     }).then(result => {
    //         res.send(result)
    //     })
    // })
    // OR 
    // GET /api/:zip/:radius 
    /*******************************/

    // PUT api/user/:user_id
    // PUT api/pet/:pet_id
    app.put("/api/pet/:pet_id", function (req, res) {
        db.Pet.update({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            color: req.body.color,
            vacinated: req.body.vacinated,
            hobbies: req.body.hobbies,
            breedId: req.body.breedId,
        }, {
            where: { id: req.params.pet_id }
        }).then(function (pet) {
            res.send("it worked");
        });
    })

    // DELETE api/user/:user_id
    // DELETE api/pet/:pet_id
    app.delete("/api/pet/:pet_id", function (req, res) {
        db.Pet.destroy({
            where: {
                id: req.params.pet_id
            }
        }).then(function (pet) {
            res.send("it worked");
        });
    })
    // POST api/user/
    // POST api/pet/
    app.post("/api/pet/", function (req, res) {
        db.Pet.create({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            color: req.body.color,
            vacinated: req.body.vacinated,
            hobbies: req.body.hobbies,
            breedId: req.body.breedId,
            userId: req.body.userId
        }).then(function (pet) {
            res.send("it worked");
        });
    })
};