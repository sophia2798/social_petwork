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
    app.get("/", function (req, res) {
        db.User.create({
            first_name: "Hack",
            last_name: "Saw",
            email: "hack@saw.com",
            zip:98204


        })
        
        db.type.create({
            type: "Dog"
        })
        db.breed.create({
            breed: "German Shepard",
            typeId: 1,
        })
        db.Pet.create({
            name: "Dog",
            gender: "male",
            age: 7,
            zip: 98204,
            breedId: 1,
            color: "black",
            vacinated: true,
            hobbies: "barking at the neighbors dogs",
            UserId: 1
        })
        res.send()
    });
    // GET /api/user/:user_id
    // GET /api/user/:user_id/pet
    // GET /api/type/
    app.get("/api/type", function(req, res) {
        db.petType.findAll().then(function(dbTypes) {
            res.json(dbTypes);
          });
      });
    // GET /api/breed/
    app.get("/api/breed", function(req, res) {
        db.petType.findAll().then(function(dbBreeds) {
            res.json(dbBreeds);
          });
      })
    /*******************************/
    // GET /api/zip/:zip
    app.get("/api/zip/:zip", function(req, res) {
        db.User.findAll({
            attributes: [],
            include: [{
                model: db.Pet,
                attributes: [['name', 'age']]
              },
            ],
            where: {
              zip: req.params.zip
            }
          }).then(result => {
              res.send(result)
          })
      })
    // OR 
    // GET /api/:zip/:radius 
    /*******************************/

    // PUT api/user/:user_id
    // PUT api/pet/:pet_id

    // DELETE api/user/:user_id
    // DELETE api/pet/:pet_id

    // POST api/user/
    // POST api/pet/

};