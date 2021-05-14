const { pool } = require('../db');

module.exports = {
  getQuestions: ({product_id, page = 1, count = 5}) => {
    return pool.query(
      `SELECT
        questions.question_id,
        question_body,
        question_date,
        asker_name,
        question_helpfulness,


        COALESCE(
          json_object_agg(
            a_id,
            json_build_object(
              'id', a_id,
              'body', answer_body,
              'date', answer_date,
              'answerer_name', answerer_name,
              'helpfulness', answer_helpfulness,
              'photos',
                COALESCE(
                  (
                    SELECT
                      json_agg(answer_url)
                    FROM answers_photos
                    WHERE answer_id = a_id
                    ),
                  json_build_array()
                )
            )
          )
          FILTER
            (WHERE answer_reported = FALSE),
          json_build_object()
        )

        AS answers

        FROM questions
        LEFT JOIN answers
          ON questions.question_id = answers.question_id
        WHERE product_id = ${product_id}
        AND
          NOT question_reported
        GROUP BY questions.question_id
        LIMIT ${count}
        OFFSET ${(page - 1) * count}
      `);
  },

  postQuestion: ({ body, name, email, product_id }, date) => {
    return pool.query(
      `INSERT INTO questions
        (
          product_id,
          question_body,
          question_date,
          asker_name,
          asker_email,
          question_helpfulness,
          question_reported
        )
      VALUES
        (
          '${product_id}',
          '${body}',
          TO_DATE('${date}', 'DD/MM/YYYY'),
          '${name}',
          '${email}',
          0,
          FALSE
        )`
    );
  },

  questionHelpfulness: ({ question_id }) => {
    return pool.query(
      `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = ${question_id}`
    );
  },

  questionReport: ({ question_id }) => {
    return pool.query(
      `UPDATE questions
      SET question_reported = TRUE
      WHERE question_id = ${question_id}`
    );
  }
}