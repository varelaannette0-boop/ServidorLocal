import express, {type Request, type Response} from "express";
import {addServicoDB, adicionarServico, apagarServico, apanharServico, deleteService, getAllServices, getServiceById, listarServicos, obterServico, updateService,} from "./servico.js"
import { calcularOrcamento, selecionarServicos, selecionarPrestadorServicos, criarPrestadorDeServico, editarPrestadorDeServico, apagarPrestadorDeServico} from "./orcamento.js";
import { getOrcamento, getUserById, getUsers, PostNewUser } from "./utils/users.js";
import type { serviceDBType } from "./utils/types.js";

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

//rota para lista todos os servicos
app.get("/listar-servico", (resq: Request, res: Response) => {
    const listServicoResponse = listarServicos()
    res.json(listServicoResponse)

})

//rota para seleciona prestadores
app.post("/selecionar-prestadores", (req: Request, res: Response) => {
    const {nome} = req.body

    const selecionarPrestadorResponse = selecionarPrestadorServicos(nome as string)

    res.json(selecionarPrestadorResponse)
})

// rota para criar prestadores
app.post("/criar-prestador", (req: Request, res: Response) =>{
    // pegar o corpo de requisicao com os dados do novo prestador
    const novoPrestador = req.body

    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador)

    res.json(criarPrestadorResponse)

})

app.put("/editar-prestador", (req: Request, res: Response)=> {
    const {nomeDoPrestador, novosDadosDoPrestador} = req.body

    const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)

    res.json(editarPrestadorResponse)
})

app.delete("/apagar-prestador", (req: Request, res: Response)=>{
    const {nomeDoPrestador} = req.query

    if (nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadorDeServico(nomeDoPrestador as string)

        res.json(apagarPrestadorResponse)
    }
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

// rota para selecionar todos os utilizadores presentes no base de dados

app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers()

    res.json(getUsersResponse)
})

// rota para selecionar todos os orcamentos presentes no base de dados

app.get("/get-orcamento", async (req: Request, res: Response) => {
    const getOrcamentoResponse = await getOrcamento()

    res.json(getOrcamentoResponse)
})

// rota para selecionar utilizadores por id

app.get("/get-user-by-id", async (req: Request, res: Response) => {
  const { id } = req.query

  if (id) {
    const getIdUserResponse = await getUserById(id as string)

    if (!getIdUserResponse) {
      res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado",
        data: null
      })
    }

    res.status(200).json({
      status: "success",
      message: "Utilizador encontrado",
      data: getIdUserResponse
    })
  } else {
    res.status(400).json({
      status: "error",
      message: "id eh obrigatorio",
      data: null
    })
  }

})

// rota para novo utilizador

app.post("/post-new-user", async (req: Request, res: Response) => {
    const dadosUtlizador = req.body
  const PostNewUserResponse = await PostNewUser(dadosUtlizador)
  
  if (PostNewUserResponse) {

    if (!PostNewUserResponse) {
      res.status(404).json({
        status: "error",
        message: "Nao foi possivel adicionar o utilizador",
        data: null
      })
    }

    res.status(200).json({
      status: "success",
      message: "Utilizador adicionado com sucesso",
      data: PostNewUserResponse
    })
  } else {
    res.status(400).json({
      status: "error",
      message: "ereei",
      data: null
    })
  }

})
;


//rota para insiri servico

app.post("/create-service",async(req:Request, res:Response)=>{
  const newService:serviceDBType = req.body

  if (!newService) {
    res.status(400).json({
      status: "error",
      message: "Dados de servicos invalidos",
      data: null
    })

    return
 }
  console.log(newService)
  const createServiceResponse = await addServicoDB(newService)
  if (createServiceResponse === null) {
    return res.status(400).json({
      status: "error",
      message: "Erro ao criar servico",
      data: null
    })
  }

  res.status(200).json({
      status: "error",
      message: "Servico Criado  com sucesso",
      data: createServiceResponse
    })
})

app.get("/get-service-by-id", async (req: Request, res: Response)=>{
  const {id} = req.params

  if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })
  }

  const getServiceByIdResponse = await getServiceById(id as string)

  if (!getServiceByIdResponse) {
     return res.status(400).json ({
      status: "Error",
      message : "Servico nao encontrado",
      data: null
     })
  }
 res.status(200).json({
      status: "error",
      message: "Servico encontrado",
      data: getServiceByIdResponse
    })

})

app.get("/get-all-services", async (req: Request, res: Response)=>{
  const getAllServicesResponse = await getAllServices()

  if (!getAllServicesResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao selecionar servicos",
       data: null
    })
  }

 res.status(200).json({
      status: "sucess",
      message: "Servicos encontrados",
      data: getAllServicesResponse
    })

})

app.put("/update-service-by-id/:id", async (req: Request, res: Response)=>{
  const {id} = req.params

  const updatedService: serviceDBType = req.body

  if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })

  }

  if (!updatedService) {
    return res.status(400).json({
      status: "error",
       message: "Dados de servicos invalidos",
       data: null
    })
  }

const updateServiceResponse = await updateService(id as string, updatedService)

if (!updateServiceResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao atualizar servico",
       data: null
    })
  }

  return res.status(200).json({
    status: "success",
    message: "servico atualizado com sucesso",
    data: updateServiceResponse
  })


})


app.delete("/delete-service-by-id", async (req: Request, res: Response)=>{
  const {id} = req.params
 if (!id) {
    return res.status(400).json({
      status: "error",
       message: "ID obrigatorio",
       data: null
    })
 }

  const deleteServiceResponse = await deleteService(id as string)

  if (!deleteServiceResponse) {
    return res.status(400).json({
      status: "error",
       message: "Erro ao atualizar servico",
       data: null
    })
  }
  return res.status(200).json({
    status: "success",
    message: "servico atualizado com sucesso",
    data: deleteServiceResponse
 })
})









// rota para listar servico


app.get("/listarServico",async(req:Request,res:Response)=>{
  
  console.log("servico apanhado")
  const listarServicosResponse = await apanharServico()
  res.json (listarServicosResponse)
})


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});