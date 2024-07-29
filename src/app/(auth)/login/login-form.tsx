/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import {
	Button,
	Typography,
	TextField,
	Box,
	IconButton,
	InputAdornment,
	FormControlLabel,
	Checkbox,
	CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import ReCAPTCHA from 'react-google-recaptcha';
import envConfig from '@/utils/config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useAppContext } from '@/context/AuthProvider';

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const [recaptchaValue, setRecaptchaValue] = useState('');
	const [user, setUser] = useState<null | any>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { setSessionToken } = useAppContext();

	const notify = () => toast('Login successfully!');

	const handleCaptchaChange = (value: any) => {
		if (value) {
			setRecaptchaValue('mona');
			setIsCaptchaVerified(true);
		}
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);

	const form = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const setUserAfterLogin = (userData: any) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	async function onSubmit(data: LoginBodyType) {
		try {
			setLoading(true);
			const requestBody = {
				...data,
				g_recaptcha_response: recaptchaValue,
			};

			console.log('Sending request to login endpoint with data:', requestBody);

			const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`, {
				body: JSON.stringify(requestBody),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then(async (res) => {
				const payload = await res.json();
				const data = {
					status: res.status,
					payload,
				};

				if (!res.ok) {
					throw data;
				}
				return data;
			});

			notify();
			router.push('/');

			const resultFormNextServer = await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ sessionToken: result }),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(async (res) => {
				const payload = await res.json();
				const data = {
					status: res.status,
					payload,
				};
				if (!res.ok) {
					throw data;
				}
				return data;
			});
			console.log('Next.js API response:', resultFormNextServer.payload.res.sessionToken.payload.access_token);
			setUser(
				localStorage.setItem('user', JSON.stringify(resultFormNextServer.payload.res.sessionToken.payload.user))
			);
			setSessionToken(resultFormNextServer.payload.res.sessionToken.payload.access_token);
		} catch (error) {
			console.error('Error occurred while logging in:', error);
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
				label='Email'
				{...form.register('email')}
				error={!!form.formState.errors.email}
				helperText={form.formState.errors.email?.message}
				FormHelperTextProps={{
					style: { fontSize: '1rem' },
				}}
				InputLabelProps={{
					style: { color: '#011737', fontSize: '1.4rem' },
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
					style: { fontSize: '1rem' },
				}}
				InputLabelProps={{
					style: { color: '#011737', fontSize: '1.4rem' },
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

			<FormControlLabel
				control={<Checkbox {...form.register('remember_me')} color='primary' />}
				label={
					<Typography sx={{ fontSize: '1rem' }} className='text-primary'>
						Remember me
					</Typography>
				}
			/>

			{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
					onChange={handleCaptchaChange}
					style={{ marginTop: '15px', width: '100%' }}
					className='w-full'
				/>
			)}

			<Button type='submit' fullWidth variant='contained' sx={{ mt: 2, p: 2 }}>
				<span className='text-lg font-semibold'>
					{loading ? <CircularProgress color='inherit' /> : 'Login'}
				</span>
			</Button>

			<Box display='flex' flexDirection='column' alignItems='center' mt={3}>
				<Typography variant='h6' className='text-primary'>
					Don't have an account?
				</Typography>
				<Link href='/register'>
					<Typography variant='h6' color='#1ec0f2' sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
						Sign up
					</Typography>
				</Link>
			</Box>
		</Box>
	);
};

export default LoginForm;
