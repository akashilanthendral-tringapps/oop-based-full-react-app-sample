const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const e = require('express');
const app = express();
const port = 3001;
const {updateEmployee, createEmployee, getAllEmployee, deleteParticularEmployeeById, deleteAllEmployee} = require("./controllers/emplyeeController.js")

// 'https://www.google.com/',
// app.use(cors({
//     origin: [ 'https://www.amazon.in', 'https://www.section.io']
// }));
app.use(cors({
    origin: '*'
}));
app.use(express.json());



app.listen(port, () => {
    console.log(`Server started listening at port ${port}`);
});

app.post('/create', createEmployee);

// app.get('/get', (req, resp) => {
//     console.log("inside g");
//     const arr = [1,2,3,4, "aaa"];
//     resp.send(arr); 
// });
app.get('/get', getAllEmployee)

app.delete('/delete/:id', deleteParticularEmployeeById)
app.delete('/deleteall', deleteAllEmployee);

app.put('/update', updateEmployee)