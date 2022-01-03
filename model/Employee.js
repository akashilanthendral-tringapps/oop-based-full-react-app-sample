const mysql2 = require('mysql2');

const conn = mysql2.createConnection({
    database:"employeedatabase",
    host:"localhost",
    user: "root",
    password: "Mysql.pw.5.@"
});

 class Employee{
    constructor(id, name, age, position, salary){
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.age = age;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getAge(){
        return this.age;
    }
    getSalary(){
        return this.salary;
    }
    getPosition(){
        return this.position;
    }
    getAllEmployeeAttributes(){
        return [this.id, this.name, this.age, this.position, this.salary];
    }

    setName(name){
        this.name = name;
    }
    setAge(age){
        this.age = age;
    }
    setSalary(salary){
        this.salary = salary;
    }
    setPostion(position){
        this.position = position;
    }
    setId(id){
        this.id = id;
    }
    getEmployeeByid(returnStatusAndValue){
        conn.query("select * from employeetable where id = ?", this.id, (err, result) => {
            if(err){
                returnStatusAndValue(0, err);
            }else{
                returnStatusAndValue(1, result);
            }
        });
    }
    updateAllAttributesOfEmployee(returnStatusAndValue){
        conn.query("UPDATE employeetable SET name = ?, age = ?, position = ?, salary = ? WHERE id = ?;", [this.name, this.age, this.position, this.salary, this.id], (err, result) => {
            if(err){
                returnStatusAndValue(0, err);
            }else{
                returnStatusAndValue(1, result);
            }
        });

    }
    updateEmployee(toUpdate, returnStatusAndValue){
        console.log("name inside employee class: ", toUpdate);
        switch(toUpdate){
            case 'name': 
                console.log("inside switch case \"name\"");
                conn.query("UPDATE employeetable SET name = ? WHERE id = ?", [this.name, this.id], (err, result) => {
                    if(err){
                        returnStatusAndValue(0, err);
                    }else{
                        returnStatusAndValue(1, result);
                    }
                });
                break;
            case 'age': 
                conn.query("UPDATE employeetable SET age = ? WHERE id = ?", [this.age, this.id], (err, result) => {
                    if(err){
                        returnStatusAndValue(0, err);
                    }else{
                        returnStatusAndValue(1, result);
                    }
                });
                break;
            case 'position': 
                conn.query("UPDATE employeetable SET position = ? WHERE id = ?", [this.position, this.id], (err, result) => {
                    if(err){
                        returnStatusAndValue(0, err);
                    }else{
                        returnStatusAndValue(1, result);
                    }
                });
                break;
            case 'salary': 
                conn.query("UPDATE employeetable SET salary = ? WHERE id = ?", [this.salary, this.id], (err, result) => {
                    if(err){
                        returnStatusAndValue(0, err);
                    }else{
                        returnStatusAndValue(1, result);
                    }
                });
                break;
            default:
                returnStatusAndValue(0, ["error"]);
        };
       
    }
    insertEmployee(returnStatusAndValue){
        conn.query("SELECT MAX(id) AS max_id FROM employeetable;", (err, result) => {
            if(err){
                returnStatusAndValue(0, err);
            }else{
                console.log(result[0].max_id);
                conn.query("INSERT INTO employeetable(id, name, age, position, salary) VALUES(?,?,?,?,?)",[result[0].max_id + 1, this.name, this.age, this.position, this.salary], (err, resu) => {
                    if(err){
                        returnStatusAndValue(0, err);
                    }else{
                        returnStatusAndValue(1, resu);
                    }
                })
            }
        })
        //
    }

    //Method to get all employees
       getAllEmployees(returnStatusAndValue){
         conn.query("select * from employeetable;", (err, result)=>{
            if(err){
                console.log(err);
                returnStatusAndValue(0, err);
            }else{
                console.log("result fetched from employeetable", result);
                returnStatusAndValue(1, result);
            }
        } )
        
    }
    //Method to delete all employees from the table;
    static deleteAllEmployee(returnStatusAndValue){
        conn.connect((err) => {
            if(err){
                console.log("CANNOT CONNECT WHILE DELETING ALL EMPLOYEES...");
                returnStatusAndValue(0, err);
            }else{
                conn.query("DELETE FROM employeetable WHERE id > -1;", (err, res) => {
                    returnStatusAndValue(1, res);
                })
            }
        })
    }
    //Method to delete a particular employee by using ID;
    deleteById(returnStatusAndValue){
        conn.connect((err) => {
            if(err){
                console.log("ERROR CONNECTING TO DB");
                returnStatusAndValue(0, err);
            }else{
                
                conn.query("DELETE FROM employeetable WHERE id = ?",this.id, (err,result) => {
                    if(err){
                        console.log(`ERROR deleting data with id = ${this.id} TO DB`);
                        console.log(err);
                        returnStatusAndValue(0, err);
                    }else{
                        console.log(result);
                        returnStatusAndValue(1, result);
                    }
                })
            }
        })
    }
}
module.exports = {Employee};