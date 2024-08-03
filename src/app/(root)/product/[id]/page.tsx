'use client';

import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import Image from 'next/image';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';
import './ProductDetail.css';

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

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	}).format(price);
};

const ProductDetail: React.FC = () => {
	const params = useParams() as unknown as Params;
	const { id } = params;
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
			<div className='flex justify-center items-center h-screen'>
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
				<div className='sec-com'>
					<div className='flex flex-col md:flex-row gap-8'>
						<div className='flex-shrink-0 w-full md:w-2/4'>
							<Swiper
								spaceBetween={10}
								navigation={{
									prevEl: '.swiper-button-prev',
									nextEl: '.swiper-button-next',
								}}
								thumbs={{ swiper: thumbsSwiper }}
								modules={[Thumbs]}
								className='mb-2 main-swiper'
							>
								{product.imageUrls.map((url, index) => (
									<SwiperSlide key={index}>
										<div className='w-full h-[350px] flex justify-center items-center'>
											<Image
												src={url}
												layout='fill'
												objectFit='cover'
												alt={`${product.title} image ${index + 1}`}
												className='rounded-lg'
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
							<Swiper
								onSwiper={setThumbsSwiper}
								spaceBetween={10}
								slidesPerView={4}
								freeMode={true}
								watchSlidesProgress={true}
								modules={[Thumbs]}
								className='mt-2 thumb-swiper'
							>
								{product.imageUrls.map((url, index) => (
									<SwiperSlide key={index} className='cursor-pointer'>
										<div className='w-full h-[150px] relative border rounded-lg'>
											<Image
												src={url}
												layout='fill'
												objectFit='cover'
												alt={`${product.title} thumbnail ${index + 1}`}
												className='rounded-lg'
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<div className='w-full md:w-2/3 flex flex-col gap-2'>
							<h1 className='text-3xl text-[#00529C] font-bold mb-4'>{product.title}</h1>
							<div className='flex items-center gap-1'>
								<FaStar className='text-yellow-400' />
								<FaStar className='text-yellow-400' />
								<FaStar className='text-yellow-400' />
								<FaStar className='text-yellow-400' />
								<FaStar className='text-yellow-400' />
							</div>
							<div className='flex items-center gap-4'>
								<p className='text-gray-600 line-through text-2xl'>{formatPrice(product.price)}</p>
								<p className='text-rose-600 font-semibold text-2xl'>
									{formatPrice(product.discountPrice)}
								</p>
							</div>
							<p className='text-[#00528C] italic font-semibold w-2/3'>
								(chưa bao gồm chi phí lăn bánh – Hỗ trợ chuyển đổi biển số trắng sang biển số vàng – Thu
								xe cũ lên đời xe mới)
							</p>
							<div className='flex flex-col gap-4 mt-2'>
								<div className='flex items-center gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p>
										Kích thước khoan hàng: <span className='font-bold'>{product.size}</span>
									</p>
								</div>
								<div className='flex items-center gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p>
										Tải trọng chuyển chở:{' '}
										<span className='font-bold'>{product.loadCapacity} Kg</span>
									</p>
								</div>
								<div className='flex items-center gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p>
										Động cơ: <span className='font-bold'>{product.engine}</span>
									</p>
								</div>
								<div className='flex items-baseline gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p className='w-2/3'>
										Xe trang bị phanh ABS, vô lăn trợ lực dầu, kính cửa chỉnh điện, máy lạnh cabin,
										ghế nỉ cao cấp, radio, usb
									</p>
								</div>
								<div className='flex items-center gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p>Bảo hành 3 năm hoặc 100.000 km trên toàn quốc (tùy điều kiện nào đến trước)</p>
								</div>
								<div className='flex items-baseline gap-1'>
									<FaStar className='text-green-600 size-4' />
									<p className='w-2/3'>
										Hỗ trợ mua xe trả góp qua ngân hàng lãi xuất ưu đãi, trả trước 30% (Ngân hàng
										<span className='font-bold'>VIB, TPBANK, VPBANK</span>)
									</p>
								</div>
								<Image src='/home/detail.png' width={550} height={500} alt='detail' />
							</div>
						</div>
					</div>
					<div>
						<h2 className='text-2xl font-semibold mb-2'>Mô tả</h2>
						<div
							className='text-gray-600 mb-4'
							dangerouslySetInnerHTML={{ __html: product.description }}
						></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetail;
