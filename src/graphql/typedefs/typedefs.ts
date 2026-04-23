import { gql } from "graphql-tag";
export const typeDefs = gql`
enum Role {
        CLIENTE ,
        ADMIN ,
        PRESTADOR,
        EMPRESA 
    }
    enum EstadoProposta {
        PENDENTE ,
        ACEITE ,
        CANCELADO 
    }
    enum EstadoPrestacaoServico {
        PENDENTE ,
        FINALIZADO,
        EM_ANDAMENTO ,
        CANCELADO 
    }
    enum TipoPrestador {
        PARTICULAR ,
        EMPRESA 
    }


      
  type Utilizador{
       id: ID,
       nome: String!,
       numero_identificacao: String!,
       data_nascimento: String!,
       email: String!,
       telefone: String!,
       pais: String!,
       localidade: String,
       password: String,
       role: Role,
       enabled: Boolean,
       created_at: String,
       updated_at: String
}

  type Proposta{
      id: ID!,
      idPrestacaoServico: ID!,
      precoHora: Float!,
      horasEstimadas: Int!,
      estado: EstadoProposta,
      idPrestador: ID!,
      owner: String,
      enabled: Boolean,
      createdAt: String,
      updatedAt: String
  
}

  type Orcamento{
      id: ID!,
      total: Float!,
      idUtilizadores: ID!,
      enabled: Boolean,
      createdAt: String,
      updatedAt: String
}

  type Empresa{

      id: ID!,
      designacao: String,
      descricao: String,
      nif: String,
      icone: String,
      id_utilizador: ID!,
      localizacao: String,
      enabled: Boolean,
      created_at: String,
      updated_at: String
  
  }

  type Categoria{
      id: ID!,
      designacao: String,
      icone: String,
      created_at: String,
      updated_at: String,
  
  }

  type PrestacaoServico{
      id: ID!,
      designacao: String,
      subtotal: Float!,
      horas_estimadas: Int!,
      id_prestador: String,
      id_servico: String,
      preco_hora: Int,
      estado: EstadoPrestacaoServico,
      id_orcamento: String,
      id_utilizador: String,
      id_empresa: String,
      tipo_prestador: TipoPrestador,
      urgente: Boolean,
      enabled: Boolean,
      created_at: String,
      updated_at: String
  
  }

  type Servico{
      id: ID!,
      nome: String,
      descricao: String,
      categoria: String,
      enabled: Boolean,
      created_at: String,
      updated_at: String
  
  }

  type Prestador{
      id: ID!,
      taxaUrgencia: Int,
      percentagemDesconto: Int,
      minimoDesconto: Int,
      nif: String,
      profissao: String,
      enable: Boolean,
      created_at: String,
      updated_at: String
  
  }

  type Query {
     getAllUsers: [Utilizador]
     getUserById(id: ID!) : Utilizador
     getAllServicos: [Servico]
     getServicoById(id: ID!): Servico
     getAllPropostas: [Proposta]
     getPropostaById(id: ID!): Proposta
     getAllPrestadores: [Prestador]
     getPrestadorById(id: ID!): Prestador
     getAllPrestacaoServicos: [PrestacaoServico]
     getPrestacaoServicoById(id: ID!): PrestacaoServico
     getAllOrcamentos: [Orcamento]
     getOrcamentoById(id: ID!): Orcamento
     getAllEmpresas: [Empresa]
     getEmpresaById(id: ID!): Empresa 
     getAllCategorias: [Categoria]
     getCategoriaById(id: ID!): Categoria
 
  }


  type Mutation {
createUser(nome: String!, numero_identidade: String!, data_nascimento: String!, email: String!, password: String!, telefone: String!, pais: String!, localidade: String, role: Role, enebled: Boolean): Utilizador,
updateUser(id: ID!, nome: String, numero_identidade: String, data_nascimento: String, email: String, password: String, telefone: String, pais: String, localidade: String, role: Role, enebled: Boolean): Utilizador,
deleteUser(id: ID!): Utilizador,

createServico(nome: String!, descricao: String, categoria: [ID], enabled: Boolean): Servico,
updateServico(id: ID!, nome: String, descricao: String, categoria: [ID], enabled: Boolean): Servico,
deleteServico(id: ID!): Servico,

createProposta(id_prestacao_servico: ID!, id_prestador: ID!, preco_hora: Float!, horas_estimadas: Int!, estado: EstadoProposta, owner: String, enabled: Boolean): Proposta,
updateProposta(id: ID!, id_prestacao_servico: ID, id_prestador: ID, preco_hora: Float, horas_estimadas: Int, estado: EstadoProposta, owner: String, enabled: Boolean): Proposta,
deleteProposta(id: ID!): Proposta,

createPrestador(id: ID!, taxa_urgencia: Float!, percentagem_desconto: Float!, minimo_desconto: Float!, nif: String, profissao: String!, enable: Boolean): Prestador,
updatePrestador(id: ID!, taxa_urgencia: Float, percentagem_desconto: Float, minimo_desconto: Float, nif: String, profissao: String, enable: Boolean): Prestador,
deletePrestador(id: ID!): Prestador,

createPrestacaoServico(designacao: String!, subtotal: Float!, horas_estimadas: Int!, id_prestador: ID!, id_utilizador: ID!, id_servico: ID!, preco_hora: Float!, estado: EstadoPrestacaoServico, id_orcamento: ID, id_empresa: ID, tipo_prestador: TipoPrestador, urgente: Boolean, enabled: Boolean): PrestacaoServico,
updatePrestacaoServico(id: ID!, designacao: String, subtotal: Float, horas_estimadas: Int, id_prestador: ID, id_utilizador: ID, id_servico: ID, preco_hora: Float, estado: EstadoPrestacaoServico, id_orcamento: ID, id_empresa: ID, tipo_prestador: TipoPrestador, urgente: Boolean, enabled: Boolean): PrestacaoServico,
deletePrestacaoServico(id: ID!): PrestacaoServico,

createOrcamento(total: Float!, id_utilizadores: ID!, enabled: Boolean): Orcamento,
updateOrcamento(id: ID!, total: Float, id_utilizadores: ID, enabled: Boolean): Orcamento,
deleteOrcamento(id: ID!): Orcamento,
createEmpresa(designacao: String!, descricao: String, localizacao: String, nif: String, icone: String, id_utilizador: ID!, enabled: Boolean): Empresa,
updateEmpresa(id: ID!, designacao: String, descricao: String, localizacao: String, nif: String, icone: String, id_utilizador: ID, enabled: Boolean): Empresa,
deleteEmpresa(id: ID!): Empresa,

createCategoria(designacao: String!, icone: String): Categoria,
updateCategoria(id: ID!, designacao: String, icone: String): Categoria,
deleteCategoria(id: ID!): Categoria
}
`