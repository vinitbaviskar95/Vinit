var mysql = require("mysql");
var express =  require("express");
var empRouter = express();

const connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'manager',
database : 'angular' 
});

var myData = [];
connection.connect();

empRouter.get("/",function(request,reponse){
let query = `select * from Students`;
connection.query(query,function(error,result){
    console.log(query);
    if(error==null)
    {
        myData = result;
        reponse.contentType("application/json");
        reponse.send(JSON.stringify(myData));
    }
    else
    {
        reponse.send("ERROR");
    }
});
});

empRouter.get("/:No",function(request,reponse){
console.log("Searched For " + request.params.No);
let query = `select * from Students where No = ${request.params.No}`;
connection.query(query,function(error,result){
if(error==null)
{
    myData = result;
    reponse.contentType("application/json");
    reponse.send(JSON.stringify(myData));
}
});
});

empRouter.post("/",function(request,reponse){
    
let no = parseInt(request.body.No);
let name = request.body.Name;
let address = request.body.Address;

let query = `insert into Students values(${no}, '${name}','${address}')`;
console.log(query);

connection.query(query,function(error,result){
if(error==null)
{
    reponse.contentType("application/json");
    reponse.send(JSON.stringify(result));
}
else
{
    reponse.send("Somwthing Wrong");
    reponse.send(error);

}
});
});

empRouter.put("/:No",function(request,reponse){
let no = parseInt(request.body.No);
let name = request.body.Name;
let address = request.body.Address;

let query = `update Students set Name='${name}',Address='${address}' where No= ${no}`;
console.log(query);

connection.query(query,function(error,result){

    if(error==null)
{
    reponse.contentType("application/json");
    reponse.send(JSON.stringify(result));
}
else
{
    reponse.send("Something Wrong");
    reponse.send(error);
}
});
});

empRouter.delete("/:No",function(request,reponse){
    let no = parseInt(request.params.No);
    
    let query = `delete from Students where No = ${no}`;
    console.log(query);
	console.log("Vinit");
	console.log("BAviskar");
    
    connection.query(query,function(error,result){
    
        if(error==null)
    {
        reponse.contentType("application/json");
        reponse.send(JSON.stringify(result));
    }
    else
    {
        reponse.send("Something Wrong");
        reponse.send(error);
    }
    });
    });
    
    // emprouter.get("/:No", function(request, response){
    //     console.log("You searched for " + request.params.No);
    //     var empSearched= myData[parseInt(request.params.No) - 1];
    //     response.contentType("application/json");
    //     response.send(empSearched);
    // });


module.exports = empRouter;
