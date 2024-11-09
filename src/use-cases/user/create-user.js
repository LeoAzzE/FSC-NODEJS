import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/users.js'

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        // TODO: verificar se o email ja esta em uso

        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        // gerar ID do usuario
        const userId = uuidv4()
        // criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir o usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositorio

        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
