import { PopularCard } from '@/pages/home/PopularCard';
import Link from 'next/link';
import React from 'react';

const Popular = () => {
	const imageSources = [
		'/home/category-01.jpg',
		'/home/category-02.jpg',
		'/home/category-03.jpg',
		'/home/category-04.jpg',
		'/home/category-05.jpg',
		'/home/category-06.jpg',
		'/home/category-07.jpg',
		'/home/category-08.jpg',
		'/home/category-09.jpg',
		'/home/category-10.jpg',
		'/home/category-11.jpg',
		'/home/category-12.jpg',
	];

	return (
		<div className='relative'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<h2 className='text-3xl mb-4'>Popular Makes</h2>
					<Link href=''>
						<span>View All</span>
					</Link>
				</div>
				<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					{imageSources.map((src, index) => (
						<PopularCard key={index} src={src} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Popular;
