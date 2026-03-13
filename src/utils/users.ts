import db from "../lib/db.js"

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
        dadosUtilizador.id,
       dadosUtilizador.nome,
        dadosUtilizador.numero_identificacao,
        dadosUtilizador.data_nascimento, 
         dadosUtilizador.email,
        dadosUtilizador.password,
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

