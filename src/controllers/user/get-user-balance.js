import { userNotFoundError } from '../../errors/users.js'
import {
    userNotFoundResponse,
    serverError,
    invalidIdResponse,
    checkIfIdIsvalid,
    ok,
} from '../helpers/index.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsvalid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const balance = await this.getUserBalanceUseCase.execute({ userId })
            return ok(balance)
        } catch (error) {
            if (error instanceof userNotFoundError) {
                return userNotFoundResponse()
            }

            console.error(error)
            return serverError()
        }
    }
}
