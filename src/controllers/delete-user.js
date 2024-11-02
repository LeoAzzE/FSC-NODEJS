import { DeleteUserUseCase } from '../use-cases/delete-user'
import { checkIfIdIsvalid, invalidIdResponse, serverError } from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsvalid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }
            const deletedUserUseCase = new DeleteUserUseCase()

            const deletedUser = await deletedUserUseCase.execute(userId)
            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
