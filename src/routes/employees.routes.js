import { Router } from "express";
import { deleteEmployee, getEmployees,getEmployee, updateEmployee } from "../controllers/employees.controllers.js";
import { createEmployee } from "../controllers/employees.controllers.js";
const router = Router()
//rutas : CRUD
//router === app 
//varios empleados:
router.get('/employees',getEmployees)
//un empleado con PARAMS relacionado con framework EXPRESS
router.get('/employees/:id',getEmployee)

router.post('/employees',createEmployee)

//router.put('/employees/:id',updateEmployee)//actualiza completamente
router.patch('/employees/:id',updateEmployee) //actualiza parcialmente -> unos datos
//son consideraciones de res

router.delete('/employees/:id',deleteEmployee)

export default router