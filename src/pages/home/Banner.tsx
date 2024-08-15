'use client';
import React from 'react';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className='relative h-[500px] lg:h-[700px]'>
			{/* Background Video */}
			<video autoPlay loop muted className='absolute inset-0 w-full h-full object-cover'>
				<source src='/home/video-banner.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			{/* Overlay Content */}
			<div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4'>
				<h1 className='text-4xl lg:text-6xl font-bold mb-4'>Your Stunning Headline</h1>
				<p className='text-lg lg:text-2xl mb-6'>A compelling subheading that grabs attention.</p>
				<button className='px-6 py-3 bg-blue-600 hover:bg-blue-800 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105'>
					Call to Action
				</button>
			</div>
		</div>
	);
};

export default Banner;
