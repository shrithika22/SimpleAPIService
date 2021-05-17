const express = require('express')
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes');
routes(app);

app.listen(port, function() {
   console.log('Server started on port: ' + port);
});