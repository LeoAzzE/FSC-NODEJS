import { userNotFoundError } from '../../errors/users.js'

export class PostgresGetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new userNotFoundError()
        }

        const balance = await this.getUserBalanceRepository.execute(
            params.userId,
        )
        return balance
    }
}
