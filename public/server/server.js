const express = require('express');
require('./mongo.config');

<<<<<<< 81dee0a8c5085efb6b4fab93ae0b23cad215d4dd
const app = express();
=======

>>>>>>> [feat] Server side hook up on 9999
app.use('/', express.static(`${__dirname}/../..`));

app.listen(process.env.PORT || 9999);

console.log('Server is running on Port 9999');

