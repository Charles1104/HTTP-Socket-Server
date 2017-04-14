/*jshint esversion: 6 */

const net = require('net');
const fs = require('fs');

const server = net.createServer(request => {

  request.on('data', (data) => {
    const dataArray = data.toString().split('\r\n');
    const requestLine = dataArray[0].split(' ');
    console.log(requestLine);

    const method = requestLine[0];
    const path = requestLine[1];
    const httpVersion = requestLine[2];


    if (method === "GET") {
      getPath(path, function(file){
        request.write(file);
        request.end();
      });
    }
  });
});

function genResponse(file, callback){
  const date = new Date().toUTCString();
  const fileEXT = file.slice(file.lastIndexOf(".")+1);

  fs.readFile(file, 'utf8',function(err, data){
    callback(`HTTP/1.1 200 OK
Content-Type: text/${fileEXT}
Content-Length: ${data.length}
Server: Charles-Computer
Date: ${date}


${data}`);
  });
}

function getPath(path, callback){
  switch(path){
    case "/":
    case "/index":
    case "/index.html":
      return genResponse("index.html", callback);

    case "/helium.html":
      return genResponse("helium.html",callback);

    case "/hydrogen.html":
      return genResponse("hydrogen.html",callback);

    case "/css/styles.css":
      return genResponse("./css/styles.css",callback);

    default:
      return genResponse("404.html",callback);
  }
}

server.listen(8080);
