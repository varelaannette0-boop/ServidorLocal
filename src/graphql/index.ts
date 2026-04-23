import { typeDefs } from "./typedefs/typedefs.js";
import { userResolver } from "./resolvers/users.resolvers.js";
import { orcamentoResolver } from "./resolvers/orcamento.resolver.js";
import { prestacaoServicoResolver } from "./resolvers/prestacao.servico.resolver.js";
import { propostaResolver } from "./resolvers/proposta.resolver.js";
import { servicoResolver } from "./resolvers/servico.resolver.js";
import { prestadorResolver } from "./resolvers/prestador.resolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...orcamentoResolver.Query,
        ...prestacaoServicoResolver.Query,
        ...prestadorResolver.Query,
        ...propostaResolver.Query,
        ...servicoResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...orcamentoResolver.Mutation,
        ...prestacaoServicoResolver.Mutation,
        ...prestadorResolver.Mutation,
        ...propostaResolver.Mutation,
        ...servicoResolver.Mutation
    }
}

export {typeDefs}