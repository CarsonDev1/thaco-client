'use client';

import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import { useParams } from 'next/navigation';

// Define the return type of useParams
interface Params {
	id: string;
}

const fetchProductById = async (id: string): Promise<Product> => {
	const response = await fetch(`https://thaco-be.onrender.com/api/products/${id}`);
	if (!response.ok) {
		throw new Error('Failed to fetch product');
	}
	return response.json();
};

const ProductDetail: React.FC = () => {
	const params = useParams() as unknown as Params;
	const { id } = params;

	const {
		data: product,
		isLoading,
		error,
	} = useQuery<Product, Error>({
		queryKey: ['product', id],
		queryFn: () => fetchProductById(id),
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<div className='flex justify-center items-center'>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className='container mx-auto p-4'>
			{product && (
				<div>
					<h1 className='text-3xl font-bold'>{product.title}</h1>
					<div className='flex flex-col md:flex-row gap-4 mt-4'>
						{product.imageUrls.length > 0 && (
							<div className='flex-shrink-0'>
								<Image
									src={product.imageUrls[0]}
									width={500}
									height={200}
									alt={product.title}
									className='w-full max-w-md'
								/>
							</div>
						)}
						<div>
							<p className='text-gray-600'>{product.description}</p>
							<div className='flex items-center gap-4 mt-2'>
								<p className='text-gray-600 line-through'>{product.price} ₫</p>
								<p className='text-rose-600 font-semibold'>{product.discountPrice} ₫</p>
								<p className='text-gray-600'>{product.size}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
