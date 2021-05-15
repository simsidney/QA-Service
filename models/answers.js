const { pool } = require('../db');

module.exports = {
  getAnswers: async ({ question_id }, { page = 1, count = 5 }) => {

    return await pool.query(
      `SELECT
        a_id,
        answer_body,
        answer_date,
        answerer_name,
        answer_helpfulness,
        COALESCE(
          (
            SELECT
              json_agg(answer_url)
            FROM answers_photos
            WHERE answer_id = a_id
            ),
          json_build_array()
          ) AS photos
      FROM answers
      WHERE question_id = ${question_id}
      AND
        NOT answer_reported
      LIMIT ${count}
      OFFSET ${(page - 1) * count}
    `);
  },

  postAnswers: async ({ question_id }, { body, name, email }, date) => {
    return await pool.query(
      `INSERT
        INTO answers
          (
            question_id,
            answer_body,
            answer_date,
            answerer_name,
            answerer_email,
            answer_helpfulness,
            answer_reported
          )
        VALUES
          (
            '${question_id}',
            '${body}',
            TO_DATE('${date}', 'DD/MM/YYYY'),
            '${name}',
            '${email}',
            0,
            FALSE
          )
      RETURNING a_id`
    );
  },

  answerHelpfulness: async ({ answer_id }) => {
    return await pool.query(
      `UPDATE answers
      SET answer_helpfulness = answer_helpfulness+1
      WHERE a_id = ${answer_id}`
    );
  },

  answerReport: async ({ answer_id }) => {
    return await pool.query(
      `UPDATE answers
      SET answer_reported = TRUE
      WHERE a_id = ${answer_id}`
    );
  }
}