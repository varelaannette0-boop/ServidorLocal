import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { CategoriaDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const CategoriaModel = {

    async create(categoria: CategoriaDBType): Promise<CategoriaDBType | null> {
        try {
            const id = generateUUID()

            await db.execute(
                `INSERT INTO tbl_categorias 
                VALUES (?, ?, ?, ?, ?)`,
                [
                    id,
                    categoria.designacao,
                    categoria.icone,
                    new Date(),
                    new Date()
                ]
            )

            return {
                ...categoria,
                id
            }
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<CategoriaDBType[] | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(
                "SELECT * FROM tbl_categorias"
            )

            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async get(id: string): Promise<CategoriaDBType | null> {
        try {
            const [rows] = await db.execute<CategoriaDBType[] & RowDataPacket[]>(
                "SELECT * FROM tbl_categorias WHERE id = ?",
                [id]
            )

            const categoria = rows[0]

            if (!categoria) return null

            return categoria
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, categoria: Partial<CategoriaDBType>) {
        try {
            const query = `
                UPDATE tbl_categorias 
                SET designacao = ?, icone = ?, updated_at = ?
                WHERE id = ?
            `

            const values = [
                categoria.designacao!,
                categoria.icone!,
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
                "DELETE FROM tbl_categorias WHERE id = ?",
                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
}