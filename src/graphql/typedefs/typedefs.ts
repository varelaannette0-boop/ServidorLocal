import { gql } from "graphql-tag";

export const typeDefs = gql`
enum Role {
      CLIENTE= "cliente",
      ADMIN= "admin",
      PRESTADOR= "prestador",
      EMPRESA= "empresa"
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
       updated_at: string
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
      enabled: boolean,
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
      enabled: boolean,
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
      urgente: boolean,
      enabled: boolean,
      created_at: String,
      updated_at: String
  
  }

  type Servico{
      id: ID!,
      nome: String,
      descricao: String,
      categoria: String,
      enabled: boolean,
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
      enable: boolean,
      created_at: String,
      updated_at: String
  
  }
`
