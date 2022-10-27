const express = require('express')
const router = express.Router()
const SavedJob = require('../models/SavedJob')

router.post('/', (req, res) => {
  const {title, description, location, url} = req.body[0] 
  const email = req.body[1]
  console.log(email)
  console.log(description)
  SavedJob 
    .create(title, description,location, url, email) 
    .then(res => console.log("haha")) 
})
module.exports = router