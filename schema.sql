DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INT,
  question_body VARCHAR(1000),
  question_date DATE,
  asker_name TEXT,
  asker_email TEXT,
  question_helpfulness INT,
  question_reported BOOLEAN
);

CREATE INDEX productIndex ON questions(product_id);

CREATE TABLE answers (
  a_id SERIAL PRIMARY KEY,
  question_id INT,
  answer_body VARCHAR(1000),
  answer_date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  answer_helpfulness INT,
  answer_reported BOOLEAN,
  FOREIGN KEY question_id REFERENCES questions(question_id) ON DELETE CASCADE
);

CREATE INDEX questionIndex ON answers(question_id);

CREATE TABLE answers_photos (
  photo_id SERIAL PRIMARY KEY,
  answer_id INT,
  answer_url VARCHAR(150),
  CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(answer_id) ON DELETE CASCADE
);

CREATE INDEX answerIndex ON answers_photos(answer_id);