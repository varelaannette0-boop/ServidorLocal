interface PedidoServico {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean
}

const pedido: Array<PedidoServico> = [
    {
      cliente: "joao",
      descricao: "conserto de computador",
      horasEstimadas: 5,
      urgente: true 
        
    },

]

function processarPedido(pedido: PedidoServico, precoHora: number) {
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

