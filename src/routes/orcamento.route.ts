import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controler.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.models.js"

const OrcamentoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE]), OrcamentoController.getAll)
router.get(OrcamentoRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE]),OrcamentoController.get)
router.post(OrcamentoRoute.create, authorize([Role.CLIENTE]),  OrcamentoController.create)
router.put(OrcamentoRoute.update, authorize([Role.ADMIN,  Role.CLIENTE]), isOwner(PropostaModel, "owner"),OrcamentoController.update)
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), isOwner(PropostaModel, "owner"), OrcamentoController.delete)

export { router }