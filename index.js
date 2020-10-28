const express = require ('express');
const bodyParser = require ('body-parser');
const app = (module.express = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const users = require('./controllers/users')();
const projects = require ('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();

app.use(bodyParser.json());

app.get('/users',users.getController);
app.get('/users/:email', users.getByEmail);
app.post('/users', users.postController);


app.get('/projects', projects.getController);
app.get('/projects/:slug', projects.getBySlug);
app.post('/projects', projects.postController);

app.get('/issues', issues.getController);
app.get('/issues/:slug', issues.getByIssue);
app.get('/projects/:slug/issues', issues.getByProject);
app.post('/projects/:slugName/issues',issues.postController);


app.get('/issues/:issueNumber/comments/:commentId', comments.getComment);
app.get('/issues/:issueNumber/comments', comments.catchWhole);
app.post('/issues/:issueNumber/comments', comments.postComment);

app.get('/', (req, res)=>{
    res.send('Hello World');

});

app.listen(port, hostname, ()=>{
    console.log (`App Listening at http://${hostname}:${port}`);
 })