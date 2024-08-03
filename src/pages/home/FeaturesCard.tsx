import { Product } from '@/types/product';
import Image from 'next/image';
import React from 'react';

interface IFeaturesCardProps {
	product: Product;
}

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	}).format(price);
};

const FeaturesCard: React.FC<IFeaturesCardProps> = ({ product }) => {
	return (
		<div className='shadow-xl rounded-xl scale-95 hover:scale-100 transition-all duration-300 min-h-[300px] max-h-[300px] flex flex-col'>
			<div className='bg-white p-4 flex flex-col gap-2 flex-grow'>
				<div className='h-[150px] flex justify-center items-center'>
					{product.imageUrls.length > 0 && (
						<Image
							src={product.imageUrls[0]}
							width={150}
							height={150}
							alt={product.title}
							className='w-full h-full block object-cover'
						/>
					)}
				</div>
				<div className='flex-grow'>
					<span
						className='text-md block overflow-hidden'
						style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
					>
						{product.title}
					</span>
				</div>
				<div className='flex items-center gap-4'>
					<p className='text-gray-600 mt-2 line-through'>{formatPrice(product.price)}</p>
					<p className='text-rose-600 mt-2 font-semibold'>{formatPrice(product.discountPrice)}</p>
				</div>
			</div>
		</div>
	);
};

export default FeaturesCard;
