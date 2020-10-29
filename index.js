const express = require ('express');
const bodyParser = require ('body-parser');
const app = (module.express = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const projects = require ('./controllers/projects')();
const issues = require('./controllers/issues')();
const comments = require('./controllers/comments')();


app.use(async (req, res, next) => {
  const ErrorMessage = {
      error: 'Error Authorize',
      message: 'Permission denied',
      code: 'xxx',
    };

    const suppliedKey = req.headers['x-api-key'];
    const clientIp =
        req.header['x-forwarded-for'] || req.connection.remoteAddress;

            if(!suppliedKey) {
            console.log('Error authorize, no key supplied');
            new Date(), clientIp;
            ErrorMessage.code = '01';
            return res.status(401).json(ErrorMessage);
        }


    const users = await usersModel.getByKey(suppliedKey);

            if(!users) {
            ErrorMessage.code = '02';
            return res.status(401).json(ErrorMessage);
        }

        next();
    });
        
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
 });

 app.use((req, res) => {
     res.status(404).json({
         error: 404,
         message: 'Route not found',
        });
    });
