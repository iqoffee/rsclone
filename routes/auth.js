const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgriidTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgriidTransport({
    auth: {
        api_key: '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'
    }
}))

router.get('/protected', requireLogin, (req, res) => {
    res.send('Hello user')
})

router.post('/signup', (req, res) => {
    const {name, email, password, pic} = req.body

    if(!email || !password || !name){
        return res.status(422).json({error: 'please add all the fields'})
    }

    User.findOne({email: email})
    .then((savedUser) => {
        if (savedUser){
            return res.status(422).json({error: 'user already exist with that email'})
        }

        bcrypt.hash(password, 12)
        .then(hashedpassword => {

            const user = new User({
                email,
                password: hashedpassword,
                name,
                pic
            })  

            user.save()
            .then(user => {
                transporter.sendMail({
                    to: user.email,
                    from: 'no--reply@insta-clone.com',
                    subject: 'signup success',
                    html: '<h1>Welcome to insta-clone</h1>'
                })
                res.json({message: 'saved successfully'})
            })
            .catch(err => { 
                console.log(err)
            })

        })      

    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        res.status(422).json({error: 'please provide email or password'})
    }

    User.findOne({email: email})
    .then(savedUser =>{

        if(!savedUser){
            return res.status(422).json({error: 'Invalid email or password'})
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if (doMatch) {
                // res.json({message: 'Successfully signed in'})
                const token = jwt.sign({id: savedUser._id}, JWT_SECRET)
                const {_id, name, email, followers, following, pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})

            }
            else {
                return res.status(422).json({error: 'Invalid email or password'})
            }
        })
        .catch(err => {
            console.error(err)
        })
    })
})

module.exports = router