DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT,
  question_body TEXT,
  question_date DATE,
  asker_name TEXT,
  asker_email TEXT,
  question_helpfulness INT,
  reported BOOLEAN
);

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT,
  answer_body TEXT,
  answer_date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  answer_helpfulness INT,
  reported BOOLEAN,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

CREATE TABLE answers (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT,
  answer_url TEXT,
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id) ON DELETE CASCADE
);
