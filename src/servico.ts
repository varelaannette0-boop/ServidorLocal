import type { ServicoType, } from "./utils/types.js";

let servico: Array<ServicoType> = [{
    nome: "limpeza",
    precoHora: 20,
    categoria: "domestico",
    minimoDescontos: 5,
    percentagemDescontos: 10

}];

export let catalogoServico: ServicoType[] = []

// adicionar um servico novo
export function adicionarServico(servico: ServicoType) {
    if (!servico.nome || servico.nome.trim()=== "") {
        return {sucesso : false, mensagem: "Nome do serviço é obrigatorio" };
    }

    if (servico.precoHora <= 0) {
        return {sucesso : false, mensagem: "O preço por hora deve ser maior que 0"};
    }

    for (let s of catalogoServico) {
        if (s.nome === servico.nome) {
            return {sucesso : false, mensagem: "serviço já existe no catálogo"};
        }
    }

    catalogoServico.push(servico);

    return {
        sucesso: true,
        mensagem: "servico adicionado com sucesso",
        resumo: {
            nome: servico.nome,
            precoHora: servico.precoHora,
            categoria: servico.categoria
        }
    }
     
};

// listar todos os servicos
export function listarServicos(): ServicoType[] {
    //TODO: implementar fetch de servicos

    return catalogoServico
}

//apagar um servico
export function apagarServico(nome: string): boolean {
    //TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServico.length; i++) {
        if(catalogoServico[i]?.nome && catalogoServico[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServico[i]!)
        }

    } //devolve um novo catalogo sem o servico que foi apagado

    catalogoServico = novoCatalogoTemp

    return true
}

//obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            return catalogoServico[i]!
        }
    }
    return null
}




console.log(servico);
