const express =  require('express');
const config = require('config');

const appForEmps = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });


appForEmps.get("/", (request, response)=>{
  
    connection.query(`select * from Employee_tb`, (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

appForEmps.post("/", (request, response)=>{
    

    var query = 
    `insert into Employee_tb values(${request.body.id}, '${request.body.ename}','${request.body.email}','${request.body.password}',${request.body.empid}, '${request.body.dname}','${request.body.doj}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

appForEmps.put("/:id", (request, response)=>{
    //response.send("EMPS PUT IS CALLED");
    var query = 
    `update Employee_tb set dname = '${request.body.dname}',
                    doj = '${request.body.doj}' where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

appForEmps.delete("/:id", (request, response)=>{

    var query = 
    `delete from Employee_tb where id = ${request.params.id}`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

module.exports = appForEmps;