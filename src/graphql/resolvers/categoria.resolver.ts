import { CategoriaModel } from "../../models/categoria.models.js";
import { ServiceModel } from "../../models/servico.models.js";
import type { CategoriaDBType } from "../../utils/types.js";

export const categoriaResolver = {
  Query: {
    getAllCategorias: () => {
      return CategoriaModel.getAll();
    },

    getCategoriaById: (_: unknown, args: { id: string }) => {
      return CategoriaModel.get(args.id);
    },
  },

  Mutation: {
    createCategoria: (_: unknown, args: { categoria: CategoriaDBType }) => {
      return CategoriaModel.create(args.categoria);
    },

    updateCategoria: (
      _: unknown,
      args: { id: string; categoria: Partial<CategoriaDBType> },
    ) => {
      return CategoriaModel.update(args.id, args.categoria);
    },

    deleteCategoria: (_: unknown, args: { id: string }) => {
      return CategoriaModel.delete(args.id);
    },
  },
  Categoria: {
    servico: async (parent: { id: string }) => {
      return await ServiceModel.get(parent.id);
    },
  },
};
