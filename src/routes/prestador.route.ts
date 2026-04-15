import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controler.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestadorRoute.create, PrestadorController.create)

router.use(AuthMiddleware)

router.get(PrestadorRoute.getAll, authorize([Role.ADMIN, Role.PRESTADOR]), PrestadorController.getAll)
router.get(PrestadorRoute.getById, authorize([Role.ADMIN, Role.PRESTADOR]), PrestadorController.get)
router.post(PrestadorRoute.create, authorize([Role.PRESTADOR]), PrestadorController.create)
router.put(PrestadorRoute.update, authorize([Role.PRESTADOR]), PrestadorController.update)
router.delete(PrestadorRoute.delete, authorize([Role.PRESTADOR]), PrestadorController.delete)

export { router }