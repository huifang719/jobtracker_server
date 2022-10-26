const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
// const PORT = 3001;
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

const usersController = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

app.listen(PORT, 
  () => console.log(`server listening to port ${PORT}`))

app.use(logger)

app.use(express.json())
app.use(sessions) 
app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController) 

//search for job 
app.use('/api/search', (req, res) => {
const app_id = process.env.api_client_id
const app_key = process.env.adzuna_api_key
res.json(app_key)
})


if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}