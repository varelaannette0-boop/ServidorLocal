import express, {type Request, type Response} from "express";
import {adicionarServico, apagarServico, listarServicos, obterServico} from "./servico.js"
import { calcularOrcamento, selecionarServicos } from "./orcamento.js";

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

// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const {nome} = req.body

    const selecionarServicoResponse = selecionarServicos(nome as string)

    res.json(selecionarServicoResponse)
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const {pedido} = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)

    res.json({
         message: "Orcamento calculado com sucesso",
    orcamentoTotal: calcularOrcamentoresponse
    })
   
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});