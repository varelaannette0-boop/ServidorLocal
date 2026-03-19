
import db from "./lib/db.js"
import { formatDateDDMMYYYY } from "./utils/date.js"
import { hashPassword } from "./utils/password.js"
import type { UserType } from "./utils/types.js"
import { generateUUID } from "./utils/uuid.js"

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM tbl_utilizadores;")

    console.log(rows)
    return rows
}

export async function getOrcamento() {
    const [rows] = await db.execute("SELECT * FROM tbl_orcamento;")
    console.log(rows)
    return rows
}

export async function getServicos() {
    const [rows] = await db.execute("SELECT * FROM tbl_servicos;")
    console.log(rows)
    return rows
}

export async function getUserById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tbl_utilizadores WHERE tbl_utilizadores.id=?",

        [id]
    )

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

export async function PostNewUser(dadosUtilizador : any) {
    const query = `
        INSERT INTO tbl_utilizadores (
            id, nome, numero_identificacao, data_nascimento, 
            email, password, telefone, pais, localidade, 
            enabled, created_at, update_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
         generateUUID(),
         dadosUtilizador.nome,
         dadosUtilizador.numero_identificacao,
         formatDateDDMMYYYY (dadosUtilizador.data_nascimento), 
         dadosUtilizador.email,
         await hashPassword(dadosUtilizador.password),
         dadosUtilizador.telefone,
         dadosUtilizador.pais,
         dadosUtilizador.localidade,
         dadosUtilizador.enabled,
         new Date(),
         new Date(),
         
    ];


    
    try {
        const [rows] = await db.execute(query, values);
        console.log("Adicionado com sucesso");
        return rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

export async function updatedUser(id: string, updatedUser: UserType) {
    try{

        const query = `

                UPDATE tbl_utilizadores
                SET
                    nome = ?,
                     numero_identificacao = ? ,
                     data_nascimento = ?,
                     email = ?,
                     password = ?,
                     telefone = ?,
                     pais = ?,
                     localidade = ?,
                     enabled = ?,
                     update_at = ?

                WHERE id = ?
        
        `
      const values = [
            id,
            updatedUser.nome,
            updatedUser.numero_identificacao,
            formatDateDDMMYYYY(updatedUser.data_nascimento), 
            updatedUser.email,
            await hashPassword(updatedUser.password),
            updatedUser.telefone,
            updatedUser.pais,
            updatedUser.localidade,
            updatedUser.enabled,
            new Date()
       
    ]  }
    
    catch(err){
        console.log(err)
    }

    
      
}