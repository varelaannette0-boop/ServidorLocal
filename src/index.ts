import express, {type Request, type Response} from "express";
import {adicionarServico, apagarServico, listarServicos, obterServico} from "./servico.js"


const app = express();
app.use(express.json())
       

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});
// rota para adicionar servicos novos
app.post("/adicionar-servico", (req: Request, res: Response) =>{
    const servicoType = req.body

    const addServicoResponse = adicionarServico(servicoType)
    console.log("servicoType")
    res.json(addServicoResponse)
})

//rota para listat todos os servicos
app.get("/listar-servico", (resq: Request, res: Response) => {
    const listServicoResponse = listarServicos()
    res.json(listServicoResponse)

})

//rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) =>{
    const {nome} = req.query

    if (nome) {
         const apagarServicoResponse = apagarServico(nome as string)

         res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do servico e obrigatorio"
        })
    }
   
})

//rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) =>{
    const {nome} = req.query

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)

        res.json(obterServicoResponse)
    } else {
        res.json({
            message:"Nome do servico e obrigatorio"
        })
    }
})


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});