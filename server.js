const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(MongoDB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected");    
}).catch(err => {
    console.log('Could not connect ', err);
    process.exit();
});


app.use(bp.urlencoded({ extended: true }));

app.use(bp.json());

app.get('/', (req, res) => {
    res.send("You can record all summaries for league of legends game here");
});

let PORT = 8080

require('./app/routes/app.routes.js')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
