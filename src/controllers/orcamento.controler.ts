import type { Request, Response } from "express"
import type { OrcamentoDBType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.models.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.models.js"
import { PrestadorModel } from "../models/prestador.models.js"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: OrcamentoDBType = req.body

        if (!orcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const createOrcamentoResponse = await OrcamentoModel.create(orcamento)

        if (!createOrcamentoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllOrcamentosResponse = await OrcamentoModel.getAll()

        if (!getAllOrcamentosResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getAllOrcamentosResponse
        })
    },

    async get(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getOrcamentoByIdResponse = await OrcamentoModel.get(id as string)

        if (!getOrcamentoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento invalidos",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    },


    async calcular(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "O ID do orçamento é obrigatório",
                data: null
            });
        }

        const prestacoes = await PrestacaoServicoModel.getByIdOrcamento(id as string) as any[]



        if (!prestacoes || prestacoes.length === 0) {
             return res.status(404).json({
                 status: "error",
                 message: "Nenhuma prestação de serviço ativa associada a este orçamento.",
                 data: null
             });
        }

        let totalGeral = 0;

        for (const prestacao of prestacoes) {
            let custoBase = prestacao.horas_estimadas * prestacao.preco_hora;

            const prestador = await PrestadorModel.get(prestacao.id_prestador) as any;

            if (prestador) {
                 if (prestacao.urgente === true) {
                     custoBase += prestador.taxa_urgencia;
                 }

                 if (custoBase >= prestador.minimo_desconto) {
                     const desconto = custoBase * (prestador.percentagem_desconto / 100);
                     custoBase -= desconto;
                 }
            }

            totalGeral += custoBase;
        }

        const updateResult = await OrcamentoModel.atualizarTotal(id as string, totalGeral);

        if (!updateResult) {
            return res.status(500).json({
                 status: "error",
                 message: "Ocorreu um erro ao gravar o valor absoluto no banco de dados.",
                 data: null
            });
        }

        return res.status(200).json({
             status: "success",
             message: "Orçamento calculado e atualizado com sucesso.",
             data: { id_orcamento: id, total_calculado: parseFloat(totalGeral.toFixed(2)) }
        });
    }

}



