require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world from jw!");
});
Parse.Cloud.define("helloa", function(request, response) {
  response.success("Halloooa  world from jw!");
});



function getSequence(callback) {
    var Test = Parse.Object.extend("OrderNoSequence");
    var query = new Parse.Query(Test);
        //console.log('Getting the Sequence object');
    query.get("Vl1B4Oonga", { 
        success: function(object) {
            object.increment('orderNo');
            object.save(null,{
                success:function(object) {
                    //console.log('In success from getSequence save');
                    callback(object.get('orderNo'));
                },
                error:function(object,error) { 
                    //console.log('In error from getSequence save');
                    //console.log(error);
                    callback(undefined);
                }
            });
        }, error: function (error) { 
                        //console.log('In error from getSeq get');
            console.log(error);
            callback(undefined);
        }
    });
};

Parse.Cloud.beforeSave("Order", function (request, response) { 

    if (  request.object.isNew()) { 
        getSequence(function(sequence) { 
            if (sequence) {
                request.object.set("orderNo", sequence);
                response.success();
            } else {
                response.error('Could not get an orderNo.')
            }
        });
    } else {
        response.success();
    }

});