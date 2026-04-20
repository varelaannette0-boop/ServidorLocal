import type { Request, Response } from "express"
import { EmpresaModel } from "../models/empresa.models.js"

export const EmpresaController = {

    async create(req: Request, res: Response) {
        try {
            const {
                designacao,
                descricao,
                localizacao,
                nif,
                icone,
                id_utilizador
            } = req.body

            if (!designacao || !nif || !id_utilizador) {
                return res.status(400).json({
                    status: "error",
                    message: "Campos obrigatórios em falta"
                })
            }

            const empresa = await EmpresaModel.create({
                designacao,
                descricao,
                localizacao,
                nif,
                icone,
                id_utilizador
            })

            if (!empresa) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao criar empresa"
                })
            }

            return res.status(201).json({
                status: "success",
                data: empresa
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error"
            })
        }
    }
}