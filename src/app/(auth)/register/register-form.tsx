'use client';

import React, { useState } from 'react';
import {
	Button,
	Typography,
	TextField,
	Box,
	IconButton,
	InputAdornment,
	CircularProgress,
	MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';
import { useForm } from 'react-hook-form';
import envConfig from '@/utils/config';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function RegisterForm() {
	const theme = useTheme();
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const [recaptchaValue, setRecaptchaValue] = useState('');
	const [loading, setLoading] = useState(false);

	const notify = () => toast('Registration successful! Redirecting to login...');

	const handleCaptchaChange = (value: any) => {
		if (value) {
			setRecaptchaValue(value);
			setIsCaptchaVerified(true);
		}
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const form = useForm<RegisterBodyType>({
		resolver: zodResolver(RegisterBody),
		defaultValues: {
			fullname: '',
			email: '',
			password: '',
			gender: '',
			phone_number: '',
			organization: '',
			address: '',
			ward: '',
			district: '',
			province: '',
			country: '',
		},
	});

	async function onSubmit(data: RegisterBodyType) {
		try {
			setLoading(true);
			const requestBody = {
				...data,
				g_recaptcha_response: recaptchaValue,
			};

			const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/auth/register`, {
				body: JSON.stringify(requestBody),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			if (!result.ok) {
				const errorResponse = await result.json();
				console.error('Server error response:', errorResponse);
				throw new Error('Failed to register user');
			}

			const responseData = await result.json();
			console.log(responseData);
			notify();
			setTimeout(() => {
				router.push('/');
			}, 1000);
		} catch (error) {
			console.error('Error occurred while registering user:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box component='form' onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 10 }}>
			<Typography variant='h4' color='#33333' textAlign='center' fontWeight='bold' marginBottom={1}>
				Welcome back
			</Typography>

			<TextField
				margin='dense'
				fullWidth
				label='Full Name'
				{...form.register('fullname')}
				error={!!form.formState.errors.fullname}
				helperText={form.formState.errors.fullname?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Email'
				{...form.register('email')}
				error={!!form.formState.errors.email}
				helperText={form.formState.errors.email?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Password'
				type={showPassword ? 'text' : 'password'}
				{...form.register('password')}
				error={!!form.formState.errors.password}
				helperText={form.formState.errors.password?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				select
				label='Gender'
				{...form.register('gender')}
				error={!!form.formState.errors.gender}
				helperText={form.formState.errors.gender?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			>
				<MenuItem value='male'>Male</MenuItem>
				<MenuItem value='female'>Female</MenuItem>
				<MenuItem value='other'>Other</MenuItem>
			</TextField>

			<TextField
				margin='dense'
				fullWidth
				label='Phone Number'
				{...form.register('phone_number')}
				error={!!form.formState.errors.phone_number}
				helperText={form.formState.errors.phone_number?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Organization'
				{...form.register('organization')}
				error={!!form.formState.errors.organization}
				helperText={form.formState.errors.organization?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Address'
				{...form.register('address')}
				error={!!form.formState.errors.address}
				helperText={form.formState.errors.address?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Ward'
				{...form.register('ward')}
				error={!!form.formState.errors.ward}
				helperText={form.formState.errors.ward?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='District'
				{...form.register('district')}
				error={!!form.formState.errors.district}
				helperText={form.formState.errors.district?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Province'
				{...form.register('province')}
				error={!!form.formState.errors.province}
				helperText={form.formState.errors.province?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			<TextField
				margin='dense'
				fullWidth
				label='Country'
				{...form.register('country')}
				error={!!form.formState.errors.country}
				helperText={form.formState.errors.country?.message}
				FormHelperTextProps={{
					style: { fontSize: '1.2rem' },
				}}
				InputLabelProps={{
					style: { color: theme.palette.mode === 'dark' ? '#fff' : '#011737', fontSize: '1.4rem' },
				}}
				InputProps={{
					style: { fontSize: '1.4rem' },
				}}
			/>

			{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
				<Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
						onChange={handleCaptchaChange}
						className='w-full'
					/>
				</Box>
			)}

			<Button type='submit' fullWidth variant='contained' sx={{ mt: 2, p: 2 }}>
				<span className='text-lg font-semibold'>
					{loading ? <CircularProgress color='inherit' /> : 'Register'}
				</span>
			</Button>

			<Box display='flex' flexDirection='column' alignItems='center' mt={3}>
				<Typography variant='h6'>Already have an account?</Typography>
				<Typography variant='h6' color='#1ec0f2' sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
					Login
				</Typography>
			</Box>
		</Box>
	);
}
