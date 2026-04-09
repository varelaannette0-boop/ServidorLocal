import type { Request, Response } from "express"
import type { OrcamentoCalculoResponse, PrestacaoServicoDBType, ResponseType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.models.js"
import { PrestacaoServicoModel } from "../models/prestacao-servico.models.js"
import { PrestadorModel } from "../models/prestador.models.js"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamento: OrcamentoCalculoResponse = req.body

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

        const updatedOrcamento: OrcamentoCalculoResponse = req.body

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


 async calcular(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    // ✅ validação correta
    if (!id || typeof id !== "string") {
        return res.status(400).json({
            status: "error",
            message: "ID inválido",
            data: null
        });
    }

    const idOrcamento: string = id;

    // ✅ tipagem correta (evitar any)
    const prestacoes = await PrestacaoServicoModel.getByIdOrcamento(id) as PrestacaoServicoDBType[];

    if (!prestacoes || prestacoes.length === 0) {
        const response: ResponseType<null> = {
            status: "error",
            message: "Nenhuma prestação de serviço ativa associada a este orçamento.",
            data: null
        };

        return res.status(400).json(response);
    }

    let totalGeral = 0;

    for (const prestacao of prestacoes) {
        let custoBase = prestacao.horas_estimadas * prestacao.preco_hora;

        const prestador = await PrestadorModel.get(prestacao.id_prestador);

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

    const updateResult = await OrcamentoModel.atualizarTotal(id, totalGeral);

    if (!updateResult) {
        return res.status(500).json({
            status: "error",
            message: "Erro ao atualizar o total no banco de dados.",
            data: null
        });
    }

    const response: ResponseType<OrcamentoCalculoResponse> = {
        status: "success",
        message: "Orçamento calculado e atualizado com sucesso.",
        data: {
            id_orcamento: idOrcamento,
            total_calculado: parseFloat(totalGeral.toFixed(2))
        }
    };

    return res.status(200).json(response);
}
}