import express from "express";
import {adicionarServico} from "./servico.js"


const app = express();
       

app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

app.get("/adicionar-servico", (req, res) =>{
    const servicoType = req.body

    adicionarServico(servicoType)
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});