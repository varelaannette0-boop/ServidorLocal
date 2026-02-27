import { catalogoServico } from "./servico.js";
import type { PedidoServicoType, ServicoType } from "./utils/types.js";

const taxaUrgencia : number = 0.3
const minimoParaDesconto : number = 1000
const percentagemDescontos : number = 0.1

const servicosSelecionados: ServicoType[] = []

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

// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto : number = 0
    let totalFinal : number = 0

    servicosSelecionados.map((servico)=>{
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico

    })

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto + taxaUrgencia)
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