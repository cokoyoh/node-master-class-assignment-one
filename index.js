/**
 * Details:
 * Please create a simple "Hello World" API. Meaning:
 * 1. It should be a RESTful JSON API that listens on a port of your choice.
 * 2. When someone sends an HTTP request to the route /hello, you should return a welcome message, in JSON format. 
 * This message can be anything you want. 
 */

const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('./routes');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  let requestData = {
    trimmedPath,
    query: parsedUrl.query,
    headers: req.headers,
    method: req.method.toLowerCase(),
  }

  req.on('data', (data) => {
    buffer += decoder.write(data);
  })

  req.on('end', () => {
    buffer += decoder.end();

    requestData = { ...requestData, payload: buffer };

    // pass the request data to the controller and return response
    const controller = typeof (routes[trimmedPath]) == 'function' ? routes[trimmedPath] : routes.notFound;

    controller(requestData, (statusCode, payload) => {
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

      payload = typeof (payload) == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-Type', 'application.json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Request processed. Returned payload: ', statusCode, payloadString);
    })
  })
})

const port = process.env.port | 3000;

server.listen(port, () => {
  console.log(`server running on port ${port}`);
})