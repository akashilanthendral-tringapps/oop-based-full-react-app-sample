const mysql2 = require('mysql2');

const conn = mysql2.createConnection({
    database:"employeedatabase",
    host:"localhost",
    user: "root",
    password: "Mysql.pw.5.@"
});

const deleteParticularEmployeeById = (req,resp) => {
    const id_ = req.params.id;
    conn.connect((err) => {
        if(err){
            console.log("ERROR CONNECTING TO DB");
            resp.send("ERROR CONNECTING TO DB");
        }else{
            
            conn.query("DELETE FROM employeetable WHERE id = ?",id_, (err,result) => {
                if(err){
                    console.log(`ERROR deleting data with id = ${id_} TO DB`);
                    console.log(err);
                    resp.send(`ERROR deleting data with id = ${id_} TO DB`);
                }else{
                    console.log(result);
                    resp.send(result);
                }
            })
        }
    })
};

const deleteAllEmployee = (req, resp) => {
    conn.connect((err) => {
        if(err){
            console.log("CANNOT CONNECT WHILE DELETING ALL EMPLOYEES...");
            resp.status(500).json({"error": err});
        }else{
            conn.query("DELETE FROM employeetable WHERE id > 0;", (err, res) => {
                resp.send(res);
            })
        }
    })
}

const getAllEmployee = (req,resp) => {
    console.log("inside get");
    conn.connect((err) =>{
        if(err){
            console.log("error: in get method!");
            console.log(err);
            return resp.send({"error" : err});
        }
        console.log("inside...");
        conn.query("select * from employeetable", (err, result) =>{
            console.log(result);
            return resp.send(result);
        })
    })
};
const updateEmployee = (req,resp) => {
    console.log("INSIDE UPDATE_EMPLOYEE...");
    const id_ = req.body.id;
    const salary_ = req.body.salary;
    conn.connect((err) =>{
        if(err){
            console.log("ERROR CONNECTING THE DB!");
            resp.send({"error":"connot connect to DB"});
        }else{
            conn.query("UPDATE employeetable SET salary = ? WHERE id = ?",[salary_, id_], (err, result) => {
                if(err){
                    console.log("ERROR UPDATING THE DB WITH SALARY");
                    resp.send({"Error":"cannot update"});
                }else{

                    resp.status(200).send("successfully updated");
                }
            });
        }
    })
}
const createEmployee = (req,resp) => {
        const name = req.body.name;
        const age = req.body.age;
        const position = req.body.position;
        const salary = req.body.salary;
    
        console.log("Inside post:");
        
        conn.connect((err) => {
            if(err){
                console.log("ERROR CONNECTING TO DATABASE"+err);
            }else{
                
                conn.query("SELECT COUNT(*) AS total FROM employeetable", (err, result) => {
                    if(err){
                        console.log("ERROR: CANNOT FETCH COUNT(*) FROM DB"+ err);
                    }else{
                        
                        const countt = JSON.parse(result[0].total + "");
                        //If there is no Data in DB
                        //Add the data as the first element
                        if(countt == 0){
                            console.log(name, age, position, salary);
                            conn.query("INSERT INTO employeetable values(?,?,?,?,?)",[1, name, age, position, salary], (err, result) => {
                                if(err){
                                    console.log("while inserting employee details for ID = 1"+err);
                                }else{
                                    resp.json({"id_created":1});
                                }
                            });
                        }//If employee data is already present
                        else{
                            conn.query("SELECT MAX(id) AS m FROM employeetable", (err,result) =>{
                                if(err){
                                    console.log("ERROR FETCHING MAX(id) FROM emp: "+ err);
                                }else{
                                    const maxx = JSON.parse(result[0].m + "") + 1;
                                    conn.query("INSERT INTO employeetable VALUES(?,?,?,?,?)", [maxx, name, age, position, salary], (err, result) => {
                                        if(err){
                                            console.log("ERROR INSERTING DATA INTO emp:"+ err);
                                        }else{
                                            resp.json({"id_created":maxx});
                                        }
                                    })
                                }
                                
    
                            })
                        }
    
                    }
                })
            }
        })
    }
module.exports = {createEmployee, updateEmployee, getAllEmployee, deleteParticularEmployeeById, deleteAllEmployee};