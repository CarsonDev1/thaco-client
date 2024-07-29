'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className='relative pt-4'>
			<Swiper
				spaceBetween={10}
				slidesPerView={2}
				onSlideChange={() => {}}
				onSwiper={(swiper) => {}}
				centeredSlides={true}
				pagination={{
					clickable: true,
				}}
				loop
				modules={[Pagination]}
			>
				<SwiperSlide>
					<div className='swiper-zoom-container'>
						<Image src='/banner-car-01.jpg' width={1500} height={900} alt='car' />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='swiper-zoom-container'>
						<Image src='/banner-car-02.jpg' width={1500} height={900} alt='car' />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='swiper-zoom-container'>
						<Image src='/banner-car-03.jpg' width={1500} height={900} alt='car' />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='swiper-zoom-container'>
						<Image src='/banner-car-02.jpg' width={1500} height={900} alt='car' />
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Banner;
