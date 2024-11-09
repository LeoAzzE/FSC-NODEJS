import { badRequest, notFound } from './http.js'
import validator from 'validator'

export const checkIfIdIsvalid = (id) => validator.isUUID(id)

export const invalidIdResponse = () =>
    badRequest({
        message: 'The provided id is not valid',
    })