import Image from 'next/image';
import React from 'react';

const Brand = () => {
	return (
		<div className='sec-com'>
			<div className='container'>
				<h3 className='text-2xl font-bold mb-5'>Branding</h3>
				<div className='flex flex-wrap gap-2 md:gap-4 lg:gap-6'>
					<Image src='/home/category-01.jpg' width={200} height={200} alt='category-01' />
					<Image src='/home/category-02.jpg' width={200} height={200} alt='category-02' />
					<Image src='/home/category-03.jpg' width={200} height={200} alt='category-03' />
					<Image src='/home/category-04.jpg' width={200} height={200} alt='category-04' />
					<Image src='/home/category-05.jpg' width={200} height={200} alt='category-05' />
					<Image src='/home/category-06.jpg' width={200} height={200} alt='category-06' />
					<Image src='/home/category-07.jpg' width={200} height={200} alt='category-07' />
					<Image src='/home/category-08.jpg' width={200} height={200} alt='category-08' />
					<Image src='/home/category-09.jpg' width={200} height={200} alt='category-09' />
					<Image src='/home/category-10.jpg' width={200} height={200} alt='category-10' />
					<Image src='/home/category-11.jpg' width={200} height={200} alt='category-11' />
					<Image src='/home/category-12.jpg' width={200} height={200} alt='category-12' />
				</div>
			</div>
		</div>
	);
};

export default Brand;
