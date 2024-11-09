import { userNotFoundError } from '../../errors/users'
import {
    checkIfIdIsvalid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    userNotFoundResponse,
} from '../helpers'

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdUseCase) {
        this.GetTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.userId

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
