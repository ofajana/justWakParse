
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();
var router = express.Router();
var routes = require('cloud/routes/index.js');

var orderController = require('cloud/controllers/orders.js');


// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body


// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

//app.get('/', function(req, res) {
//  res.render('index', { message: 'Congrats, you just set up your app!' });
//});



app.get('/orderReply',orderController.orderReply);
app.get('/orders',orderController.show);
app.get('/order_test.txt', function(req,res) {
  var jwr='#JW0000001*1*59*1;Chiken;3.00;1;beefsteak;7.10;1;hamburger;5.50;*0*0;29.10;4;Tom;Address of the Customer;15:47 03-08-10;113;7;cod:;008612345678;*Comment#';
var jwrb="";
        //res.writeHeader(200, {"Content-Type": "text/plain"});  // <-- HERE!
        res.writeHead(200, {"Content-Type": "text/plain"});  // <-- HERE!
        res.write(jwr);  // <-- HERE!
        //res.write(jwrb);  // <-- HERE!
        res.end();
});


app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
