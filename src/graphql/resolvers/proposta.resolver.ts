import { PrestacaoServicoModel } from "../../models/prestacao-servico.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { PropostaModel } from "../../models/proposta.models.js";
import type { PropostaDBType } from "../../utils/types.js";

export const propostaResolver = {
    Query: {
        getAllPropostas: async () => {
            return await PropostaModel.getAll();
        },
        getPropostaById: async (_: any, args: { id: string }) => {
            return await PropostaModel.get(args.id);
        }
    },
    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaDBType }) => {
            return await PropostaModel.create(args.proposta);
        },
        updateProposta: async (_: any, args: { id: string, proposta: PropostaDBType }) => {
            return await PropostaModel.update(args.id, args.proposta);
        }
    },

    Proposta: {
        prestador: async (parent: {id: string}) => {
            return await PrestadorModel.get(parent.id);
        },

        PrestacaoServico: async (parent: {id: string}) => {
            return await PrestacaoServicoModel.get(parent.id);
        }
    }
}