const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/', (req, res) => {
  const {name, email, password} = req.body
  
  const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

  User 
    .findByEmail(email) 
    .then(user => {
      if (user) {
        res.json({ error: 'This email is already associated with an account!' })
      } else {
        User 
          .create(name, email, passwordDigest)
          .then(email => res.json(email))
    }   
  }) 
})

module.exports = router