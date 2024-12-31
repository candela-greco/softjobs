import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes/user.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

//TENES QUE VER PORQUE NO FUNCIONA EL GET CUANDO SE INICIA SESION

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use("/softjobs", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});