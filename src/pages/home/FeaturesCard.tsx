import { Product } from '@/types/product';
import Image from 'next/image';
import React from 'react';

interface IFeaturesCardProps {
	product: Product;
}

const FeaturesCard: React.FC<IFeaturesCardProps> = ({ product }) => {
	return (
		<div className='shadow-xl rounded-xl scale-95 hover:scale-100 transition-all duration-300'>
			<div className='bg-white p-4 flex flex-col gap-2'>
				<div>
					{product.imageUrls.length > 0 && (
						<Image
							src={product.imageUrls[0]}
							width={500}
							height={200}
							alt={product.title}
							className='max-h-[10rem]'
						/>
					)}
				</div>
				<span className='text-md'>{product.title}</span>
				<div className='flex items-center gap-4'>
					<p className='text-gray-600 mt-2 line-through'>{product.price} ₫</p>
					<p className='text-rose-600 mt-2 font-semibold'>{product.discountPrice} ₫</p>
				</div>
			</div>
		</div>
	);
};

export default FeaturesCard;
