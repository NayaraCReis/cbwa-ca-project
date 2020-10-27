const express = require ('express');
const bodyParser = require ('body-parser');
const app = (module.express = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const users = require('./controllers/users')();

app.use(bodyParser.json());

app.get('/users',users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users' , users.postController);
app.get('/', (req, res)=>{
    res.send('Hello World');

});

app.listen(port, hostname, ()=>{
    console.log (`App Listening at http://${hostname}:${port}`);

})