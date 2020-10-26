const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");

router.post('/signup', (req, res) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        zip: req.body.zip
    }).then(newUser => {
        req.session.user = {
            email: newUser.email,
            id: newUser.id,
            zip: newUser.zip
        }
        res.redirect("/myprofile");
    }).catch(err => {
        console.log(err);
        res.status(500).send("server error")
    })
});

router.post('/login', (req, res) => {
    db.User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        //check if user entered password matches db password
        if (!user) {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')

        } else if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.user = {
                email: user.email,
                id: user.id,
                zip: user.zip
            }
            return res.redirect("/myprofile")
        }
        else {
            req.session.destroy();
            return res.status(401).send('incorrect email or password')
        }
    })
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
});

router.get("/sessiondata", (req, res) => {
    res.json(req.session)
});

module.exports = router;