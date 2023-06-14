const http = require("http"); // for creating server in http
const fs = require('fs') //helps to read, write files

//creating server
const server = http.createServer((req, res) => {

  //requesting url from server
  const url = req.url;
  //requesting method from server
  const method = req.method;

  //=== means its true
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      '<body><form action ="/message" method ="POST"><input type = "text" name="message"><button type = ""submit>submit</button></form></body>'
    );
    res.write("</html>");
    //return is used so that next line of code can be execute
    return res.end();
  }
  //creating files
  if (url === '/message' && method === 'POST') {
    const body = [] // making an empty array to store the value given by user
    res.on('data', (chuck) => {
      body.push(chuck); //push the chuck data into empty array
      //! console.log(body)
    }); // res.on helps to listen the events that have be occured

    //end helps to convert buffer data into string data
    // we wirte return before res.on(end) in oder res.on(end) code to be execute 
    return res.on('end', () => {
      const bodyParse = Buffer.concat(body).toString();
      const message = bodyParse.split('=')[1]; // this helps to slip = and start with the index 1 of the value that was given by the user
      //! console.log(message)
      fs.writeFileSync("message.text", message);
      res.setState = 302;
      res.setHeader("Location", "/");
      return res.end();

    });

  };

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Making Api</title></head>");
  res.write("<body><h1>Making Api using Node js</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3001);
