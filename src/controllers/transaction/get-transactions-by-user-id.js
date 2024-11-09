import { userNotFoundError } from '../../errors/users.js'
import {
    checkIfIdIsvalid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    userNotFoundResponse,
} from '../helpers/index.js'
import { ok } from '../helpers/http.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId

            if (!userId) {
                return requiredFieldIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsvalid(userId)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })
            return ok(transactions)
        } catch (error) {
            console.log(error)
            if (error instanceof userNotFoundError) {
                return userNotFoundResponse()
            }
        }
    }
}
