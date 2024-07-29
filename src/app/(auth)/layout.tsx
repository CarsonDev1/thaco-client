'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
// 	title: 'Auth CineMay',
// 	description: 'Next 14 Auth Cine Project',
// };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setLoading(false);
		};
		fetchData();
	}, []);
	return (
		<html lang='en'>
			<body className={inter.className}>
				{loading && (
					<div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
						<Image
							src='/loading.gif'
							alt='loading'
							width={1000}
							height={1000}
							unoptimized
							className='size-full'
						/>
					</div>
				)}
				{children}
				<ToastContainer />
			</body>
		</html>
	);
}
