db.answers.aggregate([
  {
    $lookup: {
            from: "answers_photos",
            localField: "id",
            foreignField: "answer_id",
            as: "photos"
        }
  },
  {
    $out: "answersWithPhotos"
  }
  ], { allowDiskUse: true });


  db['answersWithPhotos'].aggregate(
  [
      {
          $unwind: {
              path : "$question_id",

          }
      },
      {
          $group: {
          _id : "$question_id",
          results : {$push : {
              answer_id : "$id",
              answer_body:"$body",
              answer_date: "$date_written",
              answerer_name: "$answerer_name",
              answerer_email: "$answerer_email",
              answer_reported: "$reported",
              answer_helpful: "$helpful",
              answer_photos: "$photos"}
              }
          }
      },
      {
        $project:
        {
          _id: 0,
          question: "$_id",
          results: 1
        }
      },
      {
          $out: "question_id"
      },
  ], { allowDiskUse: true }
);


db.questions.aggregate([
  {
    $lookup: {
            from: "question_id2",
            localField: "id",
            foreignField: "question",
            as: "answers"
        }
  },
  {
    $out: "completeQA"
  }
  ], { allowDiskUse: true });


  db['completeQA'].aggregate(
  [
      {
          $unwind: {
              path : "$product_id",

          }
      },
      {
          $group: {
          _id : "$product_id",
          results : {$push :
            {
              question_id : "$id",
              question_body:"$body",
              question_date: "$date_written",
              asker_name: "$asker_name",
              asker_email: "$asker_email",
              question_reported: "$reported",
              question_helpful: "$helpful",
              answers: "$answers"}
            }
          }
      },
      {
        $project:
        {
          _id: 0,
          product_id: "$_id",
          results: 1
        }
      },
      {
          $out: "finalQA"
      },
  ], { allowDiskUse: true }
);

db.createCollection( "indices" )
db.questions.count()
db.answers.count()
db.answers_photos.count()
db.indices.insert({questionIndex: 3521634}, {answerIndex: 12392946}, {photoIndex: 3717892})