const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;


const conn = mysql2.createConnection({
    database:"employeedatabase",
    host:"localhost",
    user: "root",
    password: "Mysql.pw.5.@"
});
const {updateAllAttributesOfEmployee, getParticularEmployeeById,updateEmployeeSalary, updateEmployeePosition, updateEmployeeName, updateEmployeeAge, createEmployee, getAllEmployee, deleteParticularEmployeeById, deleteAllEmployee} = require("./controllers/emplyeeController.js")

app.use(cors());
app.use(express.json());



app.listen(port, () => {
    console.log(`Server started listening at port ${port}`);
});

app.post('/create', createEmployee);


app.get('/get', getAllEmployee)
app.get('/get/:id', getParticularEmployeeById)

app.delete('/delete/:id', deleteParticularEmployeeById)
app.delete('/deleteall', deleteAllEmployee);

app.put('/update/name', updateEmployeeName);
app.put('/update/age', updateEmployeeAge);
app.put('/update/position', updateEmployeePosition);
app.put('/update/salary', updateEmployeeSalary);

app.put('/updateall', updateAllAttributesOfEmployee);