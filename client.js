/*jshint esversion: 6 */
const net = require('net');
const url = process.argv[2];
const method = process.argv[3];
const header_hidden = process.argv[4];
const os = require('os');
const networkInterfaces = os.networkInterfaces();


const client = net.createConnection({ port: 8080 }, () => {
  const date = new Date().toUTCString();
  const address = networkInterfaces[Object.keys(networkInterfaces)[1]][0].address;
  const header = `${method} ${url} HTTP/1.1
Date: ${date}
Address: ${address}
User-Agent: Node 7.9.0`;

  client.write(header);

  client.on('data', (data) => {
    const response = data.toString().split('\n');

    console.log(header_hidden);
    if (header_hidden === "true"){
      process.stdout.write(`${response[0]}
${response[1]}
${response[2]}
${response[3]}`);
    } else if (header_hidden === "false") {
      process.stdout.write(data.toString());
    }
  });
});


