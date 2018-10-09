var body = {results: []};

var requestHandler = function (request, response) {

  console.log(
    "Serving request type " + request.method + " for url " + request.url
  );

  // The outgoing status.
  let statusCode;
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      statusCode = 200;
    } else if (request.method === 'POST') {
      statusCode = 201;
    } else {
      statusCode = 666; //THIS SHOULD NEVER HAPPEN
    }
  } else {
      statusCode = 404;
  }

  var headers = defaultCorsHeaders;
  headers["Content-Type"] = "application/json";

  response.writeHead(statusCode, headers);

  if (statusCode === 200) { // handle GET request
    console.log('Sending back: ', JSON.stringify(body))
    response.end(JSON.stringify(body));
  } else if (statusCode === 201) { // handle POST request
    console.log('We received a POST request.');

    let newMessage = '';
    request.on('data', chunk => {
      newMessage+= chunk.toString();
    });
    request.on('end', () => {

      body.results.push(JSON.parse(newMessage));

      response.end(JSON.stringify(body));
     
    });
  }


  response.end(JSON.stringify(body));
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


module.exports.requestHandler = requestHandler;
