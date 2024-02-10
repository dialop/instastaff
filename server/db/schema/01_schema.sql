-- USERS TABLE 
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  auth0_id VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  handle VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  profile_picture VARCHAR(255),
  gender VARCHAR(50),
  occupation VARCHAR(255),
  license VARCHAR(255),
  points INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT FALSE,
  is_registered BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  token VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE
);

-- JOB POSTINGS TABLE (without feedback_id foreign key initially)
DROP TABLE IF EXISTS job_postings CASCADE;

CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type_of_worker VARCHAR(255),
  rate DECIMAL,
  gender VARCHAR(50),
  duration INTEGER,
  date DATE,
  start_time TIME,
  facility_name VARCHAR(255),
  facility_short_address VARCHAR(255),
  facility_latitude DECIMAL,
  facility_longitude DECIMAL,
  available_to_choose BOOLEAN,
  is_filled BOOLEAN DEFAULT FALSE,
  booked_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

-- FEEDBACKS TABLE
DROP TABLE IF EXISTS feedbacks CASCADE;
CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  review TEXT
);

-- MESSAGES TABLE
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  text TEXT,
  date_sent TIMESTAMP,
  facility_name VARCHAR(255)
);


-- CALENDAR TABLE
DROP TABLE IF EXISTS calendar CASCADE;
CREATE TABLE calendar (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_posting_id INTEGER REFERENCES job_postings(id) ON DELETE CASCADE,
  date DATE
);


-- ALTER TABLES
ALTER TABLE job_postings ADD COLUMN feedback_id INTEGER REFERENCES feedbacks(id) ON DELETE CASCADE;
ALTER TABLE users ADD UNIQUE (email);
ALTER TABLE job_postings ADD COLUMN facility_images VARCHAR(255);
