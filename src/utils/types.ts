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

export interface PrestadorType {
      nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto : number
    percentagemDesconto: number
    taxaUrgencia: number
}

export interface selecionarPrestadorServicos{
    nome: string;
    especialidade: string;
    precoHora: number;
}

export interface serviceDBType{
    id : string,
    nome : string,
    descricao : string,
    categoria : string,
    enabled : boolean,
    created_at : string,
    updated_at :  string
}

export interface UserType{
    nome : string,
    numero_identificacao : string,
    data_nascimento : string,
    email : boolean,
    password : string,
    telefone  :  string,
    pais : string,
    localidade : string,
    enabled : string,
    update_at: string,
    id : string
}