export type EstadoType = "Aceitado" | "Pendente" | "Rejeitado"

export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean;
}

export interface ServicoType {
    nome: string;
    precoHora: number;
    categoria: string;
    minimoDescontos: number;
    percentagemDescontos: number;
}



export interface PrestadorDBType {
    id: string;
    taxa_urgencia: number;
    percentagem_desconto: number;
    minimo_desconto: number;
    nif: string;
    profissao: string;
    enable: boolean;
    created_at: string;
    updated_at: string;
}

export interface selecionarPrestadorServicos {
    nome: string;
    especialidade: string;
    precoHora: number;
}

export interface ServicoDBType {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserType {
    id: string;
    nome: string;
    numero_identificacao: string;
    data_nascimento: string;
    email: string; 
    password: string;
    telefone: string;
    pais: string;
    localidade: string;
    enabled: boolean; 
    created_at: string;
    updated_at: string; 
}

export interface OrcamentoCalculoResponse {
    id_orcamento: string;
    total_calculado: number;
}

export interface PrestacaoServicoDBType {
    id: string;
    designacao: string;
    subtotal: number;
    horas_estimadas: number;
    id_prestador: string;
    id_servico: string;
    preco_hora: number;
    estado: "pendente" | "em_progresso" | "finalizado" | "cancelado"; 
    id_orcamento: string;
    id_utilizador: string;
    urgente: boolean;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface PropostaDBType {
    id: string;
    id_prestacao_servico: string;
    preco_hora: number;
    horas_estimadas: number;
    estado: EstadoType;
    enabled: boolean;
    created_at: string;
    updated_at: string;
}

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em_progresso",
    CANCELADO = "cancelado"
}

export interface ResponseType<T> {
    status: "success" | "error";
    message: string;
    data: T | null

}

export interface PrestacaoServicoDetalhadoType {
    id : string,
    nome_utilizador: string,
    email_utilizador: string,
    nome_servico: string,
    descricao: string,
    data_pedido: string,
    urgente: boolean
}