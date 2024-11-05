import { PostgresHelper } from '../../../db/postgres/helper'

export class PostgresCreateTransationRepository {
    async execute(createTransationParams) {
        const createdTransaction = await PostgresHelper.query(
            `INSERT INTO transations (id, user_id, name, date, amount, type)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *
             `,
            [
                createTransationParams.id,
                createTransationParams.user_id,
                createTransationParams.name,
                createTransationParams.date,
                createTransationParams.amount,
                createTransationParams.type,
            ],
        )
        return createdTransaction[0]
    }
}
