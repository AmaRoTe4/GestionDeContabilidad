//archivo ejecutable
import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js"
import router from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api' , router);

app.get('/', (req, res)=>{
    res.send("running")
})

app.listen(PORT)
