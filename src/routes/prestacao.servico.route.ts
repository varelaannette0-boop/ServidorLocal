import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao-servico.controler.js"
import { Role } from "../utils/types.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { PropostaModel } from "../models/proposta.models.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhado"
}

const router = Router()

router.use(AuthMiddleware)

router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN, Role.PRESTADOR]), PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR]), PrestacaoServicoController.get)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, authorize([Role.ADMIN, Role.PRESTADOR]), PrestacaoServicoController.getAllPrestacaoServicoDetalhada)
router.post(PrestacaoServicoRoute.create, authorize([Role.PRESTADOR]), PrestacaoServicoController.create)
router.put(PrestacaoServicoRoute.update, authorize([Role.PRESTADOR]), isOwner(PropostaModel, "owner"), PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN]), isOwner(PropostaModel, "owner"),PrestacaoServicoController.delete)


export { router }