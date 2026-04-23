import { PrestadorModel } from "../../models/prestador.models.js";
import { PropostaModel } from "../../models/proposta.models.js";
import type { PrestadorDBType } from "../../utils/types.js";

export const prestadorResolver = {
    Query: {
        getAllPrestadores: async () => {
            return await PrestadorModel.getAll();
        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await PrestadorModel.get(args.id);
        }
    },
    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorDBType }) => {
            return await PrestadorModel.create(args.prestador);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorDBType }) => {
            return await PrestadorModel.update(args.id, args.prestador);
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await PrestadorModel.delete(args.id);
        }
    },

    Prestador: {
        proposta: async (parent: {id: string}) => {
            return await PropostaModel.get(parent.id);
        }
    }
}