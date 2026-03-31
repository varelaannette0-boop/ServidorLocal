import { Router } from "express"
import { UserController } from "../controllers/users.controler.js"
import { create } from "node:domain"
import AuthMiddleware from "../security/auth.middleware.js"


const route = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "login"


}

const router = Router()

router.post("/create", UserController.create)

router.get("/", AuthMiddleware, UserController.getAll)

router.get("/:id", UserController.getByID)

router.put("/:id", UserController.update)

router.delete("/:id", UserController.delete)



export { router }