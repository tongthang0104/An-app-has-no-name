const _ = require('lodash');
let categoriesList = [
  'General Knowledge',
  'Entertainment: Books',
  'Entertainment: Film',
  'Entertainment: Music',
  'Entertainment: Television',
  'Entertainment: Video Games',
  'Entertainment: Board Games',
  'Entertainment: Japanese Anime & Manga',
  'Entertainment: Cartoon & Animations',
  'Science & Nature',
  'Science: Computers',
  'Science: Mathematics',
  'Mythology',
  'Sports',
  'Geography',
  'History',
  'Politics',
  'Art',
  'Celebrities',
  'Animals',
  'Vehicles',
];

const randomize = (array, amount) => {
  // let x = 0;
  // let randomResult = [];
  // while (x < amount) {
  //   let randomIndex = Math.floor(Math.random() * (array.length - 0) + 0);
  //   randomResult.push(array[randomIndex]);
  //   x += 1;
  // }
  let shuffledArray = _.shuffle(array);

  return shuffledArray.slice(0, amount);
};

module.exports = {

  getRandomCategories: () => {
    return randomize(categoriesList, 5);
  },

  getRandomQuestions: (cate, questions) => {

    let result = [];
    const questionsList = _.filter(questions, function(question) {
      return question.category === cate;
    });

    const easyQuestion = _.filter(questionsList, function(question) {
      return question.difficulty === 'easy';
    });

    const hardQuestion = _.filter(questionsList, function(question) {
      return question.difficulty === 'hard';
    });

    const mediumQuestion = _.filter(questionsList, function(question) {
      return question.difficulty === 'medium';
    });

    let easy = randomize(easyQuestion, 2);
    let medium = randomize(mediumQuestion, 2);
    let hard = randomize(hardQuestion, 1);

    if (!hard) {
      hard = medium[3];
    }


    result = result.concat(easy, medium, hard);
    return result;
  }
};
