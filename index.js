const app = require('express')(),
    bodyparser = require('body-parser'),
    program = require('commander');

program
    .option('-p --port <n>','port')
    .parse(process.argv);

let port = program.port ? program.port : 8080;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())

app.post('/data',function(req,res){
  console.log(req);
  res.send("received");
  res.end();
})

app.listen(port);

console.log(`listening at http://localhost:${port}`);
