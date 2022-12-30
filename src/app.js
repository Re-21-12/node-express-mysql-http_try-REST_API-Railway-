//ES MODULES v18.7.0
// en packg.json colocamos : "type":module
//API REST : REST CLIENT POSTMAN:THUNDERCLIENT
import express from "express";
//import {PORT} from './config.js'
//import {pool} from './db.js'
const app = express();
import employeeRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
//MODULOS DE ECMASCRIPT ARRIBA

//lo de abajo es una prueba de conexion como lo de ayer pero mas facil usando promises y async functions

//para convertir los datos a JSON creo que era un middleware
app.use(express.json());

//para que todo sea obtenido a traves de una ruta antes '/api'

app.use("/api", employeeRoutes);
app.use(indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoints not found",
  });
});
export default app;