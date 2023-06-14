const http = require("http"); // for creating server in http
const fs = require('fs'); //helps to read, write files

//creating server
const server = http.createServer((req, res) => {

  //requesting url from server
  const url = req.url;
  //requesting method from server
  const method = req.method;

  //=== means its true
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  //creating files
  if (url === '/message' && method === 'POST') {
    const body = [];// making an empty array to store the value given by user
    req.on('data', chunk => {
      body.push(chunk); //push the chuck data into empty array
      //! console.log(body)
    }); // req.on helps to listen the events that have be occured

    //end helps to convert buffer data into string data
    // we wirte return before res.on(end) in oder res.on(end) code to be execute 
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1]; // this helps to slip = and start with the index 1 of the value that was given by the user
      //! console.log(message)


      //? this this synchoronous which  blocks the code after throwing error and throw  excetion 
      // fs.writeFileSync("message.text", message);
      // res.setState = 302;
      // res.setHeader("Location", "/");
      // return res.end();

      //? to solve it 
      // this line of the code will execute only when the user have puten the value
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });

    });

  };

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3001);
