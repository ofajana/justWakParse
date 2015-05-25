var express=require('express');
var router=express.Router();


router.get('/order_test.txt', function(req, res) {
  var jwr='#JW0000001*1*59*1;Chiken;3.00;1;beefsteak;7.10;1;hamburger;5.50;*0*0;29.10;4;Tom;Address of the Customer;15:47 03-08-10;113;7;cod:;008612345678;*Comment#';
var jwrb="";
        res.writeHeader(200, {"Content-Type": "text/plain"});  // <-- HERE!
        res.write(jwr);  // <-- HERE!
        //res.write(jwrb);  // <-- HERE!
        res.end();
});
module.exports = router;

