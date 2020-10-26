const express = require ('express');
const app = express ();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

app.get('/', (req, res)=>{
    res.send('Hello World');

});

app.listen(port, hostname, ()=>{
    console.log (`App Listening at http://${hostname}:${port}`);

})