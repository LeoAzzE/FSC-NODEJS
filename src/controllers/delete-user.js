import {
    checkIfIdIsvalid,
    invalidIdResponse,
    serverError,
    ok,
    userNotFoundResponse,
} from './helpers/index.js'

export class DeleteUserController {
    constructor(deletedUserUseCase) {
        this.deletedUserUseCase = deletedUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsvalid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deletedUser = await this.deletedUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponse()
            }
            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
