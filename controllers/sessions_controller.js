const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.get('/', (req, res) => {
    if (req.session.userId) {
        User 
            .findById(req.session.userId)
            .then(email => res.json(email))
    } else {
        res.json({error: 'no logged in user'})
    }
})


router.post('/', (req, res) => {
    const {email, password} = req.body

    User
        .findByEmail(email)
        .then(user => {
            const isValidPassword = bcrypt.compareSync(password, user.password_digest)
            if (user && isValidPassword) {
                req.session.userId = user.id
                res.json(email)
            } else {
                res.json({ error: 'Incorrect email or password' }) 
            }
        })
})

router.delete('/', (req, res) => {
    if (req.session.userId) {
        req.session.delete()
    } else {
        res.json({ error: 'No user logged in' }) 
    }
})


module.exports = router 