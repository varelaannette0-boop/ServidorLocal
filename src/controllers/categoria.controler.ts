import type { Request, Response } from "express"
import { CategoriaModel } from "../models/categoria.models.js"

export const CategoriaController = {

    async create(req: Request, res: Response) {
        try {
            const { designacao, icone } = req.body

            if (!designacao || !icone) {
                return res.status(400).json({
                    status: "error",
                    message: "designacao e icone são obrigatórios"
                })
            }

            const categoria = await CategoriaModel.create({
                designacao,
                icone
            } as any)

            if (!categoria) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao criar categoria"
                })
            }

            return res.status(201).json({
                status: "success",
                data: categoria
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error",
                message: "Erro interno"
            })
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const categorias = await CategoriaModel.getAll()

            return res.json({
                status: "success",
                data: categorias
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error"
            })
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params

            const categoria = await CategoriaModel.get(id)

            if (!categoria) {
                return res.status(404).json({
                    status: "error",
                    message: "Categoria não encontrada"
                })
            }

            return res.json({
                status: "success",
                data: categoria
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error"
            })
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { designacao, icone } = req.body

            const result = await CategoriaModel.update(id, {
                designacao,
                icone
            })

            if (!result) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar"
                })
            }

            return res.json({
                status: "success",
                message: "Categoria atualizada"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error"
            })
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const result = await CategoriaModel.delete(id)

            if (!result) {
                return res.status(404).json({
                    status: "error",
                    message: "Categoria não encontrada"
                })
            }

            return res.json({
                status: "success",
                message: "Categoria eliminada"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                status: "error"
            })
        }
    }
}