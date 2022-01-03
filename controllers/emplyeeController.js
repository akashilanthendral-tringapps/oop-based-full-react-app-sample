const mysql2 = require('mysql2');
const {Employee} = require("../model/Employee.js");
const conn = mysql2.createConnection({
    database:"employeedatabase",
    host:"localhost",
    user: "root",
    password: "Mysql.pw.5.@"
});

const getParticularEmployeeById = (req, resp) => {
    const id_ = req.params.id;
    let emp = new Employee();
    emp.setId(id_);
    emp.getEmployeeByid((status_, result) => {
        return status_ === 0 ? resp.status(500).send(result) : resp.status(200).send(result);
    })
}
const deleteParticularEmployeeById = (req,resp) => {
    const id_ = req.params.id;
    let emp = new Employee();
    emp.setId(id_);
    emp.deleteById((status_, result) =>{
        if(status_ == 0){
            resp.status(500).json({"error: cannot delete": result});
        }else{
            resp.status(200).json({"successfully deleted": result});
        }
    });
};

const deleteAllEmployee = (req, resp) => {
    Employee.deleteAllEmployee((status_, result) =>{
        if(status_ === 0){
            resp.status(500).json({"error: cannot delete": result});
        }else{
            resp.status(200).json({"successfully deleted": result});
        }
    });
}

 const getAllEmployee =  (req, resp)=>{
    let emp  = new Employee();
    emp.getAllEmployees((status_, result)=>{
        console.log("Inside controller: ", result);
        
        return status_ === 0 ? resp.status(500).send(result) : resp.status(200).send(result);
    });
}
    
const updateEmployeeName = (req,resp) => {
    console.log("UPDATE EMPLOYEE NAME METHOD CALLED!");
    let {id, name} = req.body;
    let emp = new Employee();

    emp.setName(name);
    emp.setId(id);
    emp.updateEmployee("name", (status_, result) => {
        if(status_ !== 0){
            resp.status(200).send(result);
        }else{
            resp.status(500).send(result);
        }
    });
};
const updateEmployeeAge = (req, resp) => {

    let {id, age} = req.body;
    let emp = new Employee();
    
    emp.setAge(age);
    emp.setId(id);
    console.log("emp.age = ", emp.age);
    emp.updateEmployee("age", (status_, result) => {
        if(status_ !== 0){
            resp.status(200).send(result);
        }else{
            resp.status(500).send(result);
        }
    });
}

const updateEmployeeSalary = (req,resp) => {
    let {id, salary} = req.body;
    let emp = new Employee();

    emp.setSalary(salary);
    emp.setId(id);
    emp.updateEmployee("salary", (status_, result) => {
        if(status_ !== 0){
            resp.status(200).send(result);
        }else{
            resp.status(500).send(result);
        }
    });
};
const updateEmployeePosition = (req, resp) => {
    
    let {id, position} = req.body;
    let emp = new Employee();
    
    emp.setPostion(position);
    emp.setId(id);
    
    emp.updateEmployee("position", (status_, result) => {
        if(status_ !== 0){
            resp.status(200).send(result);
        }else{
            resp.status(500).send(result);
        }
    });
}
const createEmployee = (req, resp) => {
    const { name, age, position, salary} = req.body;
    const emp = new Employee(0, name, age, position, salary);
    emp.insertEmployee((status_, result) => {
        if(status_ !== 0){
            resp.status(200).send(result);
        }else{
            resp.status(500).send(result);
        }
    })
}

const updateAllAttributesOfEmployee = (req, resp) => {
    console.log("UPDATE updateAllAttributesOfEmployee METHOD CALLED!");
    const {id, name, age, position, salary} = req.body;
    let emp = new Employee(id, name, age, position, salary);
    emp.updateAllAttributesOfEmployee((status_, result) => {
        if(status_ !== 0){
            console.log("Result fetched successfully...");
            console.log(result);
            resp.status(200).send(result);
        }else{
            console.log("Result not fetched successfully...");
            console.log(result);
            resp.status(500).send(result);
        }
    });
}
module.exports = {updateAllAttributesOfEmployee, getParticularEmployeeById, updateEmployeeSalary, updateEmployeePosition, createEmployee, updateEmployeeName, updateEmployeeAge, getAllEmployee, deleteParticularEmployeeById, deleteAllEmployee};