'use client';

import { Button } from '@/components/ui/moving-border';
import FeaturesCard from './FeaturesCard';
import { Product } from '@/types/product';
import Link from 'next/link';
import React from 'react';

interface IFeature {
	title: string;
	products?: Product[];
}

const Features: React.FC<IFeature> = ({ title, products }) => {
	return (
		<div className='sec-com'>
			<div className='container'>
				<div className='flex justify-center items-center mb-6'>
					<Button
						borderRadius='1.75rem'
						className='bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800'
					>
						<h3 className='text-[#00529C] text-xl text-center uppercase font-bold p-4'>{title}</h3>
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{products?.map((product) => (
						<Link href={`/product/${product._id}`} key={product._id}>
							<FeaturesCard product={product} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Features;
