import { catalogoServico } from "./servico.js";
import type { PedidoServicoType, PrestadorType, ServicoType } from "./utils/types.js";

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDescontos: number = 0.1

const servicosSelecionados: ServicoType[] = []
const prestadoresDeServicos: PrestadorType[] = []
const prestadoresSelecionados: PrestadorType[] = []

// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string,) {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServico[i]!)
            return true
        }


    }
    return false
}

// funcao para selecionar prestadores
export function selecionarPrestadorServicos(nomeDoPrestador: string,) {
    // ciclo for que percorre o array de prestadoresDeServico
    for (let i = 0; i < catalogoServico.length; i++) {
        // if que verifica se o item [i] do array eh igual ao nome recebido
        if (prestadoresDeServicos[i]?.nome === nomeDoPrestador) {
            // se for igual,  adiciona o iten [i] ao array prestadoresSelecionados.push
            prestadoresSelecionados.push(prestadoresDeServicos[i]!)
            // retornar verdadeiro
            return true
        }


    }
    // senao return false
    return false
}
// funcao para criar prestadores de servico
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja esta no array
    prestadoresDeServicos.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            //se o prestador ja existir, retorna uma mensagem de erro
            return {
                status: false,
                message: "ja existe um prestador de servico com esse nome",
                data: null
            }
        }

    })



    // se o prestador nao existir, adicionamos o novo prestador
    prestadoresDeServicos.push(novoPrestador)
    return {
        status: true,
        message: "Prestador Adicionado",
        data: null
    }
}

//funcao para editar um prestador de servico
export function editarPrestadorDeServico(nomeDoPrestador: string, novosDadosDoPrestador: PrestadorType) {
    // encontrar o prestador de servico a editar na minha lista
    // ciclo que percorre a lista e verifica o nome do prestador de servico
    prestadoresDeServicos.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novosDadosDoPrestador.nome
            prestadorExistente.precoHora = novosDadosDoPrestador.precoHora
            prestadorExistente.profissao = novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novosDadosDoPrestador.taxaUrgencia



            return {
                status: true,
                message: "Prestador de servico editado com sucesso",
                data: prestadorExistente
            }
        }

    })
    // se nao existir nenhum prestador com o nome recebido, retorna uma mensagem de erro
    return {
        status: false,
        message: "Nao existe nenhum prestador de servico com esse nome",
        data: null
    }



}
// prestadoresDeServicos.replace()

//funcao para pagar um prestador de servico
export function apagarPrestadorDeServico(nomeDoPrestador: string) {
    // ciclo para percorrer a lista de prestadores
    //for (let i = 0; i < prestadoresDeServicos.length; i++) {
    // if para verificar se o  nome do prestador for igual ao nome recebido,
    // if (prestadoresDeServicos[i]?.nome === nomeDoPrestador) {
    // se encontrado,  remover o prestador
    // prestadoresDeServicos.splice(i, 1)
    // prestadoresDeServicos.replace(i, "")
    // retornar uma mensagem de sucesso
    // }
    //}


    //prestadoresDeServicos.find() // se encontrar, devolve o item
    //prestadoresDeServicos.some() // se encontrar, devolve true
    //prestadoresDeServicos.some() // se nao encontrar, devolve false

    // validacao do nome do prestador
    if (!nomeDoPrestador) {

        return {
            status: false,
            message: " Nao existe nenhum prestador  de servico com esse nome",
            data: null
        }
    }
    

    prestadoresDeServicos.filter(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome !== nomeDoPrestador
    )

}






// se nao existir nenhum prestador com o nome recebido, retorna uma mensagem de erro


//funcao para obter um prestador de servico pelo nome


// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico

    })

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDescontos)
    }

    return totalFinal



    // () => --- arrow function
    // function () {} --- function normal
}


const pedido: Array<PedidoServicoType> = [
    {
        cliente: "joao",
        descricao: "conserto de computador",
        horasEstimadas: 5,
        urgente: true

    },

]

function processarPedido(pedido: PedidoServicoType, precoHora: number) {
    const valorBase = pedido.horasEstimadas * precoHora;
    const valorFinal = pedido.urgente ? valorBase + (valorBase * 0.3) : valorBase;
    return {
        cliente: pedido.cliente,
        descricao: pedido.descricao,
        horas: pedido.horasEstimadas,
        urgente: pedido.urgente,
        valorBase: valorBase,
        valorFinal: valorFinal
    }

}

/*

urgente: true
taxaUrgencia : 0.3
totalBruto: 100
totalTaxa : 100 * 0.3 = 30
totalFinal: 100 + 30 = 130


totalBruto: 100
totalBruto apos urgencia: 150
minimoDesconto: 100
percentagem: 10%
desconto sobre total final : 150 * 0.1 = 15
desconto sobre total bruto: 100 * 0.1 = 10

*/