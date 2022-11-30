const express = require('express')
const router = express.Router()
const SavedJob = require('../models/SavedJob')

router.post('/', (req, res) => {
  const {title, description, location, url} = req.body[0] 
  const email = req.body[1]
  console.log(title)
  
  // SavedJob 
  //   .create(title, description,location, url, email) 

  //   .then(res => console.log("saved"))
})

router.get('/:email', (req, res) => {
  const email = req.params.email
  console.log(email)
  SavedJob 
    .findAll(email)
    .then(jobs => res.json(jobs))
})

router.get('/:email/:description', (req, res) => {
  const email = req.params.email
  const description = req.params.description
  
  SavedJob 
    .findJob(email, description)
    .then(job =>{
      if (job) {
        res.json(job)
        console.log(job)
      } else {
        res.json('this job has not been saved')
      }
    })
})

router.delete('/:description', (req, res) => {
  const description = req.params.description

  SavedJob
    .delete(description)
    .then(() => res.json({ message: 'deleted successfully' }))
})


module.exports = router