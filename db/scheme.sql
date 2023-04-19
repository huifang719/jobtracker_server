CREATE DATABASE job_tracker; 
\c job_tracker; 

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_digest TEXT);

CREATE TABLE jobs(
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  location TEXT,
  url TEXT,
  email TEXT,
  company TEXT);
