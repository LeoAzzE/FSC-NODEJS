import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    constructor(deleteUserUserRepository) {
        this.deleteUserUserRepository = deleteUserUserRepository
    }
    async execute(userId) {
        const deletedUser = this.deleteUserUserRepository.execute(userId)

        return deletedUser
    }
}
