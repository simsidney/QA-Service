const { pool } = require('../db');

module.exports = {
  postPhotos: ({ a_id }, photo) => {
    return pool.query(
      `INSERT
        INTO answers_photos
        (
          answer_id,
          answer_url
        )
        VALUES
        (
          ${a_id},
          '${photo}'
        )`
    );
  }
};