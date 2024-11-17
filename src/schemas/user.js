import { z } from 'zod'
export const createUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(1, {
            message: 'First name is required',
        }),
    last_name: z
        .string({
            required_error: 'Last name is required',
        })
        .trim()
        .min(1, {
            message: 'Last name is required',
        }),
    email: z
        .string({
            required_error: 'E-mail is required',
        })
        .email({
            message: 'Please provide a valid email',
        })
        .trim()
        .min(1, {
            message: 'E-mail is required',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, {
            message: 'password must have at least 6 characteres.',
        }),
})
