const { Score } = require('../models/psql.config');

module.exports = {
  saveScore: (req, res) => {
    const score = req.body.score
    const id = req.body.id
    Score.sync().then((Score)=>{
      Score.create({score: score, userId: id})
    })
    .then((score) => {
      if (score) {
        res.status(200).json({data: "Your score has been saved!"});
      } else {
        res.status(200).json({data: "Sorry your score was not able to be saved!"});
      }
    })
  }
}


// db.Score.sync().then((Score)=>{
//   Score.create({score: -100.0, userId: 2})
// })
// db.Score.sync().then((Score)=>{
//   Score.findAll({order:'score DESC'}).then((scores)=>{
//     scores.forEach((score)=>{console.log(score.dataValues.id, score.dataValues.score);})
//     console.log("HERER DA STUFFZ";
//   })
// })
// db.User.sync().then((User)=>{
//   User.findOne({ where: { username: 'random' }}).then((user)=>{
//     user.getScores().then((scores)=>{
//       console.log('user : ', user.username);
//       scores.forEach((score)=>{console.log(score.dataValues.id, score.dataValues.score);})
//       console.log("THIS BE SCORES");
//     })
//   })
// }) 