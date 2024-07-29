import { useEffect, useState } from 'react';


const useAuth = () => {
	const [user, setUser] = useState('');

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		try {
			const parsedUser = JSON.parse(storedUser!);
			setUser(parsedUser);
		} catch (error) {
			setUser(storedUser || '');
		}
	}, []);

	return user;
};

export default useAuth;