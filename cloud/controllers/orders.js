var Order = Parse.Object.extend('Order');
var OrderItem = Parse.Object.extend('OrderItem');
var Restaurant = Parse.Object.extend('Restaurant');

var startEnd="#";
var semiC=";"
var star="*";

/*
a --> restId
o -> orderNo
ak -> Response i.e. Accepted /Rejected
m --> Reason for Rejection  NB: OK when order is accepted
dt - Date (Rejected at / Accepted For)
u - user
p - password



*/

/* OrderClass.type maps to
orderType 1- Delivery, 2 - Collection 
Customer Type - 4 - Verified, 5 - Not Verified : Should map to User Class


*/

exports.orderReply=function(req,res){
  if ( (! req.query.a) || (! req.query.o)){
     // No Rest Id or Order Id
  } else {
        var restaurantQuery=new Parse.Query(Restaurant);
        restaurantQuery.equalTo("objectId",req.query.a);
        var orderQuery=new Parse.Query(Order);
        orderQuery.equalTo("orderNo",parseInt(req.query.o));
        orderQuery.matchesQuery("restaurant",restaurantQuery);
         orderQuery.find({
     		success: function(result){
     		    console.log( parseInt(req.query.o) + "   1CCCCC go entry with status size " + result.length);// + result[0].get("status"));
     		   console.log("jjjjjEEEEEE go entry with status " + result[0].get("status"));

     		   result[0].set("status",req.query.ak);
     		   result[0].set("reason",req.query.m);
     		   result[0].set("processed",true);
               result[0].save();
               res.writeHead(200, {"Content-Type": "text/plain"});  // <-- HERE!
               res.end();


     		},
     		error: function(error){
                 console.log("Query was not successful");
            }
         });   
  }
   for(var param in req.query){
       console.log("---- Req Parameter " + param + " is " + req.query[param]);
   }

};


exports.show=function(req,res){
   if ( ! req.query.a ){
      console.log("XXXXXX No Restaurant Id");
    } else {
      console.log("XXXXXX  Restaurant Id is " + req.query.a); 
        var restaurantQuery=new Parse.Query(Restaurant);
        restaurantQuery.equalTo("objectId",req.query.a);
        var orderQuery=new Parse.Query(Order);
        orderQuery.matchesQuery("restaurant",restaurantQuery);
        orderQuery.limit(1);
        orderQuery.equalTo('processed',false);
        orderQuery.include("items");
            orderQuery.find({
     success: function(result){
        var retVal=startEnd + req.query.a + star;
        console.log("Query was successful  aaaa" + result.length + " in total returned");
        for(var x=0;x<result.length;x++){
           console.log("ID = " + result[x].id + " processed ? " + result[x].get("processed"));
           retVal += result[x].get("type") + star;
           retVal += result[x].get("orderNo") + star;

           var ditems=result[x].get("items");
           console.log("Entry Items count " + ditems.length);
           for(var y=0;y<ditems.length;y++){
                      retVal += ditems[y].get("quantity") + semiC;
                      retVal += ditems[y].get("item") + semiC;
                      retVal += "₦" + (ditems[y].get("price")  *  ditems[y].get("quantity")+ semiC);


                      console.log(ditems[y].id + " Entry Items  item " + ditems[y].get("item") + " price " +ditems[y].get("price") + " Qty " + ditems[y].get("quantity") );

           }
            retVal += star +  "₦0.0" + star + "₦0.0;₦21,000.99;4;Firt Cust;22 The Road;5:00PM;6;6;xxxxxxx;080345;*Please call when you arrivce#" ;

        console.log("Entry Items  " + ditems);
        res.writeHead(200, {"Content-Type": "text/plain"});  // <-- HERE!
        res.write(retVal);  // <-- HERE!
        //res.write(jwrb);  // <-- HERE!
        res.end();

        }
        


		
		//res.send(result);
     },
     error: function(error){
                 console.log("Query was not successful");
     }
     }
 );
   
    }

};
exports.showold=function(req,res){
  var orderQuery=new Parse.Query(Order);
  //orderQuery.limit(1);
  orderQuery.equalTo('processed',false);
  orderQuery.include("items");
   // orderQuery.include("items.item");


 // orderQuery.find().then({
    orderQuery.find({
     success: function(result){
        console.log("Query was successful  aaaa" + result.length + " in total returned");
        for(var x=0;x<result.length;x++){
           console.log("ID = " + result[x].id + " processed ? " + result[x].get("processed"));
           var ditems=result[x].get("items");
           console.log("Entry Items count " + ditems.length);
           for(var y=0;y<ditems.length;y++){
                      console.log(ditems[y].id + " Entry Items  item " + ditems[y].get("item") + " price " +ditems[y].get("price") + " Qty " + ditems[y].get("quantity") );

           }
        console.log("Entry Items  " + ditems);
//res.send(ditems);
          // var oit=result[x].get("OrderItem");
          // console.log("XXXX order item is " + oit);
              //  var ao=new OrderItem();
        /* ao.set('item','Egg');
         ao.set('quantity',4);
         ao.set('price',4.50);
         ao.set('orderId',result[x].id);
 
         result[x].add('items',ao);
        var bo=new OrderItem();
        bo.set('item','Yam');
        bo.set('quantity',3);
        bo.set('price',1.50);
        bo.set('orderId',result[x].id);
// 
                result[x].add('items',bo);
        result[x].save();*/

        }
        


		
		res.send(result);
     },
     error: function(error){
                 console.log("Query was not successful");
     }
     }
 );
};


 /*function(result){
    if ( result ) {
  		console.log("Found an order  - - " + result.length);
  		res.success(result);
  		for( x =0 ; x < result.length; x++){//in result){
  			console.log("Result Entry " + result[x]);
  		}
    } else {
      console.log("Query ok, but no data");
    }
  },
  function(){
    console.log("Found nada");

  }*/