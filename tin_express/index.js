let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: true });

app.get('/hello', function(req, res){
    res.sendFile("views/hello.html", {root: __dirname});
});
app.get('/form', function(req, res){
    res.sendFile("views/form.html", {root: __dirname});
});
app.post('/formdata', urlencodedParser, function(req, res){
    let name = req.body.name;
    let lastname = req.body.lastname;
    let age = req.body.age;
    res.render('formdata.pug', {name, lastname, age});
});
app.post('/jsondata', function(req, res){
    let json = JSON.stringify(req.body);
    let result = JSON.parse(json);
    let name = result.name;
    let lastname = result.lastname;
    let age = result.age;
    res.render('jsondata.pug', {name, lastname, age});
});

app.listen(8080);