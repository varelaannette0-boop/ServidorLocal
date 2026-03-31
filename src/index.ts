import express, {type Request, type Response} from "express";
import {router as serviceRouter} from "./routes/servico.route.js"
import {router as orcamentoRoter} from "./routes/orcamento.route.js"
import {router as prestadorRoter} from "./routes/prestador.route.js"
import {router as userRoter} from "./routes/users.route.js"
import {router as propostaRoter} from "./routes/proposta.route.js"
import {router as pretacaoServicoRoter} from "./routes/prestacao.servico.route.js"
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi, { serve } from "swagger-ui-express"
import dotenv from "dotenv"

const app = express();
app.use(express.json())

dotenv.config()

app.use("/service", serviceRouter)
app.use("/orcamento", orcamentoRoter)
app.use("/prestador", prestadorRoter)
app.use("/users", userRoter)
app.use("/proposta", propostaRoter)
app.use("/prestacao-servico", pretacaoServicoRoter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


       

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.send("Hello World");
});


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});