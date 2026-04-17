import { EmpresaModel } from "../models/empresa.models.js"

export const EmpresaController = {
    async create(req, res) {
        const result = await EmpresaModel.create(req.body)

        if (!result) {
            return res.status(400).json({ status: "error" })
        }

        return res.json(result)
    }
}