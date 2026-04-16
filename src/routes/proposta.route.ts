
import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controler.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.models.js"



const PropostaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    accept: "/accept/:id"
   
}

const router = Router()


router.post(PropostaRoute.create, PropostaController.create)

router.use(AuthMiddleware)

router.get(PropostaRoute.getAll, authorize([Role.ADMIN]), PropostaController.getAll)
router.get(PropostaRoute.getById, authorize([Role.ADMIN]), PropostaController.get)
router.post(PropostaRoute.create, authorize([Role.PRESTADOR, Role.EMPRESA, Role.ADMIN]), PropostaController.create)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel) "owner",PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), isOwner(PropostaModel) "owner", PropostaController.delete)
router.put(PropostaRoute.accept, authorize([Role.ADMIN, Role.EMPRESA, Role.PRESTADOR]), PropostaController.accept)

export { router }