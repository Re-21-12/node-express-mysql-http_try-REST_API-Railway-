import { pool } from "../db.js";

//TODAS LAS OPERACIONES REALIZABLES DE UN _CRUD_ EN UNA BASE DE DATOS ES UNA CONSULTA ASYNCRONA
//CONTROLLERS PARA MANTENER ORDEN

//varios empleados
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
//un empleado
//http://localhost:3000/api/employees/1
export const getEmployee = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
    req.params.id,
  ]);
  if (rows.length <= 0)
    return res.status(404).json({
      message: "Employee not found",
    });
  res.json(rows[0]);
};

export const createEmployee = async (req, res) => {
  try {
    //vamos a obtener los valores JSON de lo que recibe el request
    const { name, salary } = req.body;
    //lo de abajo es una consulta asyncrona por lo tanto lleva promesas o bueno hay varias maneras
    //hay que colocarlo siempre en orden
    const [rows] = await pool.query(
      "INSERT INTO employee(name,salary) VALUES (?,?)",
      [name, salary]
    );
    //usamos llaves para que lo devuelva como un objeto JSON
    //55:17
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//export const createEmployee = (req,res)=> res.send('creando empleados')

//ELIMINANDO EMPLEADOS
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
      _,
    ]);
    //si es mayor de 0 es por que no se ha encontrado
    if (result <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    //codigo 204 todo chill pero nada de info
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

//actualizar
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    //IFNULL(?) -> si esta vacio no lo tomes
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    //console.log(result)
    //console.log(result)
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found 404",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
