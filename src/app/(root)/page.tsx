'use client';
import { getAllProducts } from '@/app/api/product/getProducts';
import Banner from '@/pages/home/Banner';
import Features from '@/pages/home/Features';
import { Product } from '@/types/product';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type CategoryName = 'Xe tải KIA' | 'Xe van thaco frontier' | 'Electronics5' | 'Electronics6' | 'OtherCategory';

export default function Home() {
	const [electronics5Products, setElectronics5Products] = useState<Product[]>([]);
	const [electronics6Products, setElectronics6Products] = useState<Product[]>([]);
	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery<Product[], Error>({
		queryKey: ['listProducts'],
		queryFn: getAllProducts,
		select: (products) =>
			products.map((product) => ({
				...product,
				category: product.category,
			})),
	});

	useEffect(() => {
		if (products.length) {
			const electronics5Filtered = products.filter(
				(product) => product.category && product.category.name === 'Electronics5'
			);
			setElectronics5Products(electronics5Filtered);

			const electronics6Filtered = products.filter(
				(product) => product.category && product.category.name === 'Electronics6'
			);
			setElectronics6Products(electronics6Filtered);
		}
	}, [products]);

	if (isLoading)
		return (
			<div className='flex justify-center items-center'>
				<CircularProgress />
			</div>
		);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='relative'>
			<Banner />
			<Features title='Xe tải KIA' products={electronics5Products} />
			<Features title='Xe van thaco frontier' products={products} />
			<Features title='Electronics6' products={electronics6Products} />
		</div>
	);
}
