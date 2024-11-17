import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be least 6 characters',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'invalid email. Please provider a valide one',
    })

export const userNotFoundResponse = () =>
    notFound({ message: 'User Not Found' })
