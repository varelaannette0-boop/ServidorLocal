interface ServicoType {
    nome : string;
    precoHora : number;
    categoria : string;
    minimoDescontos : number;
    percentagemDescontos : number;
}

let servico: Array<ServicoType> = [{
    nome: "limpeza",
    precoHora: 20,
    categoria: "domestico",
    minimoDescontos: 5,
    percentagemDescontos: 10

}];

let catalogoServico: ServicoType[] = []

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

console.log(servico);
