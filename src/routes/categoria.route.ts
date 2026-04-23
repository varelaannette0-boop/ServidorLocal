import { Router } from "express"
import { CategoriaController } from "../controllers/categoria.controler.js"
import AuthMiddleware, { authorize, isOwner } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { CategoriaModel } from "../models/categoria.models.js"

const CategoriaRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()


router.use(AuthMiddleware)


router.get(
    CategoriaRoute.getAll,
    authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE]),
    CategoriaController.getAll
)


router.get(
    CategoriaRoute.getById,
    authorize([Role.ADMIN, Role.PRESTADOR, Role.CLIENTE]),
    CategoriaController.get
)


router.post(
    CategoriaRoute.create,
    authorize([Role.ADMIN]),
    CategoriaController.create
)


router.put(
    CategoriaRoute.update,
    authorize([Role.ADMIN]),
    isOwner(CategoriaModel, "id_utilizador"), // ou "owner" dependendo do teu model
    CategoriaController.update
)


router.delete(
    CategoriaRoute.delete,
    authorize([Role.ADMIN]),
    isOwner(CategoriaModel, "id_utilizador"),
    CategoriaController.delete
)

export { router }