import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { EmpresaDBType, CreateEmpresaType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const EmpresaModel = {

    async create(empresa: CreateEmpresaType): Promise<EmpresaDBType | null> {
        try {
            const id = generateUUID()
            const now = new Date()

            await db.execute(
                `INSERT INTO tbl_empresas 
                (id, designacao, descricao, localizacao, nif, icone, id_utilizador, enabled, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    true,
                    now,
                    now
                ]
            )

            return {
                id,
                ...empresa,
                enabled: true,
                created_at: now,
                updated_at: now
            }

        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<EmpresaDBType[] | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(
                "SELECT * FROM tbl_empresas"
            )

            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async get(id: string): Promise<EmpresaDBType | null> {
        try {
            const [rows] = await db.execute<EmpresaDBType[] & RowDataPacket[]>(
                "SELECT * FROM tbl_empresas WHERE id = ?",
                [id]
            )

            const empresa = rows[0]

            if (!empresa) return null

            return empresa
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, empresa: Partial<CreateEmpresaType>) {
        try {
            const query = `
                UPDATE tbl_empresas 
                SET designacao = ?, descricao = ?, localizacao = ?, nif = ?, icone = ?, updated_at = ?
                WHERE id = ?
            `

            const values = [
                empresa.designacao!,
                empresa.descricao!,
                empresa.localizacao!,
                empresa.nif!,
                empresa.icone!,
                new Date(),
                id
            ]

            const [rows] = await db.execute(query, values)
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                "DELETE FROM tbl_empresas WHERE id = ?",
                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}