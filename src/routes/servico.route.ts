import { Router } from "express"
import { ServicoController } from "../controllers/servico.controler.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { UserController } from "../controllers/users.controler.js"

const ServiceRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    resetPassword: "/resetPassword",
    getAllDetailed: "/all-detailed"
}

const router = Router()

router.post(ServiceRoute.login, ServicoController.login)

router.post(ServiceRoute.create, ServicoController.create)

router.use(AuthMiddleware)


router.get(ServiceRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.getAll)
router.get(ServiceRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServicoController.get)
router.put(ServiceRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]),  ServicoController.update)
router.delete(ServiceRoute.delete, authorize([Role.ADMIN]), ServicoController.delete)
router.put(ServiceRoute.resetPassword, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]))

export { router }