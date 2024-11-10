import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateUserParams).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateTransactionParams[key])
        })

        updateValues.push(transactionId)

        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(', ')} 
            WHERE id = $${updateValues.length}
            RETURNING *
        `

        const updatedUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updatedUser[0]
    }
}
