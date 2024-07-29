import LoginForm from '@/app/(auth)/login/login-form';
import React, { Suspense } from 'react';

const Login = () => {
	return (
		<div className='flex justify-center items-center'>
			<LoginForm />
		</div>
	);
};

export default Login;
