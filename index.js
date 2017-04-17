const app = require('express')(),
    https = require('https');
    http = require('http');
    bodyparser = require('body-parser'),
    fs = require('fs'),
    program = require('commander');

program
    .option('-p --port <n>','port')
    .option('-s --httpsport <n>','httpsport')
    .option('-k --privateKey <s> ','privateKey')
    .option('-c --certificate <s>','certificate')
    .parse(process.argv);

let port = program.port ? program.port : 8080;
let sport = program.httpsport ? program.httpsport : 8081;
let privateKey = program.privateKey ? fs.readFileSync(program.privateKey) : null;
let certificate = program.certificate ? fs.readFileSync(program.certificate) : null;

let ishttps = privateKey && certificate;
let credentials;
let httpServer;
let httpsServer;

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())

app.post('/data',function(req,res){
  console.log(req)
  res.send("received");
  res.end();
})

if(ishttps){
  credentials = {key: privateKey, cert: certificate};
  httpsServer = https.createServer(credentials,app);
  httpsServer.listen(sport);
  console.log(`listening at https://localhost:${sport}`);
}

httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`listening at http://localhost:${port}`);
