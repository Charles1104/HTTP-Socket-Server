/*jshint esversion: 6 */
const net = require('net');
const url = process.argv[2];
const os = require('os');
const networkInterfaces = os.networkInterfaces();


const client = net.createConnection({ port: 8080 }, () => {
  const date = new Date().toUTCString();
  const address = networkInterfaces[Object.keys(networkInterfaces)[1]][0].address;
  const header = `GET ${url} HTTP/1.1
Date: ${date}
Address: ${address}
User-Agent: Node 7.9.0`;

  client.write(header);

  client.on('data', (data) => {
    console.log(data);
    const response = data.toString();
    process.stdout.write(response);
  });

});


