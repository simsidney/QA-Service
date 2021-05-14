DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE questions (
  question_id INT,
  product_id INT,
  question_body VARCHAR(1000),
  question_date DATE,
  asker_name TEXT,
  asker_email TEXT,
  question_helpfulness INT,
  question_reported BOOLEAN,
  PRIMARY KEY (question_id)
);

COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email,
question_reported, question_helpfulness) FROM '/home/ubuntu/questions.csv' DELIMITER',' CSV HEADER;

SELECT MAX(question_id) + 1 FROM questions;
CREATE SEQUENCE question_id_seq START WITH 3521641;
ALTER TABLE questions ALTER COLUMN question_id SET DEFAULT nextval('question_id_seq');

CREATE INDEX productindex ON questions(product_id);

CREATE TABLE answers (
  a_id INT,
  question_id INT,
  answer_body VARCHAR(1000),
  answer_date DATE,
  answerer_name TEXT,
  answerer_email TEXT,
  answer_helpfulness INT,
  answer_reported BOOLEAN,
  PRIMARY KEY (a_id),
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

COPY answers(a_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported,
answer_helpfulness) FROM '/home/ubuntu/answers.csv' DELIMITER',' CSV HEADER;

SELECT MAX(a_id) + 1 FROM answers;
CREATE SEQUENCE a_id_seq START WITH 12392976;
ALTER TABLE answers ALTER COLUMN a_id SET DEFAULT nextval('a_id_seq');

CREATE INDEX questionIndex ON answers(question_id);

CREATE TABLE answers_photos (
  photo_id INT,
  answer_id INT,
  answer_url VARCHAR(150),
  PRIMARY KEY (photo_id),
  CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(a_id) ON DELETE CASCADE
);

COPY answers_photos(photo_id, answer_id, answer_url) FROM '/home/ubuntu/answers_photos.csv' DELIMITER',' CSV HEADER;

SELECT MAX(photo_id) + 1 FROM answers_photos;
CREATE SEQUENCE photo_id_seq START WITH 3717901;
ALTER TABLE answers_photos ALTER COLUMN photo_id SET DEFAULT nextval('photo_id_seq');

CREATE INDEX answerIndex ON answers_photos(answer_id);