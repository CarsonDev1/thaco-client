import z from 'zod';

export const RegisterBody = z
	.object({
		fullname: z
			.string()
			.min(2, 'String must contain at least 6 character(s)')
			.max(256, 'Họ và tên không được vượt quá 256 ký tự'),
		email: z.string().email('Invalid email'),
		password: z
			.string()
			.min(6, 'String must contain at least 6 character(s)')
			.max(100, 'Mật khẩu không được vượt quá 100 ký tự'),
		gender: z.string().nonempty('Gender is required'),
		phone_number: z.string().nonempty('Phone number is required'),
		organization: z.string().optional(),
		address: z.string().nonempty('Address is required'),
		ward: z.string().nonempty('Ward is required'),
		district: z.string().nonempty('District is required'),
		province: z.string().nonempty('Province is required'),
		country: z.string().nonempty('Country is required'),
	})
	.strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
	data: z.object({
		token: z.string(),
		expiresAt: z.string(),
		account: z.object({
			id: z.number(),
			name: z.string(),
			email: z.string(),
		}),
	}),
	message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
	.object({
		email: z.string().email(),
		password: z.string().min(6).max(100),
		remember_me: z.boolean(),
	})
	.strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
