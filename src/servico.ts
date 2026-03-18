import db from "./lib/db.js";
import type { serviceDBType, ServicoType, } from "./utils/types.js";

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

export async function apanharServico() {
    try {
        const rows = await db.execute(`INSERIR INTO table_sericos`)
        return rows
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function addServicoDB(newservice: serviceDBType) {
    console.log({newservice})
    try {
       
            const query = `INSERT INTO tbl_servicos VALUES (?, ?, ?, ?, ?, ?, ?) `

           const values = [
                null, 
                newservice.nome, 
                newservice.descricao, 
                newservice.categoria, 
                newservice.enabled, 
               new Date(), 
               new Date()
            ]
           
                const rows = await db.execute(query, values)


        return rows
    } catch (error) {
        console.log(error)
        return null
    }

}

export async function getServiceById(id:string) {
    try{
        const query = `DELETE FROM tbl_servicos WHERE id = ?`

        const value = [id]

        const rows: any = await db.execute(query, value)

        return rows [0]?.affectedRows === 0 ? null: rows
    } catch (error) {
        console.log(error)
        return null
    }
    
}
export async function getAllServices() {
    try {
        const query = `SELECT * FROM tbl_servicos`;

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0]: []
    }catch(error) {
        console.log(error)
        return null
    }
    
}

// updated de dados
export async function updateService(id: string, updatedService: serviceDBType) {
    try {
        const query = `UPDATE tbl_servicos
                        SET
                          nome=?,
                          descricao=?,
                          categoria=?,
                          enabled=?,
                          updated_at=?
                        WHERE  id=?`

        const values = [
            updatedService.nome,
            updatedService.descricao,
            updatedService.categoria,
            updatedService.enabled,
            new Date(),
            id
        ]

        const rows = await db.execute(query, values)

        return rows
    }catch (error) {
        console.log(error)
        return null
    }
}



export async function deleteService(id: string) {
    try {
        const query = `DELETE FROM tbl_servicos WHERE id= ?`

        const value = [id]

        const rows = await db.execute(query, value)

        return rows
    }catch (error) {
         console.log(error)
        return null
    }
       
}








console.log(servico);
