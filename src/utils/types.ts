export interface PedidoServicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean
}

export interface ServicoType {
    nome : string;
    precoHora : number;
    categoria : string;
    minimoDescontos : number;
    percentagemDescontos : number;
}

export interface ResponseType {
    status : boolean,
    message : string,
    data: ServicoType | null
}

export interface PrestadorDBType {
    id: string,
    taxa_urgencia: number,
    percentagem_desconto: number,
    minimo_desconto: number,
    nif: string,
    profissao: string,
    enable: boolean,
    created_at: string,
    updated_at: string
}

export interface selecionarPrestadorServicos{
    nome: string;
    especialidade: string;
    precoHora: number;
}

export interface ServicoDBType {
    id: string,
    nome: string,
    descricao: string,
    categoria: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}


export interface UserType{
     id : string
    nome : string,
    numero_identificacao : string,
    data_nascimento : string,
    email : boolean,
    password : string,
    telefone  :  string,
    pais : string,
    localidade : string,
    enabled : string,
    created_at : string,
    update_at: string
   
}

export interface OrcamentoDBType {
    id: string,
    total: number,
    id_utilizadores: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PrestacaoServicoDBType {
    id: string,
    designacao: string,
    subtotal: number,
    horas_estimadas: number,
    id_prestador: string,
    id_servico: string,
    preco_hora: number,
    estado: string,
    id_orcamento: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}

export interface PropostaDBType {
    id: string,
    id_prestacao_servico: string,
    preco_hora: number,
    horas_estimadas: number,
    estado: string,
    enabled: boolean,
    created_at: string,
    updated_at: string
}


export interface EstadoType{
    estado: "Aceitado" | "Pendente" | "Rejeitado"
}

export enum EstadoPrestacaoServico {
    PENDENTE = "pendente",
    FINALIZADO = "finalizado",
    EM_PROGRESSO = "em_progresso",
    CANCELADO = "cancelado"
}