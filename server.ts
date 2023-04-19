import express from 'express';
import logger from './middleswares/logger';
import sessions from './middleswares/sessions';
import usersController from './controllers/users_controller';
import sessionsController from './controllers/sessions_controller';
import savedJobsController from './controllers/savedJobs_controller';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server listening to port ${PORT}`))

app.use(logger)
app.use(express.json())
app.use(sessions) 

app.use('/api/users', usersController)
app.use('/api/sessions', sessionsController) 

//providing apikey for search jobs in adzuna
app.use('/api/search', (req, res) => {
  const app_key = process.env.REACT_APP_adzuna_api_key
  res.json(app_key)
})

//save jobs 
app.use('/api/save', savedJobsController)

//for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}